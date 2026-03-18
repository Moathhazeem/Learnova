import { useState } from "react";
import "./Header.css"
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import { useLocation } from "react-router-dom";
function Header() {
  const Navigate = useNavigate()
  const [search, setSearch] = useState("")
  const location = useLocation();
  const isLandingPage = location.pathname === "/" || location.pathname === "/LandingPage";

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <header>
        <div className="header-left">
          {isLandingPage ? (
            <div className="auth-buttons">
              <button className="sign-up" onClick={() => Navigate("/sign_up")}>Sign up</button>
              <button className="log-in" onClick={() => Navigate("/log_in")}>Log In</button>
            </div>
          ) : (
            <div className="account">
              <img src="/photo_icons/account.png" alt="Account icon" />
              <img src="/photo_icons/notification.png" alt="Notification icon" />
            </div>
          )}
        </div>

        <div className="header-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="what you want learn ?"
              value={search}
              onChange={handleSearch}
            />
            <div className="search-icon">
              <img src="/photo_icons/search.png" alt="Search icon" />
            </div>
          </div>

          <nav className="nav-links">
            <a href="#" style={{ marginRight: "100px" }}>My learning</a>
            <a href="#" style={{ marginRight: "100px" }}>Explore</a>
          </nav>
          <h1 className="logo" onClick={() => Navigate("/LandingPage")}>
            <a href="/LandingPage">Learnova</a>
          </h1>
        </div>
      </header>
    </>
  )
}

export default Header