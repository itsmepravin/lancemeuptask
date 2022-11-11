import styles from "./Register.module.scss";
import MyPasswordInput from "../components/MyPasswordInput";

import { useState, useContext } from "react";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";

import axios from "axios";

const Register = ({ countryData }) => {
  const context = useContext(AppContext);
  const router = useRouter();

  const [checked, setChecked] = useState(false);

  const { setCurrentUser } = context.currentUserInfo;

  const {
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
  } = context.registerInfo;

  const {
    registerPasswordErrMsg,
    setRegisterPasswordErrMsg,
    registerPasswordConErrMsg,
    setRegisterPasswordConErrMsg,
    registerEmailErrMsg,
    setRegisterEmailErrMsg,
    registerNameErrMsg,
    setRegisterNameErrMsg,
  } = context.errorInfo;

  const nameRegex = registerName.match(/^[A-Za-z\s]*$/);

  const emailRegex = registerEmail.match(/^\S+@\S+\.\S+$/);

  const passwordRegex = registerPassword.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );

  const passwordConRegex = registerPasswordCon.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );

  const handleRegisterNameChange = (e) => {
    setRegisterName(e.target.value);
    if (!nameRegex) {
      setRegisterNameErrMsg("Name can only consists letters and spaces!");
    } else {
      setRegisterNameErrMsg("");
    }
  };

  const handleRegisterEmailChange = (e) => {
    setRegisterEmail(e.target.value);
    if (!emailRegex) {
      setRegisterEmailErrMsg("Please enter a valid email address.");
    } else {
      setRegisterEmailErrMsg("");
    }
  };

  const handleRegisterPasswordChange = (e) => {
    setRegisterPassword(e.target.value);
    if (!passwordRegex) {
      setRegisterPasswordErrMsg(
        "passwords must be longer than 8 characters, contain capital letter and numbers, e.g. Sample123!!!"
      );
    } else {
      setRegisterPasswordErrMsg("");
    }
  };

  const handleRegisterPasswordConChange = (e) => {
    setRegisterPasswordCon(e.target.value);
    if (!passwordConRegex) {
      setRegisterPasswordConErrMsg(
        "passwords must be longer than 8 characters, contain capital letter and numbers, e.g. Sample123!!!"
      );
    } else {
      setRegisterPasswordConErrMsg("");
    }
  };

  const handleUserRegistration = async () => {
    try {
      const res = await axios.post("/api/register", {
        registerName,
        registerCountry,
        registerEmail,
        registerPassword,
      });
      if (res.data.success && typeof window !== "undefined") {
        localStorage.setItem("currUser", JSON.stringify(res.data.user));
        setCurrentUser(JSON.parse(localStorage.getItem("currUser")));
        router.push("/products");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className={`border rounded ${styles.registerContainer}`}>
      <div className={`${styles.registerContentContainer}`}>
        <p className="h3 text-danger">Register</p>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Full Name *
          </label>

          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Your Name here"
            value={registerName}
            onChange={handleRegisterNameChange}
          />
          {registerNameErrMsg !== "" ? (
            <span className="mx-1 text-danger">
              &#10005; {registerNameErrMsg}
            </span>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            className="form-select"
            value={registerCountry}
            onChange={(e) => setRegisterCountry(e.target.value)}
          >
            {countryData?.map((country) => (
              <option value={country?.name?.common}>
                <img
                  className="mb-1 mr-3"
                  src={countryData[0]?.flags?.png}
                  width={12}
                  height={12}
                />{" "}
                <span>{country?.name?.common}</span>
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label for="registerEmail" className="form-label">
            Email *
          </label>
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            placeholder="Your Email here"
            value={registerEmail}
            onChange={handleRegisterEmailChange}
          />
          {registerEmailErrMsg !== "" ? (
            <span className="mx-1 text-danger">
              &#10005; {registerEmailErrMsg}
            </span>
          ) : null}
        </div>
        <MyPasswordInput
          label="Password *"
          placeholder="Your Password here"
          id="registerPassword"
          value={registerPassword}
          handlePasswordChange={handleRegisterPasswordChange}
          errorMsg={registerPasswordErrMsg}
        />
        <MyPasswordInput
          label="Confirm Password *"
          placeholder="Retype Password here"
          id="registerConPassword"
          value={registerPasswordCon}
          handlePasswordChange={handleRegisterPasswordConChange}
          errorMsg={registerPasswordConErrMsg}
        />
        <div className="mb-3">
          <label htmlFor="referral" className="form-label">
            Referral Code
          </label>
          <input
            type="text"
            className="form-control"
            id="referral"
            placeholder="Referral code here"
          />
        </div>

        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="dropdownCheck"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <label className="form-check-label" for="dropdownCheck">
              I agree to all the{" "}
              <span className="text-danger text-decoration-underline">
                Terms and Conditions
              </span>{" "}
              of Aanbhi
            </label>
          </div>
        </div>

        <div className="d-grid gap-2">
          <button
            className="btn btn-danger text-white"
            type="button"
            disabled={
              !nameRegex ||
              !emailRegex ||
              !passwordRegex ||
              !passwordConRegex ||
              !checked
            }
            onClick={handleUserRegistration}
          >
            Register
          </button>
        </div>
        <p className="text-muted h6 mt-3">Already have an account?</p>
        <div className="d-grid gap-2">
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags"
  );
  const countryData = await response.json();

  return {
    props: {
      countryData,
    },
  };
}

export default Register;
