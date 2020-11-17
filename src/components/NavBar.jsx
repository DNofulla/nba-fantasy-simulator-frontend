import React, { useContext } from "react";
import "../styles/NavBar.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Avatar,
  Box,
  Image,
  Button,
  useDisclosure,
  Input,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
} from "@chakra-ui/core";
import userContext from "../services/userContext";
import Chat from "./Chat";
import FriendsList from "./FriendsList";

export default function NavBar() {
  const { userData, setUserData } = useContext(userContext);
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
        <ul className="NavBar-ul">
          <li className="NavBar-li">
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
            <div ref={btnRef} onClick={onOpen} style={{ marginTop: "20px" }}>
              <div className="menuIcon"></div>
              <div className="menuIcon"></div>
              <div className="menuIcon"></div>
            </div>
            <Drawer
              size="sm"
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton
                  background="red"
                  mt="5px"
                  _hover={{ background: "red", color: "white" }}
                />
                <DrawerHeader style={{ color: "white", background: "#16697a" }}>
                  My Friends
                </DrawerHeader>

                <DrawerBody bg="#82c0cc">
                  <div className="incomingFriendRequests">
                    Incoming Friend Requests
                  </div>
                  <div className="friendRequestSection">
                    <div className="friendTabInfo">
                      <div className="friendTabAvatar">
                        <Avatar src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg" />
                      </div>
                      <div className="friendTabName">Daniel Nofulla</div>
                      <div className="friendTabButtons">
                        <div>
                          <Button ml="5px" float="left" size="xs">
                            Accept
                          </Button>
                        </div>
                        <div>
                          <Button ml="10px" float="left" size="xs">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="friendTabInfo">
                      <div className="friendTabAvatar">
                        <Avatar src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg" />
                      </div>
                      <div className="friendTabName">Daniel Nofulla</div>
                      <div className="friendTabButtons">
                        <div>
                          <Button ml="5px" float="left" size="xs">
                            Accept
                          </Button>
                        </div>
                        <div>
                          <Button ml="10px" float="left" size="xs">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="friendTabInfo">
                      <div className="friendTabAvatar">
                        <Avatar src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg" />
                      </div>
                      <div className="friendTabName">Daniel Nofulla</div>
                      <div className="friendTabButtons">
                        <div>
                          <Button ml="5px" float="left" size="xs">
                            Accept
                          </Button>
                        </div>
                        <div>
                          <Button ml="10px" float="left" size="xs">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="friendTabInfo">
                      <div className="friendTabAvatar">
                        <Avatar src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg" />
                      </div>
                      <div className="friendTabName">Daniel Nofulla</div>
                      <div className="friendTabButtons">
                        <div>
                          <Button ml="5px" float="left" size="xs">
                            Accept
                          </Button>
                        </div>
                        <div>
                          <Button ml="10px" float="left" size="xs">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="friendTabInfo">
                      <div className="friendTabAvatar">
                        <Avatar src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg" />
                      </div>
                      <div className="friendTabName">Daniel Nofulla</div>
                      <div className="friendTabButtons">
                        <div>
                          <Button ml="5px" float="left" size="xs">
                            Accept
                          </Button>
                        </div>
                        <div>
                          <Button ml="10px" float="left" size="xs">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="friendTabInfo">
                      <div className="friendTabAvatar">
                        <Avatar src="https://cdn.discordapp.com/attachments/747957440733249656/776683703317299240/72948731.jpg" />
                      </div>
                      <div className="friendTabName">Daniel Nofulla</div>
                      <div className="friendTabButtons">
                        <div>
                          <Button ml="5px" float="left" size="xs">
                            Accept
                          </Button>
                        </div>
                        <div>
                          <Button ml="10px" float="left" size="xs">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="currentFriends">Friends List</div>
                  <div className="currentFriendsSection">
                    <FriendsList />
                  </div>
                </DrawerBody>

                <DrawerFooter bg="#16697a"></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </li>
          <li className="NavBar-li">
            <Link onClick={logout} className="h2tagNav">
              Log Out
            </Link>
          </li>

          <li className="NavBar-li">
            <Link className="h2tagNav" onClick={profile}>
              My Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
