import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { ThemeProvider } from "@chakra-ui/core";

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
