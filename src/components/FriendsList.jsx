import React from "react";
import "../styles/FriendsList.css";
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
  {
    userID: 1,
    userName: "dnofulla",
    firstName: "Daniel",
    lastName: "Nofulla",
  },
  {
    userID: 2,
    userName: "rkim",
    firstName: "Robin",
    lastName: "Kim",
  },
  {
    userID: 3,
    userName: "akisiel",
    firstName: "Alex",
    lastName: "Kisiel",
  },
  {
    userID: 4,
    userName: "skhan",
    firstName: "Sajjad",
    lastName: "Khan",
  },
  {
    userID: 5,
    userName: "djames",
    firstName: "Daren",
    lastName: "James",
  },
  {
    userID: 6,
    userName: "nkuruvalla",
    firstName: "Neethu",
    lastName: "Kuruvalla",
  },
];

function enumerateFriends(friends) {
  var friendsList = [];

  for (let friend of friends) {
    let friendName = "Chat with " + friend.firstName;
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
                  <div className="currentFriendName">{friend.userName}</div>
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
                  recipient={friend.userName}
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
