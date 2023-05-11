import React, {useState} from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom';
import SnippetList from '../SnippetList.jsx';
import "../../css/code.css";
import TopicList from '../TopicList/TopicList';


function Navbar({setParentTopic}) {
    const [showSnippets, setShowSnippets] = useState(false);
    const openAllSnippets = () => {
        setShowSnippets(!showSnippets);
    }

    
  return (
    <>
        <nav>
            <div className="logoContainer">
                <NavLink to={"/"}>CODE</NavLink>
            </div>
            <div className="navLinkContainer">

                <NavLink className="navLink" to={"/newsnippet"}>Add New</NavLink>
                <div>
                <NavLink className="navLink" onClick={openAllSnippets}>Snippets</NavLink>
                    {
                        showSnippets && <div className="snippetContainer">
                        <TopicList setParentTopic={setParentTopic}/>
                    </div>
                    }
                    
                </div>
                <NavLink className="navLink" to={"/login"}>Login</NavLink>
            </div>
        </nav>
        
    </>
  )
}

export default Navbar