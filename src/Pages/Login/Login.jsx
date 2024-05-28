import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../Services/allAPI";
import "./login.css";
import { Col, Row } from "react-bootstrap";
import LoginImageRight from "../Assets/Saly-14loginRightImage.png";
import facebook from "../Assets/Facebook.png";
import google from "../Assets/google.png";
import apple from "../Assets/apple.png";
import { useGoogleLogin } from "@react-oauth/google";

function Login() {

  
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = userData;
    if (!email || !password) {
      alert("Please Enter the Feilds");
    } else {
      const result = await loginAPI(userData);
      if (result.status == 200) {
        alert("Login Successfull");
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", JSON.stringify(result.data.token));
        setUserData({
          email: "",
          password: "",
        });
        navigate("/dashboard");
      } else {
        console.log(result);
        alert("Invalid Credentials, Please Try Again");
      }
    }
  };

  return (
    <>
      <div className="brandNav">
        <p id="navLogo">Your Logo</p>
      </div>
      <Row>
        <Col className="w-100">
          <div id="loginBox">
            <h1 id="loginh1">Sign in to</h1>
            <h3 id="h3Left">Lorem Ipsum is simply</h3>
            <p id="p1left" className="mt-5">
              If you don't have an account
            </p>
            <p id="p2left">
              You can{" "}
              <Link to="/register" id="loginRegisterLink">
                Register Here !
              </Link>
            </p>
            <span id="loginImage">
              <img src={LoginImageRight} id="loginImg" alt="login Image" />
            </span>
          </div>
        </Col>
        <Col>
          <div id="signIn">
            <h3 id="headingRight"> Sign In</h3>
            <input
              type="text"
              placeholder="Enter Email"
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <p id="forgotPassword">Forgot Password?</p>
            <button id="loginButton" onClick={handleLogin}>
              Login
            </button>
            <p id="paraRight">or continue with</p>
            <div id="loginCompanies">
              <div>
                <img
                  className="loginCompanyLogos"
                  src={facebook}
                  alt="facebook"
                />
              </div>
              <div>
                <img className="loginCompanyLogos" src={apple} alt="apple" />
              </div>
              <div className="">
                <img
                  className="loginCompanyLogos "
                  onClick={login}
                  src={google}
                  alt="google"
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Login;
