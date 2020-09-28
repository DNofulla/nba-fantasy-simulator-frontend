import React, { useState } from "react";
import "../styles/MainChat.css"

export default function TournamentChat() {
  const [messagesList, setMessagesList] = useState([]);
  //const [currMessage, setCurrMessage] = useState("");
  //const [buttonState, setButtonState] = useState(false);

  return (
    <div id='tchatdiv' className="MainChatBox">
      <h3 className="chatTitle">Tournament Chat</h3>
      <div className="innerChatDiv">{messagesList}</div>
      <form className="sendMessageForm">
        <input
          type="text"
          autoComplete="off"
          placeholder="Type your message here!"
          className="inputTextBox"
          id="chatInput"
        />
        <button className="sendButton">{"Send >>"}</button>
      </form>
    </div>
  );
}