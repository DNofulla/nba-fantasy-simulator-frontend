import React, { useContext } from "react";
import "../styles/FriendsList.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Avatar,
  Box,
} from "@chakra-ui/core";
import userContext from "../services/userContext";
import Chat from "./Chat";

var testFriends = [
  "Daniel Nofulla",
  "Robin Kim",
  "Alex Kisiel",
  "Daren James",
  "Sajjad Khan",
  "Neethu Kuruvalla",
];

function enumerateFriends(friends) {
  var friendsList = [];

  for (let i = 0; i < friends.length; i++) {
    let friendName = "Chat with " + friends[i].split(" ")[0];
    friendsList.push(
      <AccordionItem borderBottom="1px solid #ffa62b" defaultIsOpen="false">
        {() => (
          <>
            <AccordionHeader
              border="none"
              boxShadow="none !important"
              cursor="pointer"
              width="100%"
              padding="0"
              bg="transparent"
              _hover="bg: #ffa62b">
              <Box width="100%">
                <div className="friendTabInfo">
                  <div className="friendTabAvatar">
                    <Avatar src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg" />
                  </div>
                  <div className="currentFriendName">{friends[i]}</div>
                </div>
              </Box>
              <AccordionIcon color="#ffa62b" />
            </AccordionHeader>
            <AccordionPanel>
              <div className="friend-dash-chat">
                <Chat
                  chatClass="friendChat"
                  icd="innerChatDiv-friend"
                  chatName={friendName}
                />
              </div>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    );
  }

  return friendsList;
}

export default function FriendsList() {
  return (
    <Accordion allowToggle allowMultiple marginTop="5px" marginBottom="5px">
      {enumerateFriends(testFriends)}
    </Accordion>
  );
}
