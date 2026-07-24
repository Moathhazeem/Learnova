import { useState, useEffect, useRef, useCallback } from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

/* ── Course catalogue for autocomplete ──────────────────────── */
const COURSES = [
  { title: "React Masterclass", route: "/Explore/Course" },
  { title: "Advanced CSS Layouts", route: "/Explore/Course" },
  { title: "JavaScript Fundamentals", route: "/Explore/Course" },
  { title: "Node.js Backend Development", route: "/Explore/Course" },
  { title: "Python for Data Science", route: "/Explore/Course" },
  { title: "UI/UX Design Principles", route: "/Explore/Course" },
  { title: "TypeScript Advanced Patterns", route: "/Explore/Course" },
  { title: "Machine Learning Basics", route: "/Explore/Course" },
  { title: "Cloud Computing with AWS", route: "/Explore/Course" },
  { title: "Digital Marketing Essentials", route: "/Explore/Course" },
  { title: "Graphic Design Fundamentals", route: "/Explore/Course" },
  { title: "SQL & Database Design", route: "/Explore/Course" },
  { title: "Mobile App Development", route: "/Explore/Course" },
  { title: "Cybersecurity Foundations", route: "/Explore/Course" },
  { title: "Project Management Pro", route: "/Explore/Course" },
  { title: "Communication Skills", route: "/Communication" },
];

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

  /* ── Search autocomplete ──────────────────────────────────── */
  const searchContainerRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const filteredCourses = search.trim().length > 0
    ? COURSES.filter((c) =>
        c.title.toLowerCase().includes(search.trim().toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSearchFocus = () => {
    if (search.trim().length > 0) setShowDropdown(true);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    setShowDropdown(val.trim().length > 0);
    setActiveIndex(-1);
  };

  const handleSearchKeyDown = (e) => {
    if (!showDropdown || filteredCourses.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filteredCourses.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const course = filteredCourses[activeIndex];
      Navigate(course.route, { state: { query: course.title } });
      setSearch("");
      setShowDropdown(false);
      setActiveIndex(-1);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  const handleCourseSelect = (course) => {
    Navigate(course.route, { state: { query: course.title } });
    setSearch("");
    setShowDropdown(false);
    setActiveIndex(-1);
  };

  /* ── Account dropdown ─────────────────────────────────────── */
  const [isOpen, setIsOpen] = useState(false);
  const accountWrapperRef = useRef(null);
  const toggleMenu = () => {
    setIsOpen((v) => !v);
    setIsNotificationOpen(false);
  };

  /* ── Notification state & actions ─────────────────────────── */
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "course",
      icon: "/photo_icons/book.png",
      text: 'Your course "React Masterclass" has new content!',
      time: "2 mins ago",
      isUnread: true,
      link: "/Communication",
    },
    {
      id: 2,
      type: "completion",
      icon: "/photo_icons/account.png",
      text: 'You\'ve completed "Advanced CSS Layouts".',
      time: "1 hour ago",
      isUnread: false,
      link: "/Communication",
    },
    {
      id: 3,
      type: "review",
      icon: "/photo_icons/Rating.png",
      text: "A new review has been added to your profile which is very detailed and has multiple sentences, leading to truncation...",
      time: "3 hours ago",
      isUnread: true,
      link: "/Communication",
    },
  ]);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleToggleRead = (id, e) => {
    e?.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: !n.isUnread } : n))
    );
  };

  const handleDeleteNotification = (id, e) => {
    e?.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const handleNotificationClick = (item) => {
    if (item.isUnread) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, isUnread: false } : n))
      );
    }
    if (item.link) {
      Navigate(item.link);
      setIsNotificationOpen(false);
    }
  };

  /* ── Notification panel toggle ────────────────────────────── */
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
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowDropdown(false);
        setActiveIndex(-1);
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
      <header className={`header-main ${scrolled ? "header-scrolled" : ""}`}>

        {/* ── Left Group: Logo + Explore / Navigation ───────── */}
        <div className="header-left-group">
          {/* Logo */}
          <div className="header-logo" onClick={() => Navigate("/LandingPage")}>
            <span className="header-logo-text">Learnova</span>
          </div>

          {/* Navigation links (Coursera style: right next to logo) */}
          <nav className="header-nav-links">
            <a
              href="/Explore"
              className={location.pathname === "/Explore" ? "header-active" : ""}
            >
              {t("setting.explore", "Explore")}
            </a>
            {!isLandingPage && (
              <a
                href="/My Learning"
                className={location.pathname === "/My Learning" ? "header-active" : ""}
              >
                {t("setting.my_learning", "My Learning")}
              </a>
            )}
          </nav>
        </div>

        {/* ── Center: Search Bar with Autocomplete ─────────────── */}
        <div className="header-search-container" ref={searchContainerRef}>
          <div className="header-search-icon">
            <img
              src={isDarkMode ? "/photo_icons/search_white.png" : "/photo_icons/search.png"}
              alt="Search"
            />
          </div>
          <input
            type="text"
            className="header-search-input"
            placeholder={t("setting.what_are_you_learning", "What are you learning?")}
            value={search}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onKeyDown={handleSearchKeyDown}
            aria-label="Search courses"
            aria-autocomplete="list"
            aria-expanded={showDropdown}
            autoComplete="off"
          />
          {/* ── Autocomplete Dropdown ─────────────────────────── */}
          {showDropdown && filteredCourses.length > 0 && (
            <div className="search-dropdown" role="listbox" aria-label="Course suggestions">
              {filteredCourses.map((course, idx) => (
                <div
                  key={course.title}
                  className={`search-dropdown-item${
                    idx === activeIndex ? " search-dropdown-item--active" : ""
                  }`}
                  role="option"
                  aria-selected={idx === activeIndex}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleCourseSelect(course)}
                >
                  <svg
                    className="search-dropdown-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span className="search-dropdown-text">
                    {course.title}
                  </span>
                </div>
              ))}
            </div>
          )}
          {showDropdown && filteredCourses.length === 0 && search.trim().length > 0 && (
            <div className="search-dropdown" role="listbox">
              <div className="search-dropdown-empty">
                No courses found for &ldquo;{search}&rdquo;
              </div>
            </div>
          )}
        </div>

        {/* ── Right Group: Auth or Account / Notifications ───── */}
        <div className="header-right">

          {/* Auth: Landing page → Sign up / Log In */}
          {isLandingPage ? (
            <div className="header-auth-buttons">
              <button className="header-log-in" onClick={() => Navigate("/log_in")}>
                {t("setting.log_in", "Log In")}
              </button>
              <button className="header-sign-up" onClick={() => Navigate("/sign_up")}>
                {t("setting.sign_up", "Sign up")}
              </button>
            </div>
          ) : (
            /* Auth: App pages → account + notification icons */
            <div className="header-account-wrapper" ref={accountWrapperRef}>
              <div className="header-account">
                {/* Notification */}
                <button
                  className="header-icon-btn header-noti-btn-relative"
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
                  {unreadCount > 0 && (
                    <span className="header-noti-badge">{unreadCount}</span>
                  )}
                </button>

                {/* Account menu button */}
                <button
                  className="header-icon-btn"
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
                <div className="header-menu" role="menu">
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
                    <li role="menuitem" onClick={() => Navigate("/FAQ")}>
                      {t("setting.help_center", "Help Center")}
                    </li>
                    <li role="menuitem" className="header-menu-logout" onClick={() => Navigate("/log_in")}>
                      {t("setting.logout", "Logout")}
                    </li>
                  </ul>
                </div>
              )}

              {/* ── Notification panel ───────────────────────── */}
              {isNotificationOpen && (
                <div className="header-notification-panel" ref={notificationRef}>
                  <div className="header-notification-header">
                    <div className="header-noti-title-wrap">
                      <h3>{t("setting.notification", "Notifications")}</h3>
                      {unreadCount > 0 && (
                        <span className="header-noti-unread-count">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {notifications.length > 0 && unreadCount > 0 && (
                      <button
                        className="header-mark-as-read"
                        onClick={handleMarkAllRead}
                      >
                        {t("setting.mark_all_as_read", "Mark all as read")}
                      </button>
                    )}
                  </div>

                  <div className="header-notification-list">
                    {notifications.length > 0 ? (
                      notifications.map((item) => (
                        <div
                          key={item.id}
                          className={`header-notification-item ${
                            item.isUnread ? "header-unread" : ""
                          }`}
                          onClick={() => handleNotificationClick(item)}
                        >
                          <div className="header-noti-icon-container">
                            <img
                              src={item.icon}
                              alt=""
                              className={`header-noti-icon ${
                                item.type === "completion" ? "header-noti-icon-account" : ""
                              }`}
                            />
                          </div>

                          <div className="header-noti-content">
                            <p className="header-noti-text">
                              {item.text}
                            </p>
                            <span className="header-noti-time">{item.time}</span>
                          </div>

                          <div className="header-noti-actions">
                            {item.isUnread ? (
                              <button
                                className="header-noti-action-btn"
                                title="Mark as read"
                                onClick={(e) => handleToggleRead(item.id, e)}
                              >
                                <span className="header-dot-toggle unread" />
                              </button>
                            ) : (
                              <div className="header-noti-action-spacer" />
                            )}
                            <button
                              className="header-noti-action-btn delete"
                              title="Delete notification"
                              onClick={(e) => handleDeleteNotification(item.id, e)}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="header-noti-empty-state">
                        <div className="header-noti-empty-icon-wrap">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                          </svg>
                        </div>
                        <h4>No notifications right now</h4>
                        <p>We'll notify you when something important arrives!</p>
                      </div>
                    )}
                  </div>

                  <div className="header-notification-footer">
                    <button
                      className="header-view-all-btn"
                      onClick={() => Navigate("/Communication")}
                    >
                      {t("setting.view_all", "View all")}
                    </button>
                    <button
                      className="header-noti-settings-btn"
                      onClick={() => Navigate("/Setting/Notification")}
                    >
                      <img
                        src="/photo_icons/For_setting/PreferencesBlack.png"
                        alt=""
                        className={
                          isDarkMode
                            ? "header-noti-settings-icon dark"
                            : "header-noti-settings-icon"
                        }
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
            className={`header-hamburger ${mobileOpen ? "header-is-open" : ""}`}
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
      <div className={`header-mobile-nav ${mobileOpen ? "header-is-open" : ""}`} aria-hidden={!mobileOpen}>
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
            <div className="header-mobile-auth">
              <button className="header-log-in" onClick={() => { Navigate("/log_in"); setMobileOpen(false); }}>
                {t("setting.log_in", "Log In")}
              </button>
              <button className="header-sign-up" onClick={() => { Navigate("/sign_up"); setMobileOpen(false); }}>
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
        <div className="header-mobile-nav-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}

export default Header;