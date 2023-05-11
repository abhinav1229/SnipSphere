import React from "react";
import "./Signup.css";
import { NavLink } from "react-router-dom";

function Signup() {
  return (
    <div className="Login FormContainer">
      <form>
        <div className="formGroup">
          <label htmlFor="">Email</label>
          <input type="text" name="" required />
        </div>
        <div className="formGroup">
          <label htmlFor="">GitHub Username</label>
          <input type="password" name="" required />
        </div>
        <div className="formGroup">
          <label htmlFor="">Password</label>
          <input type="password" name="" required />
        </div>
        <div className="formGroup">
          <label htmlFor="">Confirm Password</label>
          <input type="password" name="" required />
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
    </div>
  );
}

export default Signup;
