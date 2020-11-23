import React from "react";
import { useEffect, useContext } from "react";
import "../styles/MatchHistory.css";
import Axios from "axios";
import userContext from "../services/userContext";
import friendListContext from "../services/friendListContext";
import friendRequestContext from "../services/friendRequestContext";
import teamContext from "../services/teamContext";
import tournamentContext from "../services/tournamentContext";
import tournamentRequestContext from "../services/tournamentRequestContext";
import { useState } from "react";

export default function MatchHistory({ type, bgColor, tourid }) {
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

  const [playedMatches, setPlayedMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

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
      })
      .then((error) => {
        console.log(error);
      });

    Axios.get("http://localhost:8080/global/action/getMatches/" + tourid, {
      headers: {
        Authorization: "Bearer " + userData.token,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.upcomingMatches.length !== 0) {
          setUpcomingMatches(res.data.upcomingMatches);
        }
        if (res.data.playedMatches.length !== 0) {
          setPlayedMatches(res.data.playedMatches);
        }
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="MatchHistory">
      <div className="MatchHistoryTitleSection">
        <h1 id="matchHistoryTitle">{type}</h1>
      </div>
      <div className="InnerMatchHistoryDiv">
        {type === "Match History" && playedMatches.length === 0 ? (
          <div
            className="MatchHistoryTab"
            style={{ color: "black", backgroundColor: `${bgColor}` }}>
            <h2 id="MatchHistoryTabTitle">NO MATCHES</h2>
            <h3 id="MatchHistoryTabDesc">NO RESULTS</h3>
          </div>
        ) : type === "Match History" && playedMatches.length !== 0 ? (
          playedMatches.map((data, index) => (
            <div
              className="MatchHistoryTab"
              style={{ color: "black", backgroundColor: `${bgColor}` }}>
              <h2 id="MatchHistoryTabTitle">
                Tournament ID:{data.tournamentId}
              </h2>
              <h3 id="MatchHistoryTabDesc">
                Team 1 ID: {data.teamId[0]} vs Team 2 ID: {data.teamId[1]}
              </h3>
            </div>
          ))
        ) : type === "Upcoming Matches" && upcomingMatches.length === 0 ? (
          <div
            className="MatchHistoryTab"
            style={{ color: "black", backgroundColor: `${bgColor}` }}>
            <h2 id="MatchHistoryTabTitle">NO MATCHES</h2>
            <h3 id="MatchHistoryTabDesc">NO RESULTS</h3>
          </div>
        ) : (
          upcomingMatches.map((data, index) => (
            <div
              className="MatchHistoryTab"
              style={{ color: "black", backgroundColor: `${bgColor}` }}>
              <h2 id="MatchHistoryTabTitle">
                Tournament ID:{data.tournamentId}
              </h2>
              <h3 id="MatchHistoryTabDesc">
                Team 1 ID: {data.teamId[0]} vs Team 2 ID: {data.teamId[1]}
              </h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
