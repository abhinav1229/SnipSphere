import React, { useState } from "react";
import "../Login/Login.css";
import { NavLink, useActionData, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../helper/ref";
import ReactLoading from "react-loading";

function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(true);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [sendOtp, setSendOtp] = useState("");
  const [typedOtp, setTypedOtp] = useState("");

  const [otpSend, setOtpSend] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (reset) {
        if (otpSend) {
          if (sendOtp === parseInt(typedOtp)) {
            setReset(false);
            setLoading(false);
            setPassword("");
          } else {
            alert("Wrong OTP");
            setLoading(false);
          }
        } else {
          const result = await axios.get(`${BASE_URL}/user/userInfo`, {
            userEmail: email,
          });
          if (result.data.length) {
            const otpResult = await axios.post(`${BASE_URL}/forgot/otp`, {
              userEmail: email,
            });
            setLoading(false);
            setOtpSend(true);
            setSendOtp(otpResult.data);
          } else {
            setLoading(false);
            alert("This email is not registered.");
          }
        }
      } else {
        if (password === confirmPassword) {
          const result = await axios.post(`${BASE_URL}/forgot/resetPassword`, {
            userEmail: email,
            userPassword: password,
          });
          if (result.data === "OK") {
            setLoading(false);
            navigate("/login");
          } else {
            alert("Something went wrong! Please try again.");
            setLoading(false);
          }
        } else {
          alert("Password is not matched");
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="Login FormContainer">
      {loading ? (
        <ReactLoading type={"spin"} color={"grey"} height={50} width={50} />
      ) : (
        <form onSubmit={handleSubmit}>
          {reset ? (
            otpSend ? (
              <>
                <div className="formGroup">
                  <label htmlFor="">OTP</label>
                  <input
                    type="text"
                    name=""
                    required
                    onChange={(e) => setTypedOtp(e.target.value)}
                  />
                </div>

                <div className="formGroup">
                  <button type="submit">Verify</button>
                </div>
              </>
            ) : (
              <>
                <div className="formGroup">
                  <label htmlFor="">Email for OTP</label>
                  <input
                    type="email"
                    name=""
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="formGroup">
                  <button type="submit">Request OTP</button>
                </div>
              </>
            )
          ) : (
            <>
              <div className="formGroup">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name=""
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="">Confirm Password</label>
                <input
                  type="password"
                  name=""
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="formGroup">
                <button type="submit">Reset Password</button>
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
}

export default Forgot;
