import "./App.css";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Logout from "./pages/Logout/Logout.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import { useState } from "react";
import AddSnippet from "./components/AddSnippet/AddSnippet.jsx";

export default function App() {
  const [parentTopic, setParentTopic] = useState("array");
  const [reloadNavbar, setReloadNavbar] = useState(false);

  return (
    <Router>
      <Navbar setParentTopic={setParentTopic} />
      <Routes>
        <Route path="/" element={<Home parentTopic={parentTopic} />} />
        <Route
          path="/login"
          element={<Login setReloadNavbar={setReloadNavbar} />}
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/new" element={<AddSnippet />} />
      </Routes>
    </Router>
  );
}
