import React from "react";
import "../styles/Leaderboard.css";

const mockTeams = [
  {
    TeamName: "Team 1",
    Points: 86,
    Position: 1,
  },
  {
    TeamName: "Team 2",
    Points: 77,
    Position: 2,
  },
  {
    TeamName: "Team 3",
    Points: 74,
    Position: 3,
  },
  {
    TeamName: "Team 4",
    Points: 54,
    Position: 4,
  },
  {
    TeamName: "Team 5",
    Points: 47,
    Position: 5,
  },
  {
    TeamName: "Team 6",
    Points: 43,
    Position: 6,
  },
  {
    TeamName: "Team 7",
    Points: 42,
    Position: 7,
  },
  {
    TeamName: "Team 8",
    Points: 31,
    Position: 8,
  },
  {
    TeamName: "Team 9",
    Points: 24,
    Position: 9,
  },
  {
    TeamName: "Team 10",
    Points: 21,
    Position: 10,
  },
  {
    TeamName: "Team 11",
    Points: 18,
    Position: 11,
  },
  {
    TeamName: "Team 12",
    Points: 14,
    Position: 12,
  },
  {
    TeamName: "Team 13",
    Points: 13,
    Position: 13,
  },
  {
    TeamName: "Team 14",
    Points: 12,
    Position: 14,
  },
  {
    TeamName: "Team 15",
    Points: 11,
    Position: 15,
  },
  {
    TeamName: "Team 16",
    Points: 10,
    Position: 16,
  },
  {
    TeamName: "Team 17",
    Points: 9,
    Position: 17,
  },
];

function generateLeaderboard() {
  let tableRows = [];
  tableRows.push(
    <tr className="LeaderboardRow">
      <th id="PositionTag" className="LeaderboardColumn">
        #
      </th>
      <th id="TeamNameTag" className="LeaderboardColumn">
        Team Name
      </th>
      <th id="PointsTag" className="LeaderboardColumn">
        Pts
      </th>
    </tr>
  );
  for (let i = 0; i < mockTeams.length; i++) {
    tableRows.push(
      <tr className="LeaderboardRow">
        <th className="LeaderboardColumn">{mockTeams[i].Position}</th>
        <th className="LeaderboardColumn">{mockTeams[i].TeamName}</th>
        <th className="LeaderboardColumn">{mockTeams[i].Points}</th>
      </tr>
    );
  }
  return tableRows;
}

export default function Leaderboard(props) {
  return (
    <div style={{ color: "black" }} className="Leaderboard">
      <h1
        style={{
          margin: 0,
          padding: 0,
          paddingTop: "5px",
          paddingBottom: "5px",
        }}>
        {props.type} Leaderboard
      </h1>
      <div className="innerLeaderboard">
        <table style={{ color: "white" }} className="LeaderboardTable">
          {generateLeaderboard()}
        </table>
      </div>
    </div>
  );
}
