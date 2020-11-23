import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/TournamentDetails.css";
import { Tab, TabList, TabPanels, Tabs, TabPanel } from "@chakra-ui/core";
import TournamentCard from "../components/TournamentCard";
import Chat from "../components/Chat";
import Leaderboard from "../components/Leaderboard";
import TeamSelection from "../components/TeamSelection";
import MatchHistory from "../components/MatchHistory";
import Axios from "axios";
import userContext from "../services/userContext";
import friendListContext from "../services/friendListContext";
import friendRequestContext from "../services/friendRequestContext";
import teamContext from "../services/teamContext";
import tournamentContext from "../services/tournamentContext";
import tournamentRequestContext from "../services/tournamentRequestContext";

export default function TournamentDetails(props) {
  const [myTeamRP, setMyTeamRP] = useState(0);
  const [matchesRemaining, setMatchesRemaining] = useState([]);
  const [allMatchData, setAllMatchData] = useState([]);
  const [matchesPlayed, setMatchesPlayed] = useState([]);
  const [type, setTypeValue] = useState();

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

  const [team1Data, setTeam1Data] = useState();
  const [team2Data, setTeam2Data] = useState();
  const [tournament1Data, setTournament1Data] = useState();
  const [tournament2Data, setTournament2Data] = useState();
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

    if (props.tourIdProp !== "none") {
      Axios.get("http://localhost:8080/tournaments/getTournamentDataById", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
        params: {
          tournamentId: props.tourIdProp,
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

  return (
    <div className="TournamentDetails">
      <div id="tcd-wrapper">
        <div className="TourCardDetailsPageDiv">
          <TournamentCard
            setTypeValue={(value) => setTypeValue(value)}
            tourid={props.tourIdProp}
            imgsrc="https://i.pinimg.com/originals/0d/62/c5/0d62c5a2849ad4e0722d01deba9e363a.jpg"
            condition="TOUR_DETAILS"
            myTeamRP={myTeamRP}
          />
        </div>

        <div className="innerTournamentDetails">
          <div className="NavBarTabsTournamentDetails">
            <Tabs isFitted variant="enclosed">
              <TabList h="70px">
                <Tab
                  mt="-1px"
                  bg="#82c0cc"
                  _selected={{ color: "black", bg: "#ffa62b" }}
                  style={{
                    color: "black",
                    border: "none",
                    boxShadow: "none",
                    outline: "none",
                    borderRadius: "10px 0 0 0",
                    fontSize: ".9em",
                  }}>
                  My Team
                </Tab>
                <Tab
                  mt="-1px"
                  bg="#82c0cc"
                  _selected={{ color: "black", bg: "#ffa62b" }}
                  style={{
                    color: "black",
                    border: "none",
                    boxShadow: "none",
                    outline: "none",
                    borderRadius: 0,
                    fontSize: ".9em",
                  }}>
                  Past and Upcoming Matches
                </Tab>
                <Tab
                  mt="-1px"
                  bg="#82c0cc"
                  _selected={{ color: "black", bg: "#ffa62b" }}
                  style={{
                    color: "black",
                    border: "none",
                    boxShadow: "none",
                    outline: "none",
                    borderRadius: "0 10px 0 0",
                    fontSize: ".9em",
                  }}>
                  Chat and Leaderboard
                </Tab>
              </TabList>

              <TabPanels color="black">
                <TabPanel>
                  <div id="TourDetailsPanel1">
                    <TeamSelection
                      type={type}
                      tourInfoId={props.tourIdProp}
                      myTeamRP={myTeamRP}
                      setMyTeamRP={(val) => setMyTeamRP(val)}
                    />
                  </div>
                </TabPanel>
                <TabPanel>
                  <div id="TourDetailsPanel2">
                    <MatchHistory tourid={props.tourIdProp} type="Match History" bgColor="" />
                    <MatchHistory tourid={props.tourIdProp} type="Upcoming Matches" bgColor="#ffa62b" />
                  </div>
                </TabPanel>
                <TabPanel>
                  <div id="TourDetailsPanel3">
                    <div id="tour-chat">
                      <Chat
                        tournamentID={props.tourIdProp}
                        chatName="Tournament Chat"
                      />
                    </div>
                    <div id="tour-lb">
                      <Leaderboard tourid={props.tourIdProp} />
                    </div>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
