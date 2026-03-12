import { useState } from "react";
import "./Header.css"
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
function Header() {
  const Navigate = useNavigate()
  const [search, setSearch] = useState("")
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <header>
        <h1 className="logo" onClick={() => Navigate("/")}><a href='#'>Learnova</a></h1>

        <nav className="nav-links">
          <a href='#'>Explore</a>
          <a href='#'>My learning</a>
        </nav>
        <div className="search-container">
          <input
            type="text"
            placeholder="What you want learn ?"
            value={search}
            onChange={handleSearch}
          />
          <div className="search-icon"><img src="/photo_icons/search.png" alt="Search icon" /></div>
        </div>
        <div className="auth-buttons">
          <button className="sign-up" onClick={() => Navigate("/sign_up")}>Sign Up</button>
          <button className="log-in" onClick={() => Navigate("/log_in")}>Log In</button>
        </div>
      </header>

    </>
  )
}
export default Header