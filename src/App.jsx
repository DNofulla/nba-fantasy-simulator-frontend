import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyTournaments from "./pages/MyTournaments";
import ProfilePage from "./pages/ProfilePage";
import TournamentDetails from "./pages/TournamentDetails";
import LoginRegister from "./components/LoginRegister";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import Axios from "axios";
import NavBar from "./components/NavBar";
import userContext from "./services/userContext";
import JoinTournament from "./pages/JoinTournament";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const validateJWT = async () => {
      let jwtToken = localStorage.getItem("auth-token");
      if (jwtToken === null) {
        jwtToken = "";
        localStorage.setItem("auth-token", "");
      }

      const res = await Axios.post("http://localhost:8080/validToken", null, {
        headers: {
          "x-auth-token": jwtToken,
        },
      });
      if (res.data) {
        const response = await Axios.get("http://localhost:8080/user", {
          headers: {
            "x-auth-token": jwtToken,
          },
        });
        setUserData({
          jwtToken,
          user: response.data,
        });
      }
    };
    validateJWT();
  }, []);

  return (
    <div className="App">
      <Router>
        <userContext.Provider value={{ userData, setUserData }}>
          <NavBar />
          <Switch>
            <Route path="/" exact component={LoginRegister} />
            <Route path="/Home" exact component={HomePage} />
            <Route path="/MyTournaments" exact component={MyTournaments} />
            <Route path="/Profile" exact component={ProfilePage} />
            <Route
              path="/TournamentDetails/:tourid"
              exact
              render={(props) => (
                <TournamentDetails
                  {...props}
                  tourIdProp={props.match.params.tourid}
                />
              )}
            />
            <Route
              path="/MyTournaments/JoinTournament"
              exact
              component={JoinTournament}
            />
          </Switch>
        </userContext.Provider>
      </Router>
    </div>
  );
}
