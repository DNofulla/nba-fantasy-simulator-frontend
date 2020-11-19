import React, { useContext, useEffect, useState } from "react";
import "../styles/TeamSelection.css";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
  Tooltip,
  Button,
  Icon,
} from "@chakra-ui/core";
import PlayerCard from "./PlayerCard";
import { playersAvailable } from "../services/playersAvailable";
import userContext from "../services/userContext";
import Axios from "axios";
import { useHistory } from "react-router";

export default function TeamSelection({
  setMyTeamRP,
  myTeamRP,
  tourInfoId,
  type,
  setType,
}) {
  const [teamData, setTeamData] = useState({});
  const [playerRankingPoints, setPlayerRankingPoints] = useState(0);
  const [rosterPlayersCount, setRosterPlayersCount] = useState();
  const [activePlayersCount, setActivePlayersCount] = useState(0);
  const [tournamentData, setTournamentData] = useState({});

  const [teamRankingPoints, setTeamRankingPoints] = useState(0);
  const [allPlayers, setAllPlayers] = useState([]);
  const [lockedInPlayers, setLockedInPlayers] = useState([]);

  const [rosterPlayers, setRosterPlayers] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);

  const { userData, setUserData } = useContext(userContext);

  const [canLockIn, setCanLockIn] = useState(false);
  const [isLockedIn, setIsLockedIn] = useState(false);
  const [locked, setLocked] = useState(true);

  const history = useHistory();

  const toast = useToast();

  useEffect(() => {
    Axios.get("http://localhost:8080/player", {
      headers: {
        Authorization: "Bearer " + userData.token,
      },
    })
      .then((res) => {
        setAllPlayers(res.data);
      })
      .then((err) => {
        console.log(err);
      });

    Axios.get("http://localhost:8080/tournaments/getTournamentDataById", {
      params: {
        tournamentId: tourInfoId,
      },
      headers: {
        Authorization: "Bearer " + userData.token,
      },
    })
      .then((res) => {
        console.log(res);
        setTournamentData(res.data);
      })
      .then((err) => {});
  }, []);

  function getPlayerDataById(val) {
    const result = allPlayers.find((obj) => {
      return obj.id === val;
    });
    return result;
  }

  function generatePlayerDivs(data) {
    let players = [];
    for (let i = 0; i < allPlayers.length; i++) {
      players.push(
          <PlayerCard
            onChange={(value) => {
              if (value.count > 0) {
                activePlayers.push(value.id);
                console.log(value.id);
                setActivePlayersCount(activePlayersCount + 1);
              } else {
                const index = activePlayers.indexOf(value.id);
                activePlayers.splice(index, 1);
                setActivePlayersCount(activePlayersCount - 1);
              }

              setMyTeamRP(playerRankingPoints + value.rp);
              setPlayerRankingPoints(playerRankingPoints + value.rp);
              console.log(activePlayersCount);
              console.log(activePlayers.length);
              if (activePlayers.length === 5) {
                setCanLockIn(true);
              } else {
                setCanLockIn(false);
              }
            }}
            name={data[i].name}
            rankingPoints={Math.round((data[i].pts / 992) * 100)}
            id={data[i].id}
            pts2={data[i].fgm}
            pts3={Math.round((data[i].pts - data[i].fgm * 2 - data[i].ftm) / 3)}
            asst={data[i].ast}
            ft={data[i].ftm}
            b={data[i].blk}
            rb={data[i].dreb + data[i].oreb}
            st={data[i].stl}
          />
      );
    }
    return players;
  }

  function getActivePlayers(data) {
    let players = [];
    for (let i = 0; i < 5; i++) {
      lockedInPlayers.push(getPlayerDataById(activePlayers[i]));
      players.push(
        <PlayerCard
          name={lockedInPlayers[i].name}
          rankingPoints={Math.round((lockedInPlayers[i].pts / 992) * 100)}
          id={lockedInPlayers[i].id}
          pts2={lockedInPlayers[i].fgm}
          pts3={Math.round(
            (lockedInPlayers[i].pts -
              lockedInPlayers[i].fgm * 2 -
              lockedInPlayers[i].ftm) /
              3
          )}
          asst={lockedInPlayers[i].ast}
          ft={lockedInPlayers[i].ftm}
          b={lockedInPlayers[i].blk}
          rb={lockedInPlayers[i].dreb + lockedInPlayers.oreb}
          st={lockedInPlayers[i].stl}
          type="NO"
        />
      );
    }
    return players;
  }

  return (
    <div className="TeamSelection">
      <div className="NavTeamSelection">
        <div className="TabsTeamSelection">
          <Tabs isFitted variant="enclosed">
            <TabList borderTop="1px solid #ede7e3;" h="50px">
              <Tab
                mb="0"
                bg="#82c0cc"
                _selected={{ color: "black", bg: "#ffa62b" }}
                className="myteam-tab"
                style={{
                  color: "black",
                  border: "none",
                  boxShadow: "none",
                  outline: "none",
                  borderRadius: 0,
                  borderLeft: "1px solid #ede7e3",
                  borderRight: "1px solid #ede7e3",
                  fontSize: ".9em"
                }}>
                Team Stats
              </Tab>
              <Tab
                mb="0"
                bg="#82c0cc"
                _selected={{ color: "black", bg: "#ffa62b" }}
                style={{
                  color: "black",
                  border: "none",
                  boxShadow: "none",
                  outline: "none",
                  borderRadius: 0,
                  borderRight: "1px solid #ede7e3",
                  fontSize: ".9em"
                }}>
                Roster Selection
              </Tab>
            </TabList>

            <TabPanels borderTop="1px solid #ede7e3;" color="#ede7e3">
              <TabPanel>
                {isLockedIn && canLockIn ? (
                  <div className="SecondaryTabsTeamStats">
                    {getActivePlayers(allPlayers)}
                  </div>
                ) : (
                  <div className="SecondaryTabsTeamStats">
                    <h1
                      style={{
                        float: "left",
                        margin: "auto",
                        fontSize: "1.2em"
                      }}>
                      NO PLAYER DATA / ROSTER NOT LOCKED
                    </h1>
                  </div>
                )}
              </TabPanel>
              {isLockedIn ? (
                <TabPanel>
                  <div
                    style={{
                      width: "200%",
                      height: "680px",
                      backgroundColor: "rgba(34, 168, 168, 0.8)",
                    }}>
                    <div className="ifLockedInButton">PLAYERS LOCKED IN</div>
                  </div>
                </TabPanel>
              ) : (
                <TabPanel>
                  <div className="SecondaryTabsRosterSelection">
                    {allPlayers[0] ? generatePlayerDivs(allPlayers) : null}
                  </div>
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </div>

        {!isLockedIn ? (
          <div
            className="ActionsTeamSelection"
            style={{ textAlign: "center", marginTop: "5px" }}>
            <Tooltip label="Save Changes" placement="bottom" bg="blue.500">
              <Button
                marginTop="5px"
                variantColor="blue"
                onClick={() => {
                  var result = "";
                  var characters =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                  var charactersLength = characters.length;
                  for (var i = 0; i < 14; i++) {
                    result += characters.charAt(
                      Math.floor(Math.random() * charactersLength)
                    );
                  }
                  Axios.post(
                    "http://localhost:8080/team/createTeam",
                    {
                      id: result,
                      userId: userData.user.id,
                      playerIdList: activePlayers,
                      power: myTeamRP,
                      totalPoints: 0,
                      tourId: tournamentData.id,
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + userData.token,
                      },
                    }
                  )
                    .then((res) => {
                      console.log(res.data);

                      Axios.post(
                        "http://localhost:8080/userInfo/update/" +
                          userData.user.id,
                        {
                          id: userData.user.id,
                          username: userData.user.username,
                          password: userData.user.password,
                          email: userData.user.email,
                          firstName: userData.user.firstName,
                          lastName: userData.user.lastName,
                          friendIDs: userData.user.friendIDs,
                          announcementIDs: userData.user.announcementIDs,
                          accountPoints: userData.user.accountPoints,
                          team1Id:
                            type === "tour1" ? result : userData.user.team1Id,
                          team2Id:
                            type === "tour2" ? result : userData.user.team2Id,
                          tournament1Id: userData.user.tournament1Id,
                          tournament2Id: userData.user.tournament2Id,
                          matchIDs: userData.user.matchIDs,
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + userData.token,
                          },
                        }
                      )
                        .then((res) => {
                          console.log(res.data.username);
                          setUserData({
                            token: userData.token,
                            user: res.data,
                          });

                          Axios.put(
                            "http://localhost:8080/tournaments/" + tourInfoId,
                            {
                              headers: {
                                Authorization: "Bearer " + userData.token,
                              },
                            }
                          ).then((res) => {
                            setTournamentData(res.data);
                          });
                        })
                        .then((err) => {
                          console.log(err);
                        });

                      toast({
                        title: "Team Saved!",
                        description: "Team Players Saved!",
                        status: "success",
                        duration: 2000,
                        isClosable: false,
                      });
                      setIsLockedIn(true);
                      setCanLockIn(true);
                    })
                    .then((err) => {
                      console.log(err);
                    });
                }}>
                Lock In{" "}
                <Icon
                  marginLeft="0px"
                  style={{ float: "left", marginLeft: "10px" }}
                  name="check"
                  size="28px"
                  color="green.300"
                />
              </Button>
            </Tooltip>
          </div>
        ) : null}
      </div>
    </div>
  );
}
