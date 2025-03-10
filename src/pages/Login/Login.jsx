import React, { useState, useEffect } from "react";
import "./Login.css";
import { NavLink, useActionData, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../helper/ref";
import ReactLoading from "react-loading";
import { googleLogout, useGoogleLogin, GoogleLogin } from "@react-oauth/google";

function Login({ setReloadNavbar }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("-1");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
        alert("Email or password is wrong!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile({});
  };

  useEffect(() => {
    if (Object.keys(user).length) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          console.log(res.data);
          axios
            .post(`${BASE_URL}/user/signup`, {
              fullName: res.data.fullName,
              userEmail: res.data.email,
              gitHub: "-1",
              userPassword: "-1",
            })
            .then((res) => {
              console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="Login FormContainer">
      {loading ? (
        <ReactLoading type={"spin"} color={"grey"} height={50} width={50} />
      ) : (
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
            <NavLink
              to={"/forgot"}
              style={{ color: "grey", textDecoration: "none" }}
            >
              Forgot Password?
            </NavLink>
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
          <div className="formGroup">
            {Object.keys(profile).length ? (
              <div>
                <img src={profile.picture} alt="user image" />
                <h3>User Logged in</h3>
                <p>Name: {profile.name}</p>
                <p>Email Address: {profile.email}</p>
                <br />
                <br />
                <button onClick={logOut}>Log out</button>
              </div>
            ) : (
              <div className="googleSigninButton" onClick={() => login()}>
                Sign in with Google 🚀
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
