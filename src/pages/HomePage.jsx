import React, { useEffect, useContext } from "react";
import "../styles/Homepage.css";
import LeagueNews from "../components/LeagueNews";
import Chat from "../components/Chat";
import Leaderboard from "../components/Leaderboard";

export default function Homepage() {
  return (
    <div className="Homepage">
      <div id="home-components">
        <div className="home-element">
          <LeagueNews />
        </div>
        <div className="home-element" id="home-lb">
          <Leaderboard type="Global" superType="Global User" />
        </div>
        <div className="home-element" id="home-chat">
          <Chat chatClass="ChatBox" icd="InnerChatDiv" chatName="Global Chat" />
        </div>
      </div>
    </div>
  );
}
