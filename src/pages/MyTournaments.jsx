import React, { useContext, useEffect, useState } from "react";
import "../styles/MyTournaments.css";
import TournamentCard from "../components/TournamentCard";
import userContext from "../services/userContext";
import Axios from "axios";
import { Redirect } from "react-router";

export default function MyTournaments() {
  const { userData, setUserData } = useContext(userContext);

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
    });
  }, []);

  return (
    <div className="MyTournaments">
      <div className="innerMyTournaments">
        <div id="Tour1">
          <TournamentCard
            type="tour1"
            tourid={userData.user.tournament1Id}
            condition="MY_TOURS"
          />
        </div>
        <div id="Tour2">
          <TournamentCard
            type="tour2"
            tourid={userData.user.tournament2Id}
            condition="MY_TOURS"
          />
        </div>
      </div>
    </div>
  );
}
