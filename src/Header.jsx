import { useState, useEffect, useRef } from "react";
import "./Header.css"
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const Navigate = useNavigate()
  const [search, setSearch] = useState("")
  const location = useLocation();
  const { t } = useTranslation();
  const changeLanguage = (e) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }
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
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains("dark"));
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

  useEffect(() => {
    const updateThemeState = () => {
      setIsDarkMode(document.body.classList.contains("dark"));
    };
    updateThemeState();

    const observer = new MutationObserver(updateThemeState);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);
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
                <img
                  src={isDarkMode ? "photo_icons/account_white.png" : "/photo_icons/account.png"}
                  alt="Account icon"
                  className={isDarkMode ? "header-account-icon dark" : "header-account-icon"}
                  onClick={toggleMenu}
                />
                <img
                  src={isDarkMode ? "/photo_icons/notification_white.png" : "/photo_icons/notification.png"}
                  alt="Notification icon"
                  className={isDarkMode ? "header-notification-icon-dark" : "header-notification-icon"}
                  onClick={toggleNotification}
                />
              </div>
              {isOpen && (
                <div className="Menu" ref={menuRef}>
                  <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
                    <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => Navigate("/Setting/Profile")}>{t("setting.profile", "Profile")}</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => Navigate("/My learning")}>{t("setting.my_learning", "My Learning")}</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => Navigate("/My Purchases")}>{t("setting.my_purchases", "My Purchases")}</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => Navigate("/Explore")}>{t("setting.explore", "Explore")}</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => Navigate("/Setting/Profile")}>{t("setting.settings", "Settings")}</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => Navigate("/Help center")}>{t("setting.help_center", "Help Center")}</li>
                    <li style={{ padding: "8px 0", cursor: "pointer" }}>{t("setting.logout", "Logout")}</li>
                  </ul>
                </div>
              )}

              {isNotificationOpen && (
                <div className="notification-panel" ref={notificationRef}>
                  <div className="notification-header">
                    <h3>{t("setting.notification", "Notifications")}</h3>
                    <button className="mark-as-read">{t("setting.mark_all_as_read", "Mark all as read")}</button>
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
                        <img src="/photo_icons/account.png" alt="account" className="noti-icon" style={{ filter: isDarkMode ? "none" : "brightness(0) invert(1)" }} />
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
                    <button className="view-all-btn" onClick={() => Navigate("/Setting/Notification")}>{t("setting.view_all", "View all")}</button>
                    <button className="noti-settings-btn" onClick={() => Navigate("/Setting/Notification")}>
                      <img
                        src="/photo_icons/For_setting/PreferencesBlack.png"
                        alt="settings"
                        className={isDarkMode ? "noti-settings-icon dark" : "noti-settings-icon"}
                      />
                      {t("setting.notification_settings", "Notification Settings")}
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
              placeholder={t("setting.what_are_you_learning", "What are you learning?")}
              value={search}
              onChange={handleSearch}
            />
            <div className="search-icon">
              <img src={isDarkMode ? "/photo_icons/search_white.png" : "/photo_icons/search.png"} alt="Search icon" />
            </div>
          </div>

          <nav className="nav-links">
            <a href="#" style={{ marginRight: "100px" }}>{t("setting.my_learning", "My Learning")}</a>
            <a href="#" style={{ marginRight: "100px" }}>{t("setting.explore", "Explore")}</a>
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