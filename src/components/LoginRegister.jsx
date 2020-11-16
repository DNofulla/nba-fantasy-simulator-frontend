import React, { useContext, useEffect, useState } from "react";
import "../styles/LoginRegister.css";
import {
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  FormControl,
  FormLabel,
  Input,
  Button,
  Tooltip,
  useToast,
} from "@chakra-ui/core";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import userContext from "../services/userContext";

export default function LoginRegister(props) {
  const toast = useToast();
  const history = useHistory();
  const { setUserData } = useContext(userContext);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [error1, setError1] = useState();
  const [error2, setError2] = useState();
  const [error3, setError3] = useState();
  const [error4, setError4] = useState();
  const [check, setCheck] = useState(false);

  const loginAuthAttempt = async (e) => {
    e.preventDefault();

    try {
      const userLoginInfo = {
        email: loginEmail,
        password: loginPassword,
      };

      console.log(userLoginInfo);

      const res = await Axios.post("http://localhost:8080/login/signin", null, {
        params: userLoginInfo,
      });

      console.log(res.data);

      if (res.status === 200 && !res.data.error) {
        toast({
          title: "Logged In!",
          description: "Authentication Successful!",
          status: "success",
          duration: 2000,
          isClosable: false,
        });
        setUserData({
          token: res.data.JWTToken,
          user: res.data.user,
        });
        localStorage.setItem("auth-token", res.data.JWTToken);
        history.push("/Home");
      } else {
        toast({
          title: "Invalid Credentials!",
          description: res.data.error,
          status: "error",
          duration: 2000,
          isClosable: false,
        });
        setLoginEmail("");
        setLoginPassword("");
      }

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const registerAuthAttempt = async (e) => {
    e.preventDefault();

    try {
      if (registerPassword !== registerConfirmPassword) {
        setError1("Your Passwords don't match!\n");
        setCheck(false);
      } else {
        setError1(null);
        setCheck(true);
      }

      if (registerPassword.length < 6) {
        setError2("Your Password must be at least 6 characters long!\n");
        setCheck(false);
      } else {
        setError2(null);
        setCheck(true);
      }

      if (!registerEmail.includes("@")) {
        setError3("Invalid Email!\n");
        setCheck(false);
      } else {
        setError3(null);
        setCheck(true);
      }

      if (
        registerEmail === "" ||
        registerFirstName === "" ||
        registerLastName === "" ||
        registerUsername === "" ||
        registerConfirmPassword === "" ||
        registerPassword === ""
      ) {
        setError4("Cannot have blank fields!\n");
        setCheck(false);
      } else {
        setError4(null);
        setCheck(true);
      }

      if (check === true && !error1 && !error2 && !error3 && !error4) {
        console.log(registerEmail);
        console.log(registerUsername);
        console.log(registerPassword);
        console.log(registerConfirmPassword);

        const response = await Axios.post(
          "http://localhost:8080/login/signup",
          {
            password: registerPassword,
            username: registerUsername,
            email: registerEmail,
            firstName: registerFirstName,
            lastName: registerLastName,
          }
        );

        if (response.status === 200 && !response.data.error) {
          setError1(null);
          setError2(null);
          setError3(null);
          setError4(null);
          setRegisterEmail("");
          setRegisterPassword("");
          setRegisterConfirmPassword("");
          setRegisterFirstName("");
          setRegisterLastName("");
          setRegisterUsername("");

          toast({
            title: "Registered!",
            description: "Account Created",
            status: "success",
            duration: 2000,
            isClosable: false,
          });
          setCheck(false);
        } else {
          toast({
            title: "Failure!",
            description: response.data.error,
            status: "error",
            duration: 2000,
            isClosable: false,
          });
          setCheck(false);
        }
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="LoginRegister">
      <h2 style={{ margin: 0, paddingBottom: "10px", fontSize: "30px" }}>
        NBA Penguin
      </h2>
      <div>
        <Tabs isFitted variant="enclosed">
          <TabList height="50px">
            <Tab
              mt="-1px"
              bg="#16697a"
              id="loginID"
              style={{
                color: "white",
                border: "none",
                boxShadow: "none",
                outline: "none",
                borderRadius: "20px 20px 0 0",
              }}>
              Login
            </Tab>
            <Tab
              mt="-1px"
              bg="#103451"
              style={{
                color: "white",
                border: "none",
                boxShadow: "none",
                outline: "none",
                borderRadius: "20px 20px 0 0",
              }}>
              Register
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel
              height="450px"
              bg="#16697a"
              style={{
                bg: "#ede7e3",
                border: "none",
                boxShadow: "none",
                outline: "none",
                borderRadius: "0 0 25px 25px",
              }}>
              <div className="loginTab">
                <FormControl>
                  <div>
                    <FormLabel
                      isRequired
                      color="white"
                      mt="70px"
                      pl="0"
                      pr="0"
                      textAlign="center"
                      htmlFor="loginUserEmail">
                      Email Address:
                    </FormLabel>
                    <Input
                      m="auto"
                      width="430px"
                      id="loginUserEmail"
                      placeholder="Email Address"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <FormLabel
                      isRequired
                      color="white"
                      mt="20px"
                      pl="0"
                      pr="0"
                      textAlign="center"
                      htmlFor="loginUserPassword">
                      Password:
                    </FormLabel>
                    <Input
                      m="auto"
                      width="430px"
                      id="loginUserPassword"
                      placeholder="Password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                </FormControl>
                <FormControl>
                  <Button
                    _hover=""
                    bg="#489fb5"
                    color="white"
                    variant="solid"
                    w="40%"
                    mt="30px"
                    mr="5%"
                    style={{
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      cursor: "pointer",
                    }}>
                    Forgot Password
                  </Button>
                  <Button
                    rightIcon="arrow-forward"
                    variantColor="green"
                    variant="solid"
                    w="40%"
                    mt="30px"
                    type="submit"
                    style={{
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      cursor: "pointer",
                    }}
                    onClick={loginAuthAttempt}>
                    Log In
                  </Button>
                </FormControl>
              </div>
            </TabPanel>
            <TabPanel
              height="450px"
              bg="#103451"
              style={{
                color: "white",
                border: "none",
                boxShadow: "none",
                outline: "none",
                borderRadius: "0 0 25px 25px",
              }}>
              <div className="registerTab">
                <FormControl isRequired>
                  <div
                    style={{
                      textAlign: "center",
                      float: "left",
                      width: "50%",
                    }}>
                    <FormLabel
                      mt="20px"
                      pl="0"
                      pr="0"
                      textAlign="center"
                      htmlFor="fname">
                      First Name:
                    </FormLabel>
                    <Input
                      m="auto"
                      width="180px"
                      id="fname"
                      placeholder="First Name"
                      value={registerFirstName}
                      onChange={(e) => setRegisterFirstName(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      float: "left",
                      width: "50%",
                    }}>
                    <FormLabel
                      mt="20px"
                      pl="0"
                      pr="0"
                      textAlign="center"
                      htmlFor="lname">
                      Last Name:
                    </FormLabel>
                    <Input
                      m="auto"
                      width="180px"
                      id="lname"
                      placeholder="Last Name"
                      value={registerLastName}
                      onChange={(e) => setRegisterLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <FormLabel
                      mt="20px"
                      pl="0"
                      pr="0"
                      textAlign="center"
                      htmlFor="username">
                      Username:
                    </FormLabel>
                    <Input
                      m="auto"
                      width="430px"
                      id="username"
                      placeholder="Username"
                      value={registerUsername}
                      onChange={(e) => setRegisterUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <FormLabel
                      mt="20px"
                      pl="0"
                      pr="0"
                      textAlign="center"
                      htmlFor="userEmail">
                      Email Address:
                    </FormLabel>
                    <Input
                      m="auto"
                      width="430px"
                      id="userEmail"
                      placeholder="Email Address"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      float: "left",
                      width: "50%",
                    }}>
                    <FormLabel
                      mt="20px"
                      pl="0"
                      pr="0"
                      textAlign="center"
                      htmlFor="userPass">
                      Password:
                    </FormLabel>
                    <Input
                      m="auto"
                      width="180px"
                      id="userPass"
                      placeholder="Password"
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      float: "left",
                      width: "50%",
                    }}>
                    <FormLabel
                      mt="20px"
                      pl="0"
                      pr="0"
                      textAlign="center"
                      htmlFor="conUserPass">
                      Confirm Password:
                    </FormLabel>
                    <Input
                      m="auto"
                      width="180px"
                      id="conUserPass"
                      placeholder="Confirm Password"
                      type="password"
                      value={registerConfirmPassword}
                      onChange={(e) =>
                        setRegisterConfirmPassword(e.target.value)
                      }
                    />
                  </div>

                  <Tooltip
                    label="Create Account"
                    backgroundColor="green.500"
                    placement="bottom">
                    <Button
                      rightIcon="check"
                      variantColor="green"
                      variant="solid"
                      w="40%"
                      mt="25px"
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        cursor: "pointer",
                      }}
                      onClick={registerAuthAttempt}>
                      Register
                    </Button>
                  </Tooltip>
                </FormControl>
              </div>
              {error1 || error2 || error3 || error4 ? (
                <div
                  style={{
                    marginTop: "70px",
                    color: "red",
                    backgroundColor: "white",
                    borderRadius: "15px",
                  }}>
                  <div>{error1 ? error1 : null}</div>
                  <div>{error2 ? error2 : null}</div>
                  <div>{error3 ? error3 : null}</div>
                  <div>{error4 ? error4 : null}</div>
                </div>
              ) : null}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
