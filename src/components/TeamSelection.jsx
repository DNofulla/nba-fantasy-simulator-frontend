import React, { useEffect, useState } from "react";
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
import { MdRefresh } from "react-icons/md";

export default function TeamSelection({ setMyTeamRP }) {
  const [playerRankingPoints, setPlayerRankingPoints] = useState(0);
  const [rosterPlayersCount, setRosterPlayersCount] = useState();
  const [activePlayersCount, setActivePlayersCount] = useState();
  const [rosterPlayers, setRosterPlayers] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);
  const [canLockIn, setCanLockIn] = useState(false);
  const [isLockedIn, setIsLockedIn] = useState(false);
  const [locked, setLocked] = useState(true);

  const toast = useToast();

  function getPlayerDataById(val) {
    const result = playersAvailable.find((obj) => {
      return obj.id === val;
    });
    return result;
  }

  function generatePlayerDivs(data) {
    let players = [];
    if (data === undefined || data === null) {
      for (let i = 0; i < playersAvailable.length; i++) {
        players.push(
          <PlayerCard
            onChange={(value) => {
              if (value.count > 0) {
                rosterPlayers.push(value.id);
              } else {
                const index = rosterPlayers.indexOf(value.id);
                console.log(index);
                rosterPlayers.splice(index, 1);
              }
              setRosterPlayersCount(rosterPlayersCount + value.count);
              if (rosterPlayers.length === 10) {
                setLocked(false);
              } else {
                setLocked(true);
                setCanLockIn(false);
                setActivePlayersCount(0);
                setIsLockedIn(false);
                setPlayerRankingPoints(0);
                setMyTeamRP(0);
                activePlayers.splice(0, activePlayers.length);
              }
            }}
            name={playersAvailable[i].name}
            rankingPoints={playersAvailable[i].rankingPoints}
            id={playersAvailable[i].id}
            pts2={playersAvailable[i].pts2}
            pts3={playersAvailable[i].pts3}
            asst={playersAvailable[i].asst}
            ft={playersAvailable[i].ft}
            b={playersAvailable[i].b}
            rb={playersAvailable[i].rb}
            st={playersAvailable[i].st}
          />
        );
      }
    } else {
      let rosterData = [];
      for (let i = 0; i < 10; i++) {
        rosterData.push(getPlayerDataById(data[i]));
        players.push(
          <PlayerCard
            onChange={(value) => {
              if (value.count > 0) {
                activePlayers.push(value.id);
              } else {
                const index = activePlayers.indexOf(value.id);
                console.log(index);
                activePlayers.splice(index, 1);
              }
              setActivePlayersCount(activePlayersCount + value.count);
              setMyTeamRP(playerRankingPoints + value.rp);
              setPlayerRankingPoints(playerRankingPoints + value.rp);

              if (activePlayers.length === 5) {
                setCanLockIn(true);
              } else {
                setCanLockIn(false);
              }
            }}
            name={rosterData[i].name}
            rankingPoints={rosterData[i].rankingPoints}
            id={rosterData[i].id}
            pts2={rosterData[i].pts2}
            pts3={rosterData[i].pts3}
            asst={rosterData[i].asst}
            ft={rosterData[i].ft}
            b={rosterData[i].b}
            rb={rosterData[i].rb}
            st={rosterData[i].st}
          />
        );
      }
    }
    return players;
  }

  function getActivePlayers(data) {
    let players = [];
    let rosterData = [];
    for (let i = 0; i < 5; i++) {
      rosterData.push(getPlayerDataById(data[i]));
      players.push(
        <div className="player-card">
          <PlayerCard
            name={rosterData[i].name}
            rankingPoints={rosterData[i].rankingPoints}
            id={rosterData[i].id}
            pts2={rosterData[i].pts2}
            pts3={rosterData[i].pts3}
            asst={rosterData[i].asst}
            ft={rosterData[i].ft}
            b={rosterData[i].b}
            rb={rosterData[i].rb}
            st={rosterData[i].st}
            type="NO"
          />
        </div>
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
                style={{
                  color: "black",
                  border: "none",
                  boxShadow: "none",
                  outline: "none",
                  borderRadius: 0,
                  borderLeft: "1px solid #ede7e3",
                  borderRight: "1px solid #ede7e3",
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
                }}>
                Roster Selection
              </Tab>
              {locked || isLockedIn ? null : (
                <Tab
                  mb="0"
                  bg="rgb(58, 29, 153)"
                  style={{
                    color: "#ede7e3",
                    border: "none",
                    boxShadow: "none",
                    outline: "none",
                    borderRadius: 0,
                    borderRight: "1px solid #ede7e3",
                  }}>
                  Active Players
                </Tab>
              )}
            </TabList>

            <TabPanels borderTop="1px solid #ede7e3;" color="#ede7e3">
              <TabPanel>
                {isLockedIn ? (
                  <div className="SecondaryTabsTeamStats">
                    {getActivePlayers(activePlayers)}
                  </div>
                ) : (
                  <div className="SecondaryTabsTeamStats">
                    <h1
                      style={{
                        float: "left",
                        margin: "auto",
                      }}>
                      NO PLAYER DATA
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
                    <div className="ifLockedInButton">
                      <Tooltip
                        label="Unlock Players"
                        placement="bottom"
                        bg="red.600">
                        <Button
                          variantColor="red"
                          onClick={() => {
                            toast({
                              title: "Active Players Un-Locked!",
                              description:
                                "Your Active players have been Un-Locked!",
                              status: "error",
                              duration: 2000,
                              isClosable: true,
                            });
                            setIsLockedIn(false);
                            setLocked(true);
                            rosterPlayers.splice(0, rosterPlayers.length);
                            activePlayers.splice(0, activePlayers.length);
                            setPlayerRankingPoints(0);
                            setMyTeamRP(0);
                          }}>
                          Un-Lock{" "}
                          <Icon
                            marginLeft="0px"
                            style={{ float: "left", marginLeft: "10px" }}
                            name="not-allowed"
                            size="28px"
                            color="#ede7e3"
                          />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </TabPanel>
              ) : (
                <TabPanel>
                  <div className="SecondaryTabsRosterSelection">
                    {generatePlayerDivs()}
                  </div>
                </TabPanel>
              )}
              {locked ? null : (
                <TabPanel>
                  <div className="SecondaryTabsActivePlayers">
                    {generatePlayerDivs(rosterPlayers)}
                  </div>
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </div>

        {canLockIn ? (
          <div className="ActionsTeamSelection" style={{ textAlign: "center" }}>
            <Tooltip label="Save Changes" placement="bottom" bg="blue.500">
              <Button
                variantColor="blue"
                onClick={() => {
                  toast({
                    title: "Active Players Saved!",
                    description: "Your Active players have been locked!",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                  setIsLockedIn(true);
                  setCanLockIn(false);
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
