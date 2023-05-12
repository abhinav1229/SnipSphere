import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../helper/ref";
import { useParams } from "react-router";
import Snippet from "../../components/Snippet/Snippet";
import "../../components/SnippetList/SnippetList.css";
import "./Profile.css";
import { Link, NavLink } from "react-router-dom";
import ReactLoading from "react-loading";

function Profile() {
  const { id } = useParams();
  const [allSnippets, setAllSnippets] = useState([]);
  const [fullName, setFullName] = useState("");
  const [gitHub, setGitHub] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchSnippets() {
      let response = await axios.get(`${BASE_URL}/snippets/allofuser`, {
        params: {
          id,
        },
      });
      setAllSnippets(response.data);
    }
    async function fecthContributor() {
      let userDetail = await axios.get(`${BASE_URL}/user/userInfoById`, {
        params: {
          userId: id,
        },
      });
      console.log(userDetail.data);
      setFullName(userDetail.data[0].fullName.split(" ")[0]);
      setGitHub(userDetail.data[0].gitHub);
      setLoading(false);
    }
    fecthContributor();
    fetchSnippets();
  }, []);
  return (
    <div className="Profile">
      {loading ? (
        <ReactLoading type={"spin"} color={"grey"} height={50} width={50} />
      ) : (
        <>
          <div className="userInfoContainer">
            <div className="fullName">
              Hi there 👋, I'm {fullName && fullName} 💻{" "}
            </div>

            {/* <div className="iconContainer"> */}
            <NavLink to={`https://github.com/${gitHub}`} target="_blank">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/FFFFFF/github.png"
                alt="github"
              />
            </NavLink>
            <div className="line"></div>
            <div style={{ fontSize: "1.5rem", marginTop: "30px" }}>
              My Snippets
            </div>
            {/* </div> */}
          </div>
          <div className="code-container">
            {allSnippets &&
              allSnippets.map((snippet, index) => {
                return (
                  <Snippet topic={"array"} details={snippet} key={index} />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
