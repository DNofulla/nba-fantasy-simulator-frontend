import React, { useContext } from "react";
import "../styles/NavBar.css";
import MediaQuery from "react-responsive";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Box,
  Image,
} from "@chakra-ui/core";
import userContext from "../services/userContext";

export default function NavBar() {
  const { userData, setUserData } = useContext(userContext);
  const history = useHistory();

  const profile = () => {
    history.push("/Profile");
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return userData.user ? (
    <div className="NavBar">
      <nav className="NavBar-nav">
        <MediaQuery maxDeviceWidth={599}>
          <Accordion allowToggle>
            <AccordionItem defaultIsOpen="false">
              <AccordionHeader
                border="none"
                boxShadow="none !important"
                cursor="pointer"
                width="100%"
                padding="0"
                bg="transparent">
                <Box id="penguin-wrapper">
                  <img
                    src="https://media.discordapp.net/attachments/747875449937461333/752598704988487696/penguin_gang_logo.png"
                    alt="NBA PENGUIN"
                    id="expand-penguin"
                  />
                </Box>
              </AccordionHeader>

              <AccordionPanel id="penguin-panel">
                <ul className="NavBar-ul">
                  <li className="NavBar-li">
                    <Link className="h2tagNav" to={"/Home"}>
                      Home
                    </Link>
                  </li>
                  <li className="NavBar-li">
                    <Link className="h2tagNav" to={"/MyTournaments"}>
                      My Tournaments
                    </Link>
                  </li>
                  <li className="NavBar-li">
                    <Link className="h2tagNav" to={"/Profile"}>
                      My Profile
                    </Link>
                  </li>
                  <li className="NavBar-li">
                    <Link
                      className="h2tagNav"
                      id="menu-logout"
                      onClick={logout}>
                      Log Out
                    </Link>
                  </li>
                </ul>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </MediaQuery>
        <MediaQuery minDeviceWidth={600}>
          <ul className="NavBar-ul">
            <li id="nav-logo" className="NavBar-li">
              <Link to={"/Home"}>
                <Image
                  backgroundColor="white"
                  float="left"
                  mt="5px"
                  mb="5px"
                  mr="10px"
                  rounded="full"
                  size="55px"
                  src="https://media.discordapp.net/attachments/747875449937461333/752598704988487696/penguin_gang_logo.png"
                  alt="NBA PENGUIN"
                  border="1px solid #489fb5"
                />
                <p className="h2tagNavLogo">NBA Penguin</p>
              </Link>
            </li>
            <li className="NavBar-li">
              <Link to={"/MyTournaments"} className="h2tagNav">
                My Tournaments
              </Link>
            </li>

            <li className="NavBar-li">
              <Link className="h2tagNav" onClick={profile}>
                My Profile
              </Link>
            </li>
            <li className="NavBar-li">
              <Link onClick={logout} className="h2tagNav" id="menu-logout">
                Log Out
              </Link>
            </li>
          </ul>
        </MediaQuery>
      </nav>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
