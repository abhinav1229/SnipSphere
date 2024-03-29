import React, { useState } from "react";
import "./Signup.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { func } from "prop-types";
import { BASE_URL } from "../../helper/ref.js";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [gitHub, setGitHub] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // instance for navigate
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (password === confirmPassword) {
      let validUser = await axios.get(`${BASE_URL}/user/checkuseremail`, {
        params: {
          userEmail,
        },
      });

      if (!validUser.data.length) {
        let response = await axios.post(`${BASE_URL}/user/signup`, {
          fullName,
          userEmail,
          gitHub,
          userPassword: password,
        });

        if (response.status === 200) {
          setLoading(false);
          navigate("/login");
        } else {
          setLoading(false);
          alert("Something is wrong! Please Try again");
        }
      } else {
        setLoading(false);
        alert("This Email is already exist");
      }
    } else {
      setLoading(false);
      alert("Confirm Password is not Matched");
    }
  }

  return (
    <div className="Login FormContainer">
      {loading ? (
        <ReactLoading type={"spin"} color={"grey"} height={50} width={50} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              name=""
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name=""
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="">GitHub Username</label>
            <input
              type="text"
              name=""
              required
              value={gitHub}
              onChange={(e) => setGitHub(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name=""
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              name=""
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <button type="submit">SignUp</button>
            <br />
            <NavLink to={"/login"}>
              <button type="submit" className="loginButton">
                Login
              </button>
            </NavLink>
          </div>
        </form>
      )}
    </div>
  );
}

export default Signup;
