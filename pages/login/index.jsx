import styles from "./Login.module.scss";
import MyPasswordInput from "../components/MyPasswordInput";
import MyAlert from "../components/MyAlert";

import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { useRouter } from "next/router";

import axios from "axios";

const Login = () => {
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const context = useContext(AppContext);
  const router = useRouter();

  const { loginEmail, setLoginEmail, loginPassword, setLoginPassword } =
    context.loginInfo;

  const {
    loginEmailErrMsg,
    setLoginEmailErrMsg,
    loginPasswordErrMsg,
    setLoginPasswordErrMsg,
  } = context.errorInfo;

  const { setCurrentUser } = context.currentUserInfo;

  const loginEmailRegex = loginEmail.match(/^\S+@\S+\.\S+$/);
  const passwordRegex = loginPassword.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/login", { loginEmail, loginPassword });
      if (res.data.success && typeof window !== "undefined") {
        setLoginEmail("");
        setLoginPassword("");
        localStorage.setItem("currUser", JSON.stringify(res.data.user));
        setCurrentUser(JSON.parse(localStorage.getItem("currUser")));
        if (res.data.user.role === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/products");
        }
      }
    } catch (error) {
      console.log(error.response.data);
      setLoginErrorMsg(error.response.data.message);
      setTimeout(() => setLoginErrorMsg(""), 3000);
    }
  };

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
    if (!loginEmailRegex) {
      setLoginEmailErrMsg("Please enter a valid email address.");
    } else {
      setLoginEmailErrMsg("");
    }
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
    if (!passwordRegex) {
      setLoginPasswordErrMsg(
        "passwords must be longer than 8 characters, contain capital letter and numbers, e.g. Sample123!!!"
      );
    } else {
      setLoginPasswordErrMsg("");
    }
  };

  const handleNormalLogin = () => {
    setLoginEmail("sampleuser@gmail.com");
    setLoginPassword("Samplepassword123!!!");
  };

  const handleAdminLogin = () => {
    setLoginEmail("admin@gmail.com");
    setLoginPassword("Admin123!!!");
  };

  return (
    <div className={`border rounded ${styles.loginContainer}`}>
      <div className={`${styles.loginContentContainer}`}>
        {loginErrorMsg !== "" ? (
          <MyAlert alertMsg={loginErrorMsg} condition="danger" />
        ) : null}
        <p className="h3 text-danger">Login</p>
        <div className="d-flex justify-content-center gap-3 my-2">
          <button
            className="rounded btn btn-success w-100 h-100 p-2"
            onClick={handleNormalLogin}
          >
            Try Sample User
          </button>
          <button
            className="rounded btn btn-danger w-100 h-100 p-2"
            onClick={handleAdminLogin}
          >
            Try Admin User
          </button>
        </div>
        <div className="mb-2">
          <label htmlFor="loginEmail" className="form-label">
            Email *
          </label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            placeholder="Your Email here"
            value={loginEmail}
            onChange={handleLoginEmailChange}
          />
          {loginEmailErrMsg !== "" ? (
            <span className="mx-1 text-danger">
              &#10005; {loginEmailErrMsg}
            </span>
          ) : null}
        </div>
        <MyPasswordInput
          label="Password *"
          placeholder="Your Password here"
          id="loginPassword"
          value={loginPassword}
          handlePasswordChange={handleLoginPasswordChange}
          errorMsg={loginPasswordErrMsg}
        />
        <p className="text-muted h6">Forgot Password?</p>
        <div className="d-grid gap-2">
          <button
            className="btn btn-danger text-white"
            type="button"
            onClick={handleLogin}
            disabled={!loginEmailRegex || !passwordRegex}
          >
            Login
          </button>
        </div>
        <p className="text-muted h6 mt-3">Don't have an account?</p>
        <div className="d-grid gap-2">
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
