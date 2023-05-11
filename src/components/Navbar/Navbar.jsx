import React, {useState} from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom';

function Navbar() {
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
                        <div className="snippetBox">Array</div>
                        <div className="snippetBox">LinkedList</div>
                        <div className="snippetBox">Tree</div>
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