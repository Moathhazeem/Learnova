import { useState, useEffect, useRef } from "react";
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
  const isSettingPage = location.pathname === "/Setting/Profile" || location.pathname === "/Setting/Security" || location.pathname === "/Setting/Preferences" || location.pathname === "/Setting/Privacy" || location.pathname === "/Setting/Notification" || location.pathname === "/Setting/Payment";

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])
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
            <>
              <div className="account" ref={menuRef}>
                <img src="/photo_icons/account.png" alt="Account icon" onClick={toggleMenu} />
                <img src="/photo_icons/notification.png" alt="Notification icon" />
              </div>
              {isOpen && (
                <div className="Menu">
                  <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
                    <li style={{ padding: "8px 0", cursor: "pointer" }}>Profile</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }}>My learning</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }}>My Purchases</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }}>Explore</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }}>Settings</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }}>Help center</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }}>Logout</li>
                  </ul>
                </div>
              )}
            </>
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