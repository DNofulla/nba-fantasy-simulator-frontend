import React from "react";
import "../styles/GlobalLeaderboard.css";
import "../styles/TeamInformation.css";
import TeamCard from "./TeamCard";

const teams = [
    { id: 1, name: "Team1", rankingPoints: 100, twoPointers: 240, threePointers: 120, ppg: 840 },
    { id: 2, name: "Team2", rankingPoints: 70, twoPointers: 140, threePointers: 100, ppg: 150 },
    { id: 3, name: "Team3", rankingPoints: 68, twoPointers: 100, threePointers: 120, ppg: 84 },
    { id: 4, name: "Team4", rankingPoints: 61, twoPointers: 97, threePointers: 100, ppg: 40 },
    { id: 5, name: "Team5", rankingPoints: 56, twoPointers: 86, threePointers: 70, ppg: 80 },
    { id: 6, name: "Team6", rankingPoints: 37, twoPointers: 79, threePointers: 60, ppg: 90 },
    { id: 7, name: "Team7", rankingPoints: 75, twoPointers: 72, threePointers: 50, ppg: 100 },
    { id: 8, name: "Team8", rankingPoints: 43, twoPointers: 70, threePointers: 40, ppg: 98 },
    { id: 9, name: "Team9", rankingPoints: 92, twoPointers: 68, threePointers: 12, ppg: 120 },
    { id: 10, name: "Team10", rankingPoints: 15, twoPointers: 1, threePointers: 0, ppg: 2 },
  ];
  
  function generateTeamDivs() {
    let players = [];
  
    for (let i = 0; i < teams.length; i++) {
      players.push(
        <div id={teams[i].id} className="teamCardDiv">
          <TeamCard 
            name={teams[i].name}
            rankingPoints={teams[i].rankingPoints}
            id={teams[i].id}
            twoPointers={teams[i].twoPointers}
            threePointers={teams[i].threePointers}
            totalPoints={teams[i].twoPointers * 2 + teams[i].threePointers * 3}
            ppg={teams[i].ppg}
          />
        </div>
      );
    }
    return players;
  }

export default function TeamInformation() {
    return (    
        <div className="teamDivs">{generateTeamDivs()}</div>
    );
}