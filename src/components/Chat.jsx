import { FormControl, Input, Button } from "@chakra-ui/core";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import userContext from "../services/userContext";
import "../styles/Chat.css";

const socket = io.connect("http://localhost:3001", {
  transports: ["websocket", "polling"],
});

export default function Chat(props) {
  const { userData, setUserData } = useContext(userContext);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setChatMessages((chatMessages) => [...chatMessages, message]);
    });
    socket.on("dm message", (message) => {
      if (message.receiver === props.recipient) {
        setChatMessages((chatMessages) => [...chatMessages, message]);
      }
    });
    socket.on("tour message", (message) => {
      if (message.tournamentID === props.tournamentID) {
        setChatMessages((chatMessages) => [...chatMessages, message]);
      }
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    const payload = {
      user: userData.user.username,
      message: message,
    };

    const tourPayload = {
      user: userData.user.username,
      message: message,
      tournamentID: props.tournamentID,
    };

    if (message !== "") {
      if (props.recipient) {
        payload.sender = userData.user.username;
        payload.receiver = props.recipient;
        socket.emit("send dm", payload);
        setMessage("");
      } else if (props.tournamentID) {
        socket.emit("send tour", tourPayload);
        setMessage("");
      } else {
        socket.emit("send", payload);
        setMessage("");
      }
    }
  };

  var chatClass = !props.chatClass ? "ChatBox" : "ChatBox " + props.chatClass;
  var icd = !props.icd ? "InnerChatDiv" : "InnerChatDiv " + props.icd;

  return (
    <div className={chatClass}>
      <div className="ChatTitleSection">
        <h1 id="chatName">{props.chatName}</h1>
      </div>
      <div className={icd} style={{ color: "black" }}>
        {chatClass === "friendChat"
          ? chatMessages.map((data, index) => (
              <div className="messageBoxWrapper" key={index}>
                <div className="usernameChatDivMessage">{data.sender}</div>
                <div className="chatMessageText">{data.text}</div>
              </div>
            ))
          : chatMessages.map((data, index) => (
              <div className="messageBoxWrapper" key={index}>
                <div className="usernameChatDivMessage">{data.user}</div>
                <div className="chatMessageText">{data.text}</div>
              </div>
            ))}
      </div>
      <FormControl id="formControlInput" display="flex">
        <Input
          float="left"
          width="100%"
          type="text"
          autoComplete="off"
          id="messageContent"
          aria-describedby="textContent"
          size="md"
          marginRight="20px"
          marginTop="1px"
          bg="#ede7e3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          float="right"
          size="md"
          height="45px"
          bg="#ffa62b"
          border="none"
          color="black"
          variant="solid"
          type="button"
          onClick={sendMessage}>
          Send
        </Button>
      </FormControl>
    </div>
  );
}
