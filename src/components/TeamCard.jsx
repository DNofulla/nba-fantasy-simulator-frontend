import React, { useState } from "react";
import "../styles/TeamCard.css";
import ProgressBar from "./ProgressBar";

export default function TeamCard(props) {

    return (
    <div className="TeamCard">
      <img
        className="TeamImage"
        src="https://www.pngitem.com/pimgs/m/508-5088889_work-in-progress-logo-png-transparent-png.png"
        alt="TeamImage"
        width="200px"
        height="150px"
      />

      <div className="TeamDescription">
        <h4 style={{ padding: 0, margin: 0 }}>{props.name}</h4>
        <ProgressBar
          statName="RP (Max 400)"
          backgroundColor="black"
          color="orange"
          maxValue={100}
          value={props.rankingPoints}
        />
        <h4 style={{ padding: 0, margin: 0 }}>{props.twoPointers} Two Pointers</h4>
        <h4 style={{ padding: 0, margin: 0 }}>{props.threePointers} Three Pointers</h4>
        <h4 style={{ padding: 0, margin: 0 }}>{props.totalPoints} Total Points</h4>
        <h4 style={{ padding: 0, margin: 0 }}>{props.ppg} Points/Game</h4>
      </div>
    </div>
  );
}
