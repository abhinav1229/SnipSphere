import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../helper/ref";
import { useParams } from "react-router";
import Snippet from "../../components/Snippet/Snippet";
import "../../components/SnippetList/SnippetList.css";
import "./Profile.css";
import { Link, NavLink } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [allSnippets, setAllSnippets] = useState([]);
  const [fullName, setFullName] = useState("");
  const [gitHub, setGitHub] = useState("");

  useEffect(() => {
    async function fetchSnippets() {
      let response = await axios.get(`${BASE_URL}/snippets/allofuser`, {
        params: {
          id,
        },
      });
      console.log(response.data);
      setAllSnippets(response.data);
    }
    async function fecthContributor() {
      let userDetail = await axios.get(`${BASE_URL}/user/userInfoById`, {
        params: {
          userId: id,
        },
      });
      setFullName(userDetail.data[0].fullName);
      setGitHub(userDetail.data[0].gitHub);
    }
    fecthContributor();
    fetchSnippets();
  }, []);
  return (
    <div className="Profile">
      <div className="userInfoContainer">
        <div className="fullName">{fullName}</div>
        {/* <div className="iconContainer"> */}
        <NavLink to={`https://github.com/${gitHub}`} target="_blank">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios-filled/50/FFFFFF/github.png"
            alt="github"
          />
        </NavLink>
        {/* </div> */}
      </div>
      <div className="code-container">
        {allSnippets &&
          allSnippets.map((snippet, index) => {
            return (
              <div className="snippet-container" key={index}>
                <Snippet topic={"array"} details={snippet} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Profile;
