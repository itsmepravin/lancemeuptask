import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";

import type { AppProps } from "next/app";
import { TypeCurrentUser } from "../context/AppContext";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { useState, useEffect } from "react";

import AppContext from "../context/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmailErrMsg, setLoginEmailErrMsg] = useState("");
  const [loginPasswordErrMsg, setLoginPasswordErrMsg] = useState("");
  const [currentUser, setCurrentUser] = useState<TypeCurrentUser>(null!);
  const [currentUserCart, setCurrentUserCart] = useState([]);
  const [registerName, setRegisterName] = useState("");
  const [registerNameErrMsg, setRegisterNameErrMsg] = useState("");
  const [registerCountry, setRegisterCountry] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerEmailErrMsg, setRegisterEmailErrMsg] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordCon, setRegisterPasswordCon] = useState("");
  const [registerPasswordErrMsg, setRegisterPasswordErrMsg] = useState("");
  const [registerPasswordConErrMsg, setRegisterPasswordConErrMsg] =
    useState("");

  const state = {
    registerInfo: {
      registerName,
      setRegisterName,
      registerCountry,
      setRegisterCountry,
      registerEmail,
      setRegisterEmail,
      registerPassword,
      setRegisterPassword,
      registerPasswordCon,
      setRegisterPasswordCon,
    },
    loginInfo: {
      loginEmail,
      setLoginEmail,
      loginPassword,
      setLoginPassword,
    },
    errorInfo: {
      registerNameErrMsg,
      setRegisterNameErrMsg,
      loginEmailErrMsg,
      setLoginEmailErrMsg,
      loginPasswordErrMsg,
      setLoginPasswordErrMsg,
      registerEmailErrMsg,
      setRegisterEmailErrMsg,
      registerPasswordErrMsg,
      setRegisterPasswordErrMsg,
      registerPasswordConErrMsg,
      setRegisterPasswordConErrMsg,
    },
    currentUserInfo: {
      currentUser,
      setCurrentUser,
      currentUserCart,
      setCurrentUserCart,
    },
  };

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <AppContext.Provider value={state}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
