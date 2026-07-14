import { useState, useEffect, useRef } from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

function Header() {
  const Navigate = useNavigate();
  const [search, setSearch] = useState("");
  const location = useLocation();
  const { t } = useTranslation();

  /* ── i18n ─────────────────────────────────────────────────── */
  const changeLanguage = (e) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  };

  /* ── Route flags ──────────────────────────────────────────── */
  const isLandingPage =
    location.pathname === "/" || location.pathname === "/LandingPage";

  /* ── Dark-mode observer ───────────────────────────────────── */
  const [isDarkMode, setIsDarkMode] = useState(
    document.body.classList.contains("dark")
  );
  useEffect(() => {
    const update = () => setIsDarkMode(document.body.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* ── Scroll shadow ────────────────────────────────────────── */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Account dropdown ─────────────────────────────────────── */
  const [isOpen, setIsOpen] = useState(false);
  const accountWrapperRef = useRef(null);
  const toggleMenu = () => {
    setIsOpen((v) => !v);
    setIsNotificationOpen(false);
  };

  /* ── Notification panel ───────────────────────────────────── */
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const toggleNotification = () => {
    setIsNotificationOpen((v) => !v);
    setIsOpen(false);
  };

  /* ── Mobile nav drawer ────────────────────────────────────── */
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileNav = () => setMobileOpen((v) => !v);

  /* ── Unified click-outside handler ───────────────────────── */
  useEffect(() => {
    const handler = (e) => {
      if (accountWrapperRef.current && !accountWrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Close mobile nav on route change ─────────────────────── */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <>
      {/* ════════════════════════ HEADER ════════════════════════ */}
      <header className={scrolled ? "scrolled" : ""}>

        {/* ── Logo (far left) ─────────────────────────────────── */}
        <div className="header-logo" onClick={() => Navigate("/LandingPage")}>
          <span className="logo">Learnova</span>
        </div>

        {/* ── Center nav (desktop only) ───────────────────────── */}
        <nav className="nav-links">
          <a
            href="/Explore"
            className={location.pathname === "/Explore" ? "active" : ""}
          >
            {t("setting.explore", "Explore")}
          </a>
          {!isLandingPage && (
            <a
              href="/My Learning"
              className={location.pathname === "/My Learning" ? "active" : ""}
            >
              {t("setting.my_learning", "My Learning")}
            </a>
          )}
        </nav>

        {/* ── Right section ───────────────────────────────────── */}
        <div className="header-right">

          {/* Search */}
          <div className="search-container">
            <div className="search-icon">
              <img
                src={isDarkMode ? "/photo_icons/search_white.png" : "/photo_icons/search.png"}
                alt="Search"
              />
            </div>
            <input
              type="text"
              placeholder={t("setting.what_are_you_learning", "What are you learning?")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search courses"
            />
          </div>

          {/* Auth: Landing page → Sign up / Log In */}
          {isLandingPage ? (
            <div className="auth-buttons">
              <button className="log-in" onClick={() => Navigate("/log_in")}>
                {t("setting.log_in", "Log In")}
              </button>
              <button className="sign-up" onClick={() => Navigate("/sign_up")}>
                {t("setting.sign_up", "Sign up")}
              </button>
            </div>
          ) : (
            /* Auth: App pages → account + notification icons */
            <div className="account-wrapper" ref={accountWrapperRef}>
              <div className="account">
                {/* Notification */}
                <button
                  className="icon-btn"
                  aria-label="Notifications"
                  onClick={toggleNotification}
                >
                  <img
                    src={
                      isDarkMode
                        ? "/photo_icons/notification_white.png"
                        : "/photo_icons/notification.png"
                    }
                    alt="Notifications"
                    className="header-notification-icon"
                  />
                </button>

                {/* Account */}
                <button
                  className="icon-btn"
                  aria-label="Account menu"
                  onClick={toggleMenu}
                >
                  <img
                    src={
                      isDarkMode
                        ? "photo_icons/account_white.png"
                        : "/photo_icons/account.png"
                    }
                    alt="Account"
                    className="header-account-icon"
                  />
                </button>
              </div>

              {/* ── Account dropdown ─────────────────────────── */}
              {isOpen && (
                <div className="Menu" role="menu">
                  <ul>
                    <li role="menuitem" onClick={() => Navigate("/Setting/Profile")}>
                      {t("setting.profile", "Profile")}
                    </li>
                    <li role="menuitem" onClick={() => Navigate("/My Learning")}>
                      {t("setting.my_learning", "My Learning")}
                    </li>
                    <li role="menuitem" onClick={() => Navigate("/payment_pay")}>
                      {t("setting.my_purchases", "My Purchases")}
                    </li>
                    <li role="menuitem" onClick={() => Navigate("/Save")}>
                      {t("setting.save", "Save")}
                    </li>
                    <li role="menuitem" onClick={() => Navigate("/Explore")}>
                      {t("setting.explore", "Explore")}
                    </li>
                    <li role="menuitem" onClick={() => Navigate("/Setting/Profile")}>
                      {t("setting.settings", "Settings")}
                    </li>
                    <li role="menuitem" onClick={() => Navigate("/Help center")}>
                      {t("setting.help_center", "Help Center")}
                    </li>
                    <li role="menuitem" className="menu-logout">
                      {t("setting.logout", "Logout")}
                    </li>
                  </ul>
                </div>
              )}

              {/* ── Notification panel ───────────────────────── */}
              {isNotificationOpen && (
                <div className="notification-panel" ref={notificationRef}>
                  <div className="notification-header">
                    <h3>{t("setting.notification", "Notifications")}</h3>
                    <button className="mark-as-read">
                      {t("setting.mark_all_as_read", "Mark all as read")}
                    </button>
                  </div>

                  <div className="notification-list">
                    <div className="notification-item unread">
                      <div className="noti-icon-container">
                        <img src="/photo_icons/book.png" alt="" className="noti-icon" />
                      </div>
                      <div className="noti-content">
                        <p className="noti-text">
                          Your course <strong>"React Masterclass"</strong> has new content!
                        </p>
                        <span className="noti-time">2 mins ago</span>
                      </div>
                      <div className="unread-dot" />
                    </div>

                    <div className="notification-item">
                      <div className="noti-icon-container">
                        <img
                          src="/photo_icons/account.png"
                          alt=""
                          className="noti-icon"
                          style={{ filter: isDarkMode ? "none" : "brightness(0) invert(1)" }}
                        />
                      </div>
                      <div className="noti-content">
                        <p className="noti-text">
                          You've completed <strong>"Advanced CSS Layouts"</strong>.
                        </p>
                        <span className="noti-time">1 hour ago</span>
                      </div>
                    </div>

                    <div className="notification-item unread">
                      <div className="noti-icon-container">
                        <img src="/photo_icons/Rating.png" alt="" className="noti-icon" />
                      </div>
                      <div className="noti-content">
                        <p className="noti-text">A new review was added to your profile.</p>
                        <span className="noti-time">3 hours ago</span>
                      </div>
                      <div className="unread-dot" />
                    </div>
                  </div>

                  <div className="notification-footer">
                    <button className="view-all-btn" onClick={() => Navigate("/Communication")}>
                      {t("setting.view_all", "View all")}
                    </button>
                    <button
                      className="noti-settings-btn"
                      onClick={() => Navigate("/Setting/Notification")}
                    >
                      <img
                        src="/photo_icons/For_setting/PreferencesBlack.png"
                        alt=""
                        className={isDarkMode ? "noti-settings-icon dark" : "noti-settings-icon"}
                      />
                      {t("setting.notification_settings", "Notification Settings")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Hamburger (mobile only) ──────────────────────── */}
          <button
            className={`hamburger ${mobileOpen ? "is-open" : ""}`}
            onClick={toggleMobileNav}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ══════════════════ MOBILE DRAWER ══════════════════════ */}
      <div className={`mobile-nav ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        <nav>
          <a href="/Explore" onClick={() => setMobileOpen(false)}>
            {t("setting.explore", "Explore")}
          </a>
          {!isLandingPage && (
            <a href="/My Learning" onClick={() => setMobileOpen(false)}>
              {t("setting.my_learning", "My Learning")}
            </a>
          )}
          {isLandingPage ? (
            <div className="mobile-auth">
              <button className="log-in" onClick={() => { Navigate("/log_in"); setMobileOpen(false); }}>
                {t("setting.log_in", "Log In")}
              </button>
              <button className="sign-up" onClick={() => { Navigate("/sign_up"); setMobileOpen(false); }}>
                {t("setting.sign_up", "Sign up")}
              </button>
            </div>
          ) : (
            <>
              <a href="/Setting/Profile" onClick={() => setMobileOpen(false)}>
                {t("setting.profile", "Profile")}
              </a>
              <a href="/Setting/Profile" onClick={() => setMobileOpen(false)}>
                {t("setting.settings", "Settings")}
              </a>
            </>
          )}
        </nav>
      </div>
      {/* Overlay that closes the drawer on tap */}
      {mobileOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}

export default Header;