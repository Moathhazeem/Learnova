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
    setIsNotificationOpen(false);
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

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsOpen(false);
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
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
            <div className="account-wrapper">
              <div className="account">
                <img src="/photo_icons/account.png" alt="Account icon" onClick={toggleMenu} />
                <img src="/photo_icons/notification.png" alt="Notification icon" onClick={toggleNotification} />
              </div>
              {isOpen && (
                <div className="Menu" ref={menuRef}>
                  <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
                    <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => Navigate("/Setting/Profile")}>Profile</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => Navigate("/My learning")}>My learning</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => Navigate("/My Purchases")}>My Purchases</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => Navigate("/Explore")}>Explore</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => Navigate("/Setting/Profile")}>Settings</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => Navigate("/Help center")}>Help center</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }}>Logout</li>
                  </ul>
                </div>
              )}

              {isNotificationOpen && (
                <div className="notification-panel" ref={notificationRef}>
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <button className="mark-as-read">Mark all as read</button>
                  </div>
                  <div className="notification-list">
                    <div className="notification-item unread">
                      <div className="noti-icon-container">
                        <img src="/photo_icons/book.png" alt="book" className="noti-icon" />
                      </div>
                      <div className="noti-content">
                        <p className="noti-text">Your course <strong>"React Masterclass"</strong> has new content!</p>
                        <span className="noti-time">2 mins ago</span>
                      </div>
                      <div className="unread-dot"></div>
                    </div>
                    <div className="notification-item">
                      <div className="noti-icon-container">
                        <img src="/photo_icons/account.png" alt="account" className="noti-icon" />
                      </div>
                      <div className="noti-content">
                        <p className="noti-text">You've completed <strong>"Advanced CSS Layouts"</strong>.</p>
                        <span className="noti-time">1 hour ago</span>
                      </div>
                    </div>
                    <div className="notification-item unread">
                      <div className="noti-icon-container">
                        <img src="/photo_icons/Rating.png" alt="rating" className="noti-icon" />
                      </div>
                      <div className="noti-content">
                        <p className="noti-text">A new review was added to your profile.</p>
                        <span className="noti-time">3 hours ago</span>
                      </div>
                      <div className="unread-dot"></div>
                    </div>
                  </div>
                  <div className="notification-footer">
                    <button className="view-all-btn" onClick={() => Navigate("/Setting/Notification")}>View all</button>
                    <button className="noti-settings-btn" onClick={() => Navigate("/Setting/Notification")}>
                      <img src="/photo_icons/For_setting/PreferencesBlack.png" alt="settings" />
                      Notification Settings
                    </button>
                  </div>
                </div>
              )}
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