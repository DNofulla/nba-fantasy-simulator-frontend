import React, { useContext } from "react";
import "../styles/MyTournaments.css";
import TournamentCard from "../components/TournamentCard";
import userContext from "../services/userContext";

export default function MyTournaments() {
  const { userData, setUserData } = useContext(userContext);

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
