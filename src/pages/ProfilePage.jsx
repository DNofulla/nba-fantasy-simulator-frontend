import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import FriendsDash from "../components/FriendsDash"
import "../styles/ProfilePage.css";
import {
  Image,
  Editable,
  EditablePreview,
  EditableInput,
  Button,
  ButtonGroup,
} from "@chakra-ui/core";

import { MdBuild } from "react-icons/md";
import userContext from "../services/userContext";

export default function ProfilePage(props) {
  const { userData } = useContext(userContext);

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
                <h2>
                  {userData.user.lastName}
                </h2>
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
                leftIcon="email"
                color="black"
                backgroundColor="#82c0cc"
                variantColor="white"
                variant="solid">
                Change Email
              </Button>
            </div>
            <div className="profile-button">
              <Button
                leftIcon={MdBuild}
                color="black"
                backgroundColor="#82c0cc"
                variantColor="white"
                variant="solid">
                Change Password
              </Button>
            </div>
            <div className="profile-button">
              <Button
                leftIcon={MdBuild}
                color="black"
                backgroundColor="#82c0cc"
                variantColor="white"
                variant="solid">
                Change Names
              </Button>
            </div>
          </div>
        </div>
      </div>
      <FriendsDash />
    </div>
  );
}
