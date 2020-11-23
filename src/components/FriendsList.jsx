import React, { useEffect, useContext } from "react";
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
import Chat from "./Chat";
import friendRequestContext from "../services/friendRequestContext";
import teamContext from "../services/teamContext";
import tournamentContext from "../services/tournamentContext";
import tournamentRequestContext from "../services/tournamentRequestContext";
import userContext from "../services/userContext";
import friendListContext from "../services/friendListContext";
import Axios from "axios";
import { useHistory } from "react-router";

export default function FriendsList() {
  const { userData, setUserData } = useContext(userContext);
  const { friendData, setFriendData } = useContext(friendListContext);
  const { friendRequestData, setFriendRequestData } = useContext(
    friendRequestContext
  );
  const { teamData, setTeamData } = useContext(teamContext);
  const { tournamentData, setTournamentData } = useContext(tournamentContext);
  const { tournamentRequestData, setTournamentRequestData } = useContext(
    tournamentRequestContext
  );
  const history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:8080/global/action/getUpdatedInfo", {
      params: {
        userId: userData.user.id,
      },
      headers: {
        Authorization: "Bearer " + userData.token,
      },
    })
      .then((response) => {
        console.log(response.data);
        setUserData({
          token: userData.token,
          user: response.data.user,
        });
        setFriendData(response.data.friendListUserData);
        setFriendRequestData(response.data.friendRequestUserData);
        setTeamData([response.data.team1, response.data.team2]);
        setTournamentData([
          response.data.tournament1,
          response.data.tournament2,
        ]);
        setTournamentRequestData(response.data.tournamentRequestData);
        console.log(tournamentRequestData);
      })
      .then((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Accordion allowToggle allowMultiple marginTop="5px" marginBottom="5px">
      {friendData.length !== 0 ? (
        friendData.map((data, index) => {
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
                      <div className="currentFriendName">{data.username}</div>
                    </div>
                  </Box>
                  <AccordionIcon color="#ffa62b" />
                </AccordionHeader>
                <AccordionPanel>
                  <div className="friend-dash-chat">
                    <Chat
                      chatClass="friendChat"
                      icd="innerChatDiv-friend"
                      chatName={`Chat with ${data.firstName}`}
                      recipient={data.username}
                    />
                  </div>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>;
        })
      ) : (
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
                    <div className="currentFriendName">NO FRIENDS</div>
                  </div>
                </Box>
                <AccordionIcon color="#ffa62b" />
              </AccordionHeader>
            </>
          )}
        </AccordionItem>
      )}
    </Accordion>
  );
}
