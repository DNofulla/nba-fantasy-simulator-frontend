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
  Input,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/core";
import { Link, Redirect, useHistory } from "react-router-dom";
import Axios from "axios";
import userContext from "../services/userContext";
import friendListContext from "../services/friendListContext";
import friendRequestContext from "../services/friendRequestContext";
import teamContext from "../services/teamContext";
import tournamentContext from "../services/tournamentContext";
import tournamentRequestContext from "../services/tournamentRequestContext";

export default function TournamentCard({ type, tourid, condition, myTeamRP }) {
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
  const disclosure1 = new useDisclosure();
  const history = useHistory();

  const [lockedTeamCount, setLockedTeamCount] = useState(0);
  const [averageTeamRankingPoints, setAverageTeamRankingPoints] = useState(0);
  const [totalMatchCount, setTotalMatchCount] = useState(0);
  const [matchesRemaining, setMatchesRemaining] = useState([]);
  const [matchesPlayed, setMatchesPlayed] = useState([]);

  const [team1Data, setTeam1Data] = useState();
  const [team2Data, setTeam2Data] = useState();
  const [tournament1Data, setTournament1Data] = useState();
  const [tournament2Data, setTournament2Data] = useState();

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

  const [currTournamentData, setCurrTournamentData] = useState({});
  const [currTeamData, setCurrTeamData] = useState({});

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
        setTeam1Data(response.data.team1);
        setTeam2Data(response.data.team2);
        setTournament1Data(response.data.tournament1);
        setTournament2Data(response.data.tournament2);
      })
      .then((error) => {
        console.log(error);
      });

    if (tourid !== "none") {
      Axios.get("http://localhost:8080/tournaments/getTournamentDataById", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
        params: {
          tournamentId: tourid,
        },
      })
        .then((res) => {
          setCurrTournamentData(res.data);
          console.log(res);
        })
        .then((err) => {
          console.log(err);
        });
    }
  }, []);

  const createTournament = (e) => {
    e.preventDefault();
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
      const registeredUserIdVals = [];
      registeredUserIdVals.push(userData.user.id);
      Axios.post(
        "http://localhost:8080/global/action/createTournament",
        {
          id: result,
          hostUserId: userData.user.id,
          hostUsername: userData.user.username,
          lockedInStatus: newTourLockedIn,
          publicStatus: publicNew,
          activeStatus: true,
          tournamentName: newTourName,
          registeredTeamId: [],
          registeredUserId: registeredUserIdVals,
          participantLimit: 16,
          upcomingMatchIds: [],
          completedMatchIds: [],
        },
        options
      ).then((res) => {
        console.log(res.data);
        setNewTourName("");
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
      });
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
            <div id="TournamentCardName">
              {currTournamentData.tournamentName}
            </div>
            <div id="TournamentCardActive">Public Status:</div>
            <div id="TCardActiveValue">
              {currTournamentData.publicStatus === true
                ? "Public"
                : "Invite Only"}
            </div>
            <div id="TournamentCardLocked">Locked In Status:</div>
            <div id="TCardLockedValue">{`${currTournamentData.lockedInStatus}`}</div>
            <div id="TCardHostName">Host: </div>
            <div id="TCardHostNameValue">{currTournamentData.hostUsername}</div>
            <div id="TournamentCardID">Tournament ID:</div>
            <div id="TCardIDValue">#{currTournamentData.id}</div>
          </div>

          <div className="ViewTournamentButtonDiv">
            <Link
              to={{
                pathname: `/TournamentDetails/${tourid}`,
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
            <div id="TournamentCardName">
              {currTournamentData.tournamentName}
            </div>
            <div id="TournamentCardActive">Public Status:</div>
            <div id="TCardActiveValue">
              {currTournamentData.publicStatus === true
                ? "Public"
                : "Invite Only"}
            </div>
            <div id="TournamentCardLocked">Locked In Status:</div>
            <div id="TCardLockedValue">
              {currTournamentData.lockedInStatus === true
                ? "Locked In"
                : "Unlocked"}
            </div>
            <div id="TCardHostName">Host: </div>
            <div id="TCardHostNameValue">{currTournamentData.hostUsername}</div>
            <div id="TournamentCardID">Tournament ID:</div>
            <div id="TCardIDValue">#{currTournamentData.id}</div>
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
