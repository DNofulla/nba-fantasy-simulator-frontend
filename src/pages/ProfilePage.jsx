import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import FriendsDash from "../components/FriendsDash";
import "../styles/ProfilePage.css";
import {
  Image,
  Editable,
  EditablePreview,
  EditableInput,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";

import Axios from "axios";
import { MdBuild } from "react-icons/md";
import userContext from "../services/userContext";
import { useHistory } from "react-router";

export default function ProfilePage(props) {
  const { userData, setUserData } = useContext(userContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const [updateFirst, setUpdateFirst] = useState(userData.user.firstName);
  const [updateLast, setUpdateLast] = useState(userData.user.lastName);
  const [updateUserName, setUpdateUsername] = useState(userData.user.username);

  function updateProfile(userData) {
    Axios.post(
      "http://localhost:8080/userInfo/update/" + userData.user.id,
      {
        username: updateUserName,
        firstName: updateFirst,
        lastName: updateLast,
        team2Id: userData.user.team2Id,
        tournamentRequestIDs: userData.user.tournamentRequestIDs,
        friendRequestIDs: userData.user.friendRequestIDs,
        friendIDs: userData.user.friendIDs,
        announcementIDs: userData.user.announcementIDs,
        tournament2Id: userData.user.tournament2Id,
        team1Id: userData.user.team1Id,
        accountPoints: userData.user.accountPoints,
        email: userData.user.email,
        tournament1Id: userData.user.tournament1Id,
      },
      {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      }
    )
      .then((res) => {
        console.log(res);
        setUserData({
          token: userData.token,
          user: res.data,
        });
        history.push("/Profile");
      })
      .then((err) => console.log(err));
  }

  return (
    <div className="ProfilePage">
      <div className="ProfileDiv">
        <div className="ProfilePictureDiv">
          <Image
            size="200px"
            src="https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
            alt="Profile Picture"
          />
          <div className="InputFormProfile">
            <div className="user-info-row">
              <div className="user-field">
                <h2>Username:</h2>
              </div>
              <div className="user-value">
                <h2>{userData.user.username}</h2>
              </div>
            </div>
            <div className="user-info-row">
              <div className="user-field">
                <h2>First Name:</h2>
              </div>
              <div className="user-value">
                <h2>{userData.user.firstName}</h2>
              </div>
            </div>
            <div className="user-info-row">
              <div className="user-field">
                <h2>Last Name:</h2>
              </div>
              <div className="user-value">
                <h2>{userData.user.lastName}</h2>
              </div>
            </div>
            <div className="user-info-row">
              <div className="user-field">
                <h2>Email:</h2>
              </div>
              <div className="user-value">
                <h2>{userData.user.email}</h2>
              </div>
            </div>
          </div>
          <div className="ButtonsProfileDiv">
            <div className="profile-button">
              <Button
                leftIcon={MdBuild}
                color="black"
                backgroundColor="#82c0cc"
                variantColor="white"
                variant="solid"
                border="none"
                onClick={onOpen}>
                Edit Profile
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent id="edit-profile">
                  <ModalHeader>Edit Profile</ModalHeader>
                  <ModalCloseButton
                    backgroundColor="#f44"
                    color="white"
                    border="none"
                    _hover={{ backgroundColor: "f44" }}
                  />
                  <ModalBody>
                    <div className="edit-profile">
                      <h3>Edit username</h3>
                      <input
                        type="text"
                        placeholder={userData.user.username}
                        value={updateUserName}
                        onChange={(e) => setUpdateUsername(e.target.value)}
                      />
                    </div>
                    <div className="edit-profile">
                      <h3>Edit First Name</h3>
                      <input
                        type="text"
                        placeholder={userData.user.firstName}
                        value={updateFirst}
                        onChange={(e) => setUpdateFirst(e.target.value)}
                      />
                    </div>
                    <div className="edit-profile">
                      <h3>Edit Last Name</h3>
                      <input
                        type="text"
                        placeholder={userData.user.lastName}
                        value={updateLast}
                        onChange={(e) => setUpdateLast(e.target.value)}
                      />
                    </div>
                    {/* <div className="edit-profile">
                      <h3>Edit email</h3>
                      <input type="text" onChange={(e) => {updateEmail = e.target.value;}}/>
                    </div> */}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      mr={3}
                      onClick={(e) => {
                        updateProfile(userData);
                        onClose();
                      }}
                      backgroundColor="#82c0cc"
                      border="none">
                      Accept Changes
                    </Button>
                    <Button
                      mr={3}
                      onClick={onClose}
                      backgroundColor="#ffa62b"
                      border="none">
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <FriendsDash />
    </div>
  );
}
