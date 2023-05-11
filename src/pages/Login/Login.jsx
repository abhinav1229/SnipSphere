import React, { useState } from "react";
import "./Login.css";
import { NavLink, useActionData, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../helper/ref";

function Login({ setReloadNavbar }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`${BASE_URL}/user/login`, {
        userEmail: email,
        userPassword: password,
      });
      if (result.data.length) {
        delete result.data[0].userPassword;
        localStorage.setItem(
          "userInfoSnipSphere",
          JSON.stringify(result.data[0])
        );
        setReloadNavbar(true);
        navigate("/");
      } else {
        alert("Email or password is wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Login FormContainer">
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name=""
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name=""
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <button type="submit">Login</button>
          <br />
          <NavLink to={"/signup"}>
            <button type="submit" className="loginButton">
              SignUp
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
