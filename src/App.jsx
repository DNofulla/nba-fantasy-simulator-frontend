import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyTournaments from "./pages/MyTournaments";
import ProfilePage from "./pages/ProfilePage";
import TournamentDetails from "./pages/TournamentDetails";
import LoginRegister from "./components/LoginRegister";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import userContext from "./services/userContext";
import JoinTournament from "./pages/JoinTournament";
import friendListContext from "./services/friendListContext";
import friendRequestContext from "./services/friendRequestContext";
import teamContext from "./services/teamContext";
import tournamentContext from "./services/tournamentContext";
import tournamentRequestContext from "./services/tournamentRequestContext";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [friendData, setFriendData] = useState([]);
  const [friendRequestData, setFriendRequestData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [tournamentData, setTournamentData] = useState([]);
  const [tournamentRequestData, setTournamentRequestData] = useState([]);

  return (
    <div className="App">
      <Router>
        <userContext.Provider value={{ userData, setUserData }}>
          <friendListContext.Provider value={{ friendData, setFriendData }}>
            <friendRequestContext.Provider
              value={{ friendRequestData, setFriendRequestData }}>
              <teamContext.Provider value={{ teamData, setTeamData }}>
                <tournamentContext.Provider
                  value={{ tournamentData, setTournamentData }}>
                  <tournamentRequestContext.Provider
                    value={{ tournamentRequestData, setTournamentRequestData }}>
                    <NavBar />
                    <Switch>
                      <Route path="/" exact component={LoginRegister} />
                      <Route path="/Home" exact component={HomePage} />
                      <Route
                        path="/MyTournaments"
                        exact
                        component={MyTournaments}
                      />
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
                  </tournamentRequestContext.Provider>
                </tournamentContext.Provider>
              </teamContext.Provider>
            </friendRequestContext.Provider>
          </friendListContext.Provider>
        </userContext.Provider>
      </Router>
    </div>
  );
}
