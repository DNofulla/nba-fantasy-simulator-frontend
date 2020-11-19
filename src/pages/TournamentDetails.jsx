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

export default function TournamentDetails(props) {
  const [myTeamRP, setMyTeamRP] = useState(0);
  const { userData, setUserData } = useContext(userContext);
  const [tournamentData, setTournamentData] = useState({});
  const [teamData, setTeamData] = useState({});
  const [matchesRemaining, setMatchesRemaining] = useState([]);
  const [allMatchData, setAllMatchData] = useState([]);
  const [matchesPlayed, setMatchesPlayed] = useState([]);
  const [type, setTypeValue] = useState();

  useEffect(() => {
    const id = userData.user.id;

    Axios.get("http://localhost:8080/userInfo/byId/" + id, {
      headers: {
        Authorization: "Bearer " + userData.token,
      },
    }).then((res) => {
      setUserData({
        token: userData.token,
        user: res.data,
      });

      if (props.tourIdProp !== "none" && props.tourIdProp !== null) {
        Axios.get("http://localhost:8080/tournaments/getTournamentDataById", {
          params: {
            tournamentId: props.tourIdProp,
          },
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        })
          .then((res) => {
            console.log(res);
            setTournamentData(res.data);
          })
          .then((err) => {
            console.log(err);
          });

        Axios.get("http://localhost:8080/team", {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        })
          .then((res) => {
            console.log(res.data);
            setTeamData(res.data);
          })
          .then((err) => {
            console.log(err);
          });

        Axios.get(
          "http://localhost:8080/match/tournament/" + props.tourIdProp,
          {
            headers: {
              Authorization: "Bearer " + userData.token,
            },
          }
        )
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
    });
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
                    fontSize: ".9em"
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
                    fontSize: ".9em"
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
                    fontSize: ".9em"
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
                    <MatchHistory type="Match History" bgColor="" />
                    <MatchHistory type="Upcoming Matches" bgColor="#ffa62b" />
                  </div>
                </TabPanel>
                <TabPanel>
                  <div id="TourDetailsPanel3">
                    <div id="tour-chat">
                      <Chat
                        chatClass="ChatBox"
                        icd="InnerChatDiv"
                        chatName="Tournament Chat"
                      />
                    </div>
                    <div id="tour-lb">
                      <Leaderboard />
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
