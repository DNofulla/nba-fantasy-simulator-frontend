import React from "react";
import "../styles/FriendsDash.css";
import {
  Avatar,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  Button,
  Icon,
} from "@chakra-ui/core";
import FriendsList from "../components/FriendsList";

function getInvites() {
  var testInvites = [
    {
      tournamentID: 12345,
      tournamentName: "Tournament1",
    },
    {
      tournamentID: 23456,
      tournamentName: "Tournament2",
    },
    {
      tournamentID: 23456,
      tournamentName: "Tournament2",
    },
    {
      tournamentID: 23456,
      tournamentName: "Tournament2",
    },
    {
      tournamentID: 23456,
      tournamentName: "Tournament2",
    },
    {
      tournamentID: 23456,
      tournamentName: "Tournament2",
    },
  ];

  var inviteDivs = [];

  for (let invite of testInvites) {
    inviteDivs.push(
      <div className="friend-dash-element">
        <div className="friend-dash-name">
          <Avatar
            marginRight="10px"
            src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg"
          />
          <div>{invite.tournamentName}</div>
        </div>
        <div className="friend-dash-buttons">
          <Button bg="#82c0cc" border="none" _hover={{ bg: "#93d1dd" }}>
            Accept
          </Button>
          <Button
            className="reject-button"
            marginLeft="10px"
            bg="#ffa62b"
            border="none"
            _hover={{ bg: "#ffb73c" }}>
            Reject
          </Button>
        </div>
      </div>
    );
  }

  return inviteDivs;
}

function getFriendRequests() {
  var testRequests = [
    {
      userName: "KingJames",
      firstName: "LeBron",
      lastName: "James",
    },
    {
      userName: "shaq",
      firstName: "Shaquille",
      lastName: "O'Neal",
    },
  ];

  var requestDivs = [];

  for (let request of testRequests) {
    requestDivs.push(
      <div className="friend-dash-element">
        <div className="friend-dash-name">
          <Avatar
            marginRight="10px"
            src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg"
          />
          <div>{request.userName}</div>
        </div>
        <div className="friend-dash-buttons">
          <Button bg="#82c0cc" border="none" _hover={{ bg: "#93d1dd" }}>
            Accept
          </Button>
          <Button
            className="reject-button"
            marginLeft="10px"
            bg="#ffa62b"
            border="none"
            _hover={{ bg: "#ffb73c" }}>
            Reject
          </Button>
        </div>
      </div>
    );
  }

  return <div id="friend-requests">{requestDivs}</div>;
}

export default function FriendsDash() {
  return (
    <Tabs isFitted id="friends-dash" className="ProfileDiv" variant="enclosed">
      <TabList h="50px">
        <Tab
          mb="0"
          bg="#82c0cc"
          borderRadius="15px 0 0 0"
          _selected={{ color: "black", bg: "#ffa62b" }}
          className="dash-tab">
          Tournament Invites
        </Tab>
        <Tab
          mb="0"
          bg="#82c0cc"
          className="dash-tab"
          _selected={{ color: "black", bg: "#ffa62b" }}>
          Friend Requests
        </Tab>
        <Tab
          mb="0"
          bg="#82c0cc"
          borderRadius="0 15px 0 0"
          className="dash-tab"
          _selected={{ color: "black", bg: "#ffa62b" }}>
          Friends List
        </Tab>
      </TabList>

      <TabPanels
        id="dash-panels"
        borderTop="1px solid #ede7e3;"
        color="#ede7e3">
        <TabPanel className="friends-dash-panel">{getInvites()}</TabPanel>
        <TabPanel className="friends-dash-panel">
          {getFriendRequests()}
        </TabPanel>
        <TabPanel className="friends-dash-panel">
          <FriendsList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
