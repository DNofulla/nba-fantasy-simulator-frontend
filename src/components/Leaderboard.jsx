import Axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import userContext from "../services/userContext";
import "../styles/Leaderboard.css";

export default function Leaderboard({ tourid, type, superType }) {
  const [users, setUsers] = useState([]);
  const { userData, setUserData } = useContext(userContext);
  useEffect(() => {
    if (type === "Global") {
      Axios.get("http://localhost:8080/userInfo", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      }).then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
    } else {
      Axios.get(
        "http://localhost:8080/global/action/getUsersByTournamentId/" + tourid,
        {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        }
      )
        .then((res) => {
          console.log(res.data);

          for (let i = 0; i < res.data.length; i++) {
            const val = {
              accountPoint: res.data[i].teamId.totalPoints,
              username: res.data[i].user.username,
            };
            setUsers([...users, val]);
          }
          console.log("LEADERBOARD VALUES");
          console.log(users);
        })
        .then((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div style={{ color: "black" }} className="Leaderboard">
      <h1
        style={{
          margin: 0,
          padding: 0,
          paddingTop: "5px",
          paddingBottom: "5px",
          color: "#ede7e3",
          background: "#16697a",
          borderRadius: "25px 25px 0 0",
        }}>
        {superType} Leaderboard
      </h1>
      <div className="innerLeaderboard">
        <table style={{ color: "white" }} className="LeaderboardTable">
          <tr className="LeaderboardRow">
            <th id="PositionTag" className="LeaderboardColumn">
              #
            </th>
            <th id="TeamNameTag" className="LeaderboardColumn">
              {type === "Global" ? "Users" : "Teams"}
            </th>
            <th id="PointsTag" className="LeaderboardColumn">
              Pts
            </th>
          </tr>
          {users.length === 0 ? (
            <tr className="LeaderboardRow">
              <th className="LeaderboardColumn">X</th>
              <th className="LeaderboardColumn">
                {type === "Global" ? "NO USER" : "NO TEAM"}
              </th>
              <th className="LeaderboardColumn">X</th>
            </tr>
          ) : (
            users.map((data, index) => (
              <tr className="LeaderboardRow">
                <th className="LeaderboardColumn">{index + 1}</th>
                <th className="LeaderboardColumn">{data.username}</th>
                <th className="LeaderboardColumn">{data.accountPoint}</th>
              </tr>
            ))
          )}
        </table>
      </div>
    </div>
  );
}
