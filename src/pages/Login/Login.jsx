import React from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div className="Login FormContainer">
      <form>
        <div className="formGroup">
          <label htmlFor="">Email</label>
          <input type="text" name="" required />
        </div>
        <div className="formGroup">
          <label htmlFor="">Password</label>
          <input type="password" name="" required />
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
