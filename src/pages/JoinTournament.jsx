import { Button } from "@chakra-ui/core";
import { borderParser } from "@chakra-ui/react";
import Axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import userContext from "../services/userContext";

export default function JoinTournament() {
  const { userData, setUserData } = useContext(userContext);
  const [tournamentData, setTournamentData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:8080/global/action/getPublicTournamentList", {
      headers: {
        Authorization: "Bearer " + userData.token,
      },
    })
      .then((res) => {
        console.log(res.data);
        setTournamentData(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  const JoinTournament = (index) => {
    Axios.post(
      "http://localhost:8080/global/action/joinTournament/" +
        tournamentData[index].id +
        "/" +
        userData.user.id,
      null,
      {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          setTimeout(() => {
            history.push("/Home");
            setTimeout(() => {
              history.push("/MyTournaments");
              setTimeout(() => {
                history.push("/Home");
                setTimeout(() => {
                  history.push("/MyTournaments");
                }, 100);
              }, 100);
            }, 50);
          }, 50);
        }, 50);
      })
      .then((err) => {
        console.log(err);
      });
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
        {tournamentData.map((data, indexValue) => (
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
              {data.tournamentName}
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
                  JoinTournament(e, indexValue);
                }}>
                Join This Tournament
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Redirect to="/MyTournaments" />
  );
}
