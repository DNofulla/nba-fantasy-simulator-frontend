import React from "react";
import "../styles/MatchHistory.css";

export default function MatchHistory({ type, bgColor }) {
  return (
    <div className="MatchHistory">
      <div className="MatchHistoryTitleSection">
        <h1 id="matchHistoryTitle">{type}</h1>
      </div>

      <div className="InnerMatchHistoryDiv">
        <div
          className="MatchHistoryTab"
          style={{ color: "black", backgroundColor: `${bgColor}` }}>
          <h2 id="MatchHistoryTabTitle">Match 1</h2>
          <h3 id="MatchHistoryTabDesc">Team 1 vs Team 2</h3>
        </div>
        <div
          className="MatchHistoryTab"
          style={{ color: "black", backgroundColor: `${bgColor}` }}>
          <h2 id="MatchHistoryTabTitle">Match 2</h2>
          <h3 id="MatchHistoryTabDesc">Team 3 vs Team 4</h3>
        </div>
        <div
          className="MatchHistoryTab"
          style={{ color: "black", backgroundColor: `${bgColor}` }}>
          <h2 id="MatchHistoryTabTitle">Match 3</h2>
          <h3 id="MatchHistoryTabDesc">Team 5 vs Team 6</h3>
        </div>
        <div
          className="MatchHistoryTab"
          style={{ color: "black", backgroundColor: `${bgColor}` }}>
          <h2 id="MatchHistoryTabTitle">Match 4</h2>
          <h3 id="MatchHistoryTabDesc">Team 7 vs Team 8</h3>
        </div>
        <div
          className="MatchHistoryTab"
          style={{ color: "black", backgroundColor: `${bgColor}` }}>
          <h2 id="MatchHistoryTabTitle">Match 5</h2>
          <h3 id="MatchHistoryTabDesc">Team 9 vs Team 10</h3>
        </div>
        <div
          className="MatchHistoryTab"
          style={{ color: "black", backgroundColor: `${bgColor}` }}>
          <h2 id="MatchHistoryTabTitle">Match 6</h2>
          <h3 id="MatchHistoryTabDesc">Team 11 vs Team 12</h3>
        </div>
        <div
          className="MatchHistoryTab"
          style={{ color: "black", backgroundColor: `${bgColor}` }}>
          <h2 id="MatchHistoryTabTitle">Match 7</h2>
          <h3 id="MatchHistoryTabDesc">Team 13 vs Team 14</h3>
        </div>
        <div
          className="MatchHistoryTab"
          style={{ color: "black", backgroundColor: `${bgColor}` }}>
          <h2 id="MatchHistoryTabTitle">Match 8</h2>
          <h3 id="MatchHistoryTabDesc">Team 15 vs Team 16</h3>
        </div>
        <div
          className="MatchHistoryTab"
          style={{ color: "black", backgroundColor: `${bgColor}` }}>
          <h2 id="MatchHistoryTabTitle">Match 9</h2>
          <h3 id="MatchHistoryTabDesc">Team 17 vs Team 18</h3>
        </div>
      </div>
    </div>
  );
}
