import React, { useContext, useEffect } from "react";
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
import friendRequestContext from "../services/friendRequestContext";
import teamContext from "../services/teamContext";
import tournamentContext from "../services/tournamentContext";
import tournamentRequestContext from "../services/tournamentRequestContext";
import userContext from "../services/userContext";
import friendListContext from "../services/friendListContext";
import Axios from "axios";
import { useHistory } from "react-router";

export default function FriendsDash() {
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

  const joinTournament = (index, type) => {
    Axios.post(
      "http://localhost:8080/global/action/handleTournamentInvite/" + type,
      {
        params: {
          userId: userData.user.id,
          tournamentId: tournamentRequestData[index].id,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          setTimeout(() => {
            history.push("/Home");
            setTimeout(() => {
              history.push("/MyTournaments");
              setTimeout(() => {
                history.push("/Home");
                setTimeout(() => {
                  history.push("/MyTournaments");
                }, 100);
              }, 100);
            }, 50);
          }, 50);
        }, 50);
      })
      .then((err) => {
        console.log(err);
      });
  };

  const handleFriendRequest = (index, type, senderId) => {
    Axios.post(
      "http://localhost:8080/global/action/handleFriendRequest/" + type,
      {
        params: {
          senderId: senderId,
          receiverId: userData.user.id,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          setTimeout(() => {
            history.push("/Home");
            setTimeout(() => {
              history.push("/Profile");
              setTimeout(() => {
                history.push("/Home");
                setTimeout(() => {
                  history.push("/Profile");
                }, 100);
              }, 100);
            }, 50);
          }, 50);
        }, 50);
      })
      .then((err) => {
        console.log(err);
      });
  };

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
        <TabPanel className="friends-dash-panel">
          {(userData.user.tournament1Id === "none" ||
            userData.user.tournament2Id === "none") &&
          tournamentRequestData.length !== 0 ? (
            tournamentRequestData.map((data, index) => {
              <div className="friend-dash-element">
                <div className="friend-dash-name">
                  <Avatar
                    marginRight="10px"
                    src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg"
                  />
                  <div>{data.tournamentName}</div>
                </div>
                <div className="friend-dash-buttons">
                  <Button
                    bg="#82c0cc"
                    border="none"
                    _hover={{ bg: "#93d1dd" }}
                    onClick={() => joinTournament(index, "accept")}>
                    Accept
                  </Button>
                  <Button
                    className="reject-button"
                    marginLeft="10px"
                    bg="#ffa62b"
                    border="none"
                    _hover={{ bg: "#ffb73c" }}
                    onClick={() => joinTournament(index, "reject")}>
                    Reject
                  </Button>
                </div>
              </div>;
            })
          ) : (
            <div className="friend-dash-element">
              <div className="friend-dash-name">
                <Avatar
                  marginRight="10px"
                  src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg"
                />
                <div>Not Enough Slots/No Invites</div>
              </div>
            </div>
          )}
        </TabPanel>
        <TabPanel className="friends-dash-panel">
          {friendRequestData.length !== 0 ? (
            friendRequestData.map((data, index) => {
              <div id="friend-requests">
                <div className="friend-dash-element">
                  <div className="friend-dash-name">
                    <Avatar
                      marginRight="10px"
                      src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg"
                    />
                    <div>{data.username}</div>
                  </div>
                  <div className="friend-dash-buttons">
                    <Button
                      bg="#82c0cc"
                      border="none"
                      _hover={{ bg: "#93d1dd" }}
                      onClick={() => {
                        handleFriendRequest(index, "accept", data.id);
                      }}>
                      Accept
                    </Button>
                    <Button
                      className="reject-button"
                      marginLeft="10px"
                      bg="#ffa62b"
                      border="none"
                      _hover={{ bg: "#ffb73c" }}
                      onClick={() => {
                        handleFriendRequest(index, "reject", data.id);
                      }}>
                      Reject
                    </Button>
                  </div>
                </div>
              </div>;
            })
          ) : (
            <div id="friend-requests">
              <div className="friend-dash-element">
                <div className="friend-dash-name">
                  <Avatar
                    marginRight="10px"
                    src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg"
                  />
                  <div>NO FRIEND REQUESTS</div>
                </div>
              </div>
            </div>
          )}
        </TabPanel>
        <TabPanel className="friends-dash-panel">
          <FriendsList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
