import React, { useContext, useEffect, useState } from "react";
import "../styles/TournamentCard.css";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Button,
  Image,
  Progress,
  Box,
  Modal,
  useDisclosure,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/core";
import { Link, Redirect, useHistory } from "react-router-dom";
import userContext from "../services/userContext";
import Axios from "axios";

export default function TournamentCard({ type, tourid, condition, myTeamRP }) {
  const { userData, setUserData } = useContext(userContext);
  const disclosure1 = new useDisclosure();
  const history = useHistory();

  const [lockedTeamCount, setLockedTeamCount] = useState(0);
  const [averageTeamRankingPoints, setAverageTeamRankingPoints] = useState(0);
  const [totalMatchCount, setTotalMatchCount] = useState(0);

  // Derived from Calls to Database
  const [matchesRemaining, setMatchesRemaining] = useState([]);
  const [allMatchData, setAllMatchData] = useState([]);
  const [matchesPlayed, setMatchesPlayed] = useState([]);
  const [myTeamRankingPoints, setMyTeamRankingPoints] = useState(0);
  const [teamData, setTeamData] = useState([]);
  const [tournamentData, setTournamentData] = useState({});

  const [newTourName, setNewTourName] = useState("");
  const [newTourLockedIn, setNewTourLockedIn] = useState(false);
  const [newTourImageURL, setNewTourImageURL] = useState(
    "https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc4NjAzNTE3NDcwMDI1/ask-history-who-invented-basketball-istock_000006523151large-2.jpg"
  );
  const [newTourMaxParticipants, setNewTourMaxParticipants] = useState(16);
  const [newTourPublicStatus, setNewTourPublicStatus] = useState(true);
  const [newTourHostUserId, setNewTourHostUserId] = useState(userData.user.id);
  const [newTourHostUsername, setNewTourHostUsername] = useState(
    userData.user.username
  );

  const [publicNew, setPublicNew] = useState(true);

  useEffect(() => {
    if (tourid !== "none" && tourid !== null) {
      Axios.get("http://localhost:8080/tournaments/getTournamentDataById", {
        params: {
          tournamentId: tourid,
        },
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
        .then((res) => {
          console.log(res);
          setTournamentData(res.data);
          if (res.data.tournamentId) {
            setTotalMatchCount(2 * tournamentData.registeredTeamId.length);
            setLockedTeamCount(tournamentData.registeredTeamId.length);
          }
        })
        .then((err) => {});

      Axios.get("http://localhost:8080/team", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
        .then((res) => {
          console.log(res.data);
          setTeamData(res.data);
        })
        .then((err) => {});

      Axios.get("http://localhost:8080/match/tournament/" + tourid, {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.length === 0) {
            setMatchesPlayed([]);
            setMatchesRemaining([]);
          } else {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].isPlayed) {
                setMatchesPlayed([...matchesPlayed, response.data[i]]);
              } else {
                setMatchesRemaining([...matchesRemaining, response.data[i]]);
              }
              setAllMatchData([...allMatchData, response.data[i]]);
            }
          }
        })
        .then((error) => {});
    }
  }, []);

  const createTournament = async () => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 14; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const options = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    try {
      const res = await Axios.post(
        "http://localhost:8080/tournaments",
        {
          id: result,
          hostUserId: userData.user.id,
          hostUsername: userData.user.username,
          lockedInStatus: newTourLockedIn,
          publicStatus: publicNew,
          tournamentName: newTourName,
          registeredTeamId: [],
          participantLimit: 16,
        },
        options
      );

      console.log(userData.user);
      if (type === "tour1") {
        if (res.status === 200) {
          console.log(userData.user.username);

          Axios.post(
            "http://localhost:8080/userInfo/update/" + userData.user.id,
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
              team1Id: userData.user.team1Id,
              team2Id: userData.user.team2Id,
              tournament1Id: result,
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
            })
            .then((err) => {
              console.log(err);
            });
        }
        setTimeout(() => {
          setTimeout(() => {
            history.push("/Home");
            setTimeout(() => {
              history.push("/MyTournaments");
              setTimeout(() => {
                history.push("/Home");
                setTimeout(() => {
                  history.push("/MyTournaments/");
                }, 50);
              }, 50);
            });
          });
        }, 50);
      } else {
        if (res.status === 200) {
          console.log(userData.user.username);

          Axios.post(
            "http://localhost:8080/userInfo/update/" + userData.user.id,
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
              team1Id: userData.user.team1Id,
              team2Id: userData.user.team2Id,
              tournament1Id: userData.user.tournament1Id,
              tournament2Id: result,
              matchIDs: userData.user.matchIDs,
            },
            {
              headers: {
                Authorization: "Bearer " + userData.token,
              },
            }
          )
            .then((res) => {
              console.log(res.data);
            })
            .then((err) => {
              console.log(err);
            });
        }
        setTimeout(() => {
          setTimeout(() => {
            history.push("/Home");
            setTimeout(() => {
              history.push("/MyTournaments");
              setTimeout(() => {
                history.push("/Home");
                setTimeout(() => {
                  history.push("/MyTournaments/");
                }, 50);
              }, 50);
            });
          });
        }, 50);
      }
      setNewTourName("");
      setTournamentData(res.data);
      console.log(userData.user);
    } catch (err) {
      console.log(err);
    }
  };

  if (condition === "MY_TOURS") {
    if (tourid === "none") {
      return (
        <div className="TournamentCard inactive-tour">
          <div>
              <Button
                _hover={{ background: "red", color: "white" }}
                background="red"
                color="white"
                onClick={disclosure1.onOpen}>
                Create Tournament
              </Button>
            </div>
            <div>
              <Button
                _hover={{ background: "rgb(20, 80, 120)", color: "white" }}
                background="rgb(20, 80, 120)"
                color="white"
                onClick={() => history.push("/MyTournaments/JoinTournament")}>
                Join a Tournament
              </Button>
          </div>

          <Modal
            size="1000px"
            isOpen={disclosure1.isOpen}
            onClose={disclosure1.onClose}>
            <ModalOverlay />
            <ModalContent
              border="1px solid white"
              borderRadius="20px"
              size="600px"
              background="rgb(20, 80, 120)">
              <ModalHeader textAlign="center">Create Tournament</ModalHeader>
              <ModalCloseButton
                _hover={{ background: "red", color: "white" }}
                background="red"
                color="white"
              />
              <ModalBody size="600px">
                <FormControl>
                  <Image
                    marginLeft="150px"
                    marginTop="10px"
                    size="250px"
                    objectFit="cover"
                    src={newTourImageURL}
                  />

                  <div
                    style={{
                      marginBottom: "10px",
                      marginLeft: "195px",
                      fontSize: "20px",
                    }}>
                    Tournament Name
                  </div>
                  <Input
                    marginLeft="110px"
                    width="50%"
                    value={newTourName}
                    onChange={(e) => setNewTourName(e.target.value)}
                  />

                  <RadioGroup
                    marginLeft="190px"
                    marginTop="20px"
                    onChange={setNewTourPublicStatus}
                    value={newTourPublicStatus}>
                    <Stack direction="row">
                      <Radio
                        onClick={() => {
                          setPublicNew(true);
                        }}
                        name="radioChoice"
                        value={true}>
                        Public
                      </Radio>
                      <Radio
                        onClick={() => {
                          setPublicNew(false);
                        }}
                        name="radioChoice"
                        value={false}>
                        Invite Only
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => {
                    setNewTourName("");
                    setNewTourLockedIn(false);
                    setNewTourHostUserId(userData.user.id);
                    setNewTourHostUsername(userData.user.username);
                    setNewTourImageURL(
                      "https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc4NjAzNTE3NDcwMDI1/ask-history-who-invented-basketball-istock_000006523151large-2.jpg"
                    );
                    setNewTourPublicStatus(true);
                    setNewTourMaxParticipants(16);
                    disclosure1.onClose();
                  }}
                  background="red"
                  color="white"
                  mr={3}>
                  Cancel
                </Button>
                <Button
                  color="white"
                  background="rgb(50, 120, 200)"
                  onClick={(e) => {
                    createTournament(e);
                    disclosure1.onClose();
                  }}>
                  Create
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      );
    } else {
      return (
        <div className="TournamentCard">
          <div className="TournamentCardImage">
            <Image
              size="100%"
              objectFit="fill"
              src={newTourImageURL}
              alt="Tournament Image"
            />
          </div>
          <div className="TournamentCardDetails">
            <div id="TournamentCardName">{tournamentData.tournamentName}</div>
            <div id="TournamentCardActive">Public Status:</div>
            <div id="TCardActiveValue">
              {tournamentData.publicStatus === true ? "Public" : "Invite Only"}
            </div>
            <div id="TournamentCardLocked">Locked In Status:</div>
            <div id="TCardLockedValue">{`${tournamentData.lockedInStatus}`}</div>
            <div id="TCardHostName">Host: </div>
            <div id="TCardHostNameValue">{tournamentData.hostUsername}</div>
            <div id="TournamentCardID">Tournament ID:</div>
            <div id="TCardIDValue">#{tournamentData.id}</div>
          </div>

          <div className="ViewTournamentButtonDiv">
            <Link
              to={{
                pathname: `/TournamentDetails/${tourid}/${type}`,
              }}>
              <Button
                _focus={{ outline: "none", border: "none" }}
                style={{ outline: "none", border: "none", cursor: "pointer" }}
                bg="#ffa62b"
                color="black"
                size="md">
                View Tournament
              </Button>
            </Link>
          </div>
        </div>
      );
    }
  } else {
    if (tourid === "none") {
      return <Redirect to="/MyTournaments" />;
    } else {
      return (
        <div className="TournamentCard">
          <div className="TournamentCardImage">
            <Image
              size="100%"
              objectFit="fill"
              src={newTourImageURL}
              alt="Tournament Image"
            />
          </div>
          <div className="TournamentCardDetails">
            <div id="TournamentCardName">{tournamentData.tournamentName}</div>
            <div id="TournamentCardActive">Public Status:</div>
            <div id="TCardActiveValue">
              {tournamentData.publicStatus === true ? "Public" : "Invite Only"}
            </div>
            <div id="TournamentCardLocked">Locked In Status:</div>
            <div id="TCardLockedValue">
              {tournamentData.lockedInStatus === true
                ? "Locked In"
                : "Unlocked"}
            </div>
            <div id="TCardHostName">Host: </div>
            <div id="TCardHostNameValue">{tournamentData.hostUsername}</div>
            <div id="TournamentCardID">Tournament ID:</div>
            <div id="TCardIDValue">#{tournamentData.id}</div>
          </div>
          <div className="StatsTourCard">
            <div className="more-info">
              <Accordion
                allowToggle
                allowMultiple
                marginTop="5px"
                marginBottom="5px">
                <AccordionItem defaultIsOpen="false">
                  {({ isExpanded }) => (
                    <>
                      <AccordionHeader
                        border="none"
                        borderRadius="10px"
                        color="#ede7e3"
                        bg="#16697a"
                        _hover="bg: #ffa62b">
                        <Box flex="1" textAlign="center">
                          {isExpanded ? "Show Less" : "Show More"}
                        </Box>
                      </AccordionHeader>
                      <AccordionPanel>
                        <div className="acc-element" id="TourRegisteredTeams">
                          Locked Teams: {lockedTeamCount} / 16
                        </div>
                        <div className="acc-element" id="AverageRankingPoints">
                          Average Team RP: {averageTeamRankingPoints} / 400
                        </div>
                        <div className="acc-element" id="TourTotalMatches">
                          Total Matches: {totalMatchCount}
                        </div>
                        <div className="acc-element" id="TourMatchesRemaining">
                          Matches Remaining: {matchesRemaining.length} /{" "}
                          {totalMatchCount}
                        </div>
                        <Progress
                          borderRadius="15px"
                          hasStripe
                          isAnimated
                          color="red"
                          size="lg"
                          value={
                            (matchesRemaining.length / totalMatchCount) * 100
                          }
                          marginTop="5px"
                        />

                        <div id="TourMatchesPlayed">
                          Matches Played: {matchesPlayed.length} /{" "}
                          {totalMatchCount}
                        </div>
                        <Progress
                          borderRadius="15px"
                          hasStripe
                          isAnimated
                          color="yellow"
                          size="lg"
                          value={(matchesPlayed.length / totalMatchCount) * 100}
                          marginTop="5px"
                        />

                        <div id="TeamEarnedPoints">
                          My Team's RP: {myTeamRP} / 400
                        </div>

                        <Progress
                          borderRadius="15px"
                          hasStripe
                          isAnimated
                          color="pink"
                          size="lg"
                          value={(myTeamRP / 400) * 100}
                          marginTop="5px"
                        />
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      );
    }
  }
}
