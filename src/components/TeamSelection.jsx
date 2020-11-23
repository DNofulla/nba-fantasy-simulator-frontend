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
          activePlayers={activePlayers}
          setActivePlayers={setActivePlayers}
          name={data[i].name}
          rankingPoints={parseInt(data[i].rp)}
          id={data[i].id}
          pts2={data[i].fgm}
          pts3={Math.round((data[i].pts - data[i].fgm * 2 - data[i].ftm) / 3)}
          asst={data[i].ast}
          ft={data[i].ftm}
          b={data[i].blk}
          rb={data[i].dreb + data[i].oreb}
          st={data[i].stl}
          onChange={({ id, name, rp, type }) => {
            if (type === "INCREASE") {
              setActivePlayers([...activePlayers, id]);
              setPlayerRankingPoints(playerRankingPoints - rp);
              setMyTeamRP(playerRankingPoints - rp);
            } else {
              const index = activePlayers.indexOf(id);
              activePlayers.splice(index, 1);
              setPlayerRankingPoints(playerRankingPoints + rp);
              setMyTeamRP(playerRankingPoints + rp);
            }
            console.log(activePlayers);
          }}
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
                  fontSize: ".9em",
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
                  fontSize: ".9em",
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
                        fontSize: "1.2em",
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
                  if (activePlayers.length === 0 && myTeamRP <= 400) {
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
                      "http://localhost:8080/global/action/createTeam",
                      {
                        id: result,
                        userId: userData.user.id,
                        playerIdList: lockedInPlayers,
                        power: myTeamRP,
                        totalPoints: 0,
                        tourId: tourInfoId,
                      },
                      {
                        params: {
                          userId: userData.user.id,
                          tournamentId: tourInfoId,
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
                  } else {
                    toast({
                      title: "Cannot Create Team!",
                      description: "Max Player Count: 5,  Max RP: 400 RP",
                      status: "error",
                      duration: 2000,
                      isClosable: false,
                    });
                  }
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
