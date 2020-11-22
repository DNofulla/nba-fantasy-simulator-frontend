import { Button } from "@chakra-ui/core";
import { borderParser } from "@chakra-ui/react";
import Axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import userContext from "../services/userContext";

export default function JoinTournament() {
  const { userData, setUserData } = useContext(userContext);
  const [tournamentData, setTournamentData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTourSlot, setCurrentTourSlot] = useState();
  const [currentTournamentId, setCurrentTournamentId] = useState();

  const history = useHistory();

  useEffect(() => {
    Axios.get(
      "localhost://localhost:8080/global/action/getPublicTournamentList"
    )
      .then((res) => {
        console.log(res);
        
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  const JoinTournament = async (e, index) => {
    e.preventDefault();
    let type;

    setCurrentTournamentId(tournamentData[index].tournamentId);

    const res = await Axios.post("/updateUserTournamentList", {
      params: {
        type: type,
        tournamentId: currentTournamentId,
        username: userData.user.username,
        userId: userData.user.id,
      },
    });
    console.log(res.data);
  };

  return userData.user.tournament1Id === "none" ||
    userData.user.tournament2Id === "none" ? (
    <div className="JoinTournamentPage">
      <div
        style={{
          width: "500px",
          height: "700px",
          background: "rgb(100, 100, 150)",
          margin: "auto",
          marginTop: "90px",
          border: "5px solid white",
        }}>
        {isOpen ? (
          tournamentData.map((data, index) => {
            <div
              style={{
                width: "100%",
                height: "50px",
                borderTop: "1px solid white",
                borderBottom: "1px solid white",
              }}>
              <div
                style={{
                  width: "50%",
                  float: "left",
                  textAlign: "center",
                  fontSize: "20px",
                  marginTop: "10px",
                }}>
                {data[index].name}
              </div>
              <div
                style={{
                  width: "50%",
                  float: "left",
                  textAlign: "center",
                  fontSize: "20px",
                  marginTop: "5px",
                }}>
                <Button
                  type="submit"
                  onClick={(e) => {
                    JoinTournament(e, index);
                    history.push("/MyTournaments");
                  }}>
                  Join This Tournament
                </Button>
              </div>
            </div>;
          })
        ) : (
          <div style={{ marginTop: "60%" }}>
            <Button
              isDisabled={userData.user.tournament1Id !== "none" ? true : false}
              w="100%"
              float="left"
              onClick={() => {
                setCurrentTourSlot("slot1");
                setIsOpen(!isOpen);
              }}>
              Tournament Slot #1
            </Button>
            <Button
              isDisabled={userData.user.tournament2Id !== "none" ? true : false}
              w="100%"
              float="left"
              onClick={() => {
                setCurrentTourSlot("slot2");
                setIsOpen(!isOpen);
              }}>
              Tournament Slot #2
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/MyTournaments" />
  );
}
