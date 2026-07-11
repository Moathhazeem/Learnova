import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Preferences.css';
import "../config/i18n";
import { useTranslation } from "react-i18next";

/* ── Reusable iOS-style toggle (matches Security page) ─────────────── */
function IOSToggle({ checked, onChange, id }) {
    return (
        <label htmlFor={id} className="ios-toggle-label" aria-label="toggle">
            <input
                id={id}
                type="checkbox"
                className="ios-toggle-input"
                checked={checked}
                onChange={onChange}
            />
            <span className={`ios-toggle-track ${checked ? 'ios-on' : 'ios-off'}`}>
                <span className="ios-toggle-thumb" />
            </span>
        </label>
    );
}

/* ── Card-based theme selector ──────────────────────────────────────── */
function ThemeCard({ value, label, icon, selected, onClick }) {
    return (
        <button
            className={`theme-card ${selected ? 'theme-card--selected' : ''}`}
            onClick={() => onClick(value)}
            type="button"
        >
            <span className="theme-card__icon">{icon}</span>
            <span className="theme-card__label">{label}</span>
            {selected && (
                <span className="theme-card__check">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#0089EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            )}
        </button>
    );
}

/* ── Polished select wrapper ────────────────────────────────────────── */
function StyledSelect({ icon, children, value, onChange, id }) {
    return (
        <div className="pref-select-wrapper">
            {icon && <span className="pref-select-icon">{icon}</span>}
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="pref-select"
            >
                {children}
            </select>
            <span className="pref-select-chevron">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 5l4 4 4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        </div>
    );
}

function Preferences() {
    const [hovered, setHovered] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains("dark"));
    const search = {
        white: "/photo_icons/search_white.png",
        black: "/photo_icons/search_black.png"
    };

    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);
    const { t, i18n } = useTranslation();

    const changeLanguage = (e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    };

    const [autoplay, setAutoplay] = useState(false);
    const [captions, setCaptions] = useState(false);
    const [emailDigest, setEmailDigest] = useState(true);

    const allCategories = [
        "Technology", "Business", "Design", "Marketing", "Photography",
        "Music", "Health", "Language", "Science", "Art"
    ];
    const [selectedCategories, setSelectedCategories] = useState(["Technology", "Language"]);
    const toggleCategory = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const categories = [
        { name: "Profile",      path: "/Setting/Profile",      black: "/photo_icons/For_setting/UserMaleBlack.png",     white: "/photo_icons/For_setting/UserMaleWhite.png",     blue: "/photo_icons/For_setting/UserMaleBlue.png" },
        { name: "Security",     path: "/Setting/Security",     black: "/photo_icons/For_setting/SecrityBlack.png",      white: "/photo_icons/For_setting/SecrityWhite.png",      blue: "/photo_icons/For_setting/SecrityBlue.png" },
        { name: "Preferences",  path: "/Setting/Preferences",  black: "/photo_icons/For_setting/PreferencesBlack.png",                                                            blue: "/photo_icons/For_setting/PreferencesBlue.png" },
        { name: "Privacy",      path: "/Setting/Privacy",      black: "/photo_icons/For_setting/PrivacyBlack.png",      white: "/photo_icons/For_setting/PrivacyWhite.png",      blue: "/photo_icons/For_setting/PrivacyBlue.png" },
        { name: "Notification", path: "/Setting/Notification", black: "/photo_icons/For_setting/NotificationBlack.png", white: "/photo_icons/For_setting/NotificationWhite.png", blue: "/photo_icons/For_setting/NotificationBlue.png" },
        { name: "Payment",      path: "/Setting/Payment",      black: "/photo_icons/For_setting/PaymentBlack.png",      white: "/photo_icons/For_setting/PaymentWhite.png",      blue: "/photo_icons/For_setting/PaymentBlue.png" },
    ];

    const langIcons = {
        english: "/Photo/US_America.jpg",
        arabic:  "/Photo/Saudi_Arabia.svg",
    };
    const [country, setCountry] = useState("palestine");
    const flags = {
        palestine:   "/Photo/Palestine.png",
        usa:         "/Photo/US_America.jpg",
        uk:          "/Photo/UK.svg",
        canada:      "/Photo/Canada.svg",
        australia:   "/Photo/Australia.svg",
        new_zealand: "/Photo/New_Zealand.svg",
    };

    const [themeChange, setThemeChange] = useState("light");
    const themeOptions = [
        { value: "light",  label: t('setting.light',  'Light'),  icon: "☀️" },
        { value: "dark",   label: t('setting.dark',   'Dark'),   icon: "🌙" },
        { value: "system", label: t('setting.system', 'System'), icon: "💻" },
    ];

    useEffect(() => {
        const root = document.documentElement;
        if (themeChange === 'light') { root.classList.remove('dark'); root.classList.add('light'); }
        else if (themeChange === 'dark') { root.classList.remove('light'); root.classList.add('dark'); }
        else if (themeChange === 'system') {
            const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.remove('light', 'dark');
            root.classList.add(dark ? 'dark' : 'light');
        }
    }, [themeChange]);

    useEffect(() => {
        const update = () => setIsDarkMode(document.documentElement.classList.contains("dark"));
        update();
        const obs = new MutationObserver(update);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => obs.disconnect();
    }, []);

    const [textsize, setTextsize] = useState("medium");
    const textSizes = { small: "12px", medium: "16px", large: "20px" };
    useEffect(() => { document.documentElement.style.fontSize = textSizes[textsize]; }, [textsize]);

    return (
        <div className="edit-profile-container">
            {/* Breadcrumbs */}
            <nav className="breadcrumbs-nav">
                <Link to="/Home" className="Breadcrumbs">{t("setting.home", "Home")}</Link>
                {pathname.map((value, index) => {
                    const to = "/" + pathname.slice(0, index + 1).join("/");
                    const isLast = index === pathname.length - 1;
                    const translationKey = value.toLowerCase() === "setting" ? "header" : value.toLowerCase();
                    return (
                        <span key={to}>
                            <span className="breadcrumb-separator"> {t("setting.breadcrumb_separator", ">")} </span>
                            {isLast
                                ? <span className="current-page">{t(`setting.${translationKey}`, value.replace("_", " "))}</span>
                                : <Link to={to} className="Breadcrumbs">{t(`setting.${translationKey}`, value.replace("_", " "))}</Link>
                            }
                        </span>
                    );
                })}
            </nav>

            <div className="Setting">
                {/* Header */}
                <div className="header_setting">
                    <p>{t('setting.header', 'Settings')}</p>
                    <div className="search_page_setting">
                        <img src={isDarkMode ? search.white : search.black} alt="search" className="setting-search-icon" />
                        <input type="search" placeholder={t('setting.search', 'Search settings')} />
                    </div>
                </div>

                {/* Sidebar Nav */}
                <div className="Setting_option">
                    {categories.map((category, index) => {
                        const isActive = location.pathname === category.path;
                        const isHov = hovered === index;
                        return (
                            <Link
                                to={category.path}
                                key={index}
                                className="category-tag"
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                                style={isActive || isHov ? { backgroundColor: "#0089EA" } : { backgroundColor: "#FFFFFF" }}
                            >
                                <img
                                    src={isActive || isHov ? category.blue : category.black}
                                    alt={category.name}
                                    style={isActive || isHov ? { filter: "brightness(0) invert(1)" } : { filter: "none" }}
                                />
                                <p style={isActive || isHov ? { color: "#FFFFFF" } : { color: "#000000" }}>
                                    {t(`setting.${category.name.toLowerCase()}`, category.name)}
                                </p>
                            </Link>
                        );
                    })}
                </div>

                {/* ── Preference Sections ── */}
                <div className="Preferences_content">

                    {/* CARD 1 — Language & Region */}
                    <div className="pref-card">
                        <div className="pref-card-header">
                            <span className="pref-card-icon">🌐</span>
                            <div>
                                <h3 className="pref-card-title">{t('setting.lang_region', 'Language & Region')}</h3>
                                <p className="pref-card-desc">{t('setting.lang_region_description', 'Set your language, date format, and location.')}</p>
                            </div>
                        </div>
                        <div className="pref-divider" />
                        <div className="pref-list">
                            {/* Language */}
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4 className="pref-label">{t('setting.language', 'Language')}</h4>
                                    <p className="pref-hint">{t('setting.language_description', 'Choose your preferred display language.')}</p>
                                </div>
                                <StyledSelect
                                    id="language-select"
                                    value={i18n.language}
                                    onChange={changeLanguage}
                                    icon={<img src={i18n.language === "en" ? langIcons.english : langIcons.arabic} alt="language" className="flag-icon" />}
                                >
                                    <option value="en">{t('setting.english', 'English')}</option>
                                    <option value="ar">{t('setting.arabic', 'Arabic')}</option>
                                </StyledSelect>
                            </div>
                            <div className="pref-separator" />
                            {/* Date Format */}
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4 className="pref-label">{t('setting.data_format', 'Date Format')}</h4>
                                    <p className="pref-hint">{t('setting.date_format_description', 'Choose how dates are displayed throughout the app.')}</p>
                                </div>
                                <StyledSelect id="date-format-select" icon="📅">
                                    <option>DD / MM / YYYY</option>
                                    <option>MM / DD / YYYY</option>
                                </StyledSelect>
                            </div>
                            <div className="pref-separator" />
                            {/* Location */}
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4 className="pref-label">{t('setting.location', 'Location')}</h4>
                                    <p className="pref-hint">{t('setting.location_description', 'Your region affects content and currency.')}</p>
                                </div>
                                <StyledSelect
                                    id="location-select"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    icon={<img src={flags[country]} alt="flag" className="flag-icon" />}
                                >
                                    <option value="palestine">{t('setting.palestine', 'Palestine')}</option>
                                    <option value="usa">{t('setting.usa', 'USA')}</option>
                                    <option value="uk">{t('setting.uk', 'UK')}</option>
                                    <option value="canada">{t('setting.canada', 'Canada')}</option>
                                    <option value="australia">{t('setting.australia', 'Australia')}</option>
                                    <option value="new_zealand">{t('setting.new_zealand', 'New Zealand')}</option>
                                </StyledSelect>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2 — Display & Theme */}
                    <div className="pref-card">
                        <div className="pref-card-header">
                            <span className="pref-card-icon">🎨</span>
                            <div>
                                <h3 className="pref-card-title">{t('setting.display_theme', 'Display & Theme')}</h3>
                                <p className="pref-card-desc">{t('setting.display_theme_description', 'Personalise the look and feel of your experience.')}</p>
                            </div>
                        </div>
                        <div className="pref-divider" />
                        <div className="pref-list">
                            {/* Theme card-selector */}
                            <div className="pref-row pref-row--col">
                                <div className="pref-info">
                                    <h4 className="pref-label">{t('setting.theme', 'Theme')}</h4>
                                    <p className="pref-hint">{t('setting.theme_description', 'Select a colour scheme for the interface.')}</p>
                                </div>
                                <div className="theme-card-group">
                                    {themeOptions.map(opt => (
                                        <ThemeCard
                                            key={opt.value}
                                            value={opt.value}
                                            label={opt.label}
                                            icon={opt.icon}
                                            selected={themeChange === opt.value}
                                            onClick={setThemeChange}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="pref-separator" />
                            {/* Text Size */}
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4 className="pref-label">{t('setting.text_size', 'Text Size')}</h4>
                                    <p className="pref-hint">{t('setting.text_size_description', 'Adjust the base font size for readability.')}</p>
                                </div>
                                <StyledSelect
                                    id="text-size-select"
                                    value={textsize}
                                    onChange={(e) => setTextsize(e.target.value)}
                                    icon={<span style={{ fontWeight: 700, fontFamily: 'serif', fontSize: '15px', color: '#6B7280', lineHeight: 1 }}>Tt</span>}
                                >
                                    <option value="small">{t('setting.small', 'Small (12px)')}</option>
                                    <option value="medium">{t('setting.medium', 'Medium (16px)')}</option>
                                    <option value="large">{t('setting.large', 'Large (20px)')}</option>
                                </StyledSelect>
                            </div>
                        </div>
                    </div>

                    {/* CARD 3 — Course Preferences */}
                    <div className="pref-card">
                        <div className="pref-card-header">
                            <span className="pref-card-icon">🎓</span>
                            <div>
                                <h3 className="pref-card-title">{t('setting.course_preferences', 'Course Preferences')}</h3>
                                <p className="pref-card-desc">{t('setting.course_preferences_description', 'Customise your learning experience.')}</p>
                            </div>
                        </div>
                        <div className="pref-divider" />
                        <div className="pref-list">
                            {/* Autoplay */}
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4 className="pref-label">{t('setting.autoplay', 'Autoplay next lesson')}</h4>
                                    <p className="pref-hint">{t('setting.autoplay_description', 'Automatically start the next lesson when one finishes.')}</p>
                                </div>
                                <IOSToggle id="autoplay-toggle" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} />
                            </div>
                            <div className="pref-separator" />
                            {/* Captions */}
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4 className="pref-label">{t('setting.captions', 'Enable captions by default')}</h4>
                                    <p className="pref-hint">{t('setting.captions_description', 'Show subtitles automatically when available.')}</p>
                                </div>
                                <IOSToggle id="captions-toggle" checked={captions} onChange={(e) => setCaptions(e.target.checked)} />
                            </div>
                            <div className="pref-separator" />
                            {/* Weekly Digest */}
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4 className="pref-label">{t('setting.email_digest', 'Weekly email digest')}</h4>
                                    <p className="pref-hint">{t('setting.email_digest_description', 'Receive a weekly summary of your learning progress.')}</p>
                                </div>
                                <IOSToggle id="email-digest-toggle" checked={emailDigest} onChange={(e) => setEmailDigest(e.target.checked)} />
                            </div>
                            <div className="pref-separator" />
                            {/* Playback Speed */}
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4 className="pref-label">{t('setting.default_playback_speed', 'Default Playback Speed')}</h4>
                                    <p className="pref-hint">{t('setting.default_playback_speed_description', 'Set the default playback speed for all videos.')}</p>
                                </div>
                                <StyledSelect id="playback-speed-select" icon="⚡">
                                    <option>{t('setting.speed_0.5', '0.5×')}</option>
                                    <option>{t('setting.speed_0.75', '0.75×')}</option>
                                    <option>{t('setting.speed_1', '1× (Normal)')}</option>
                                    <option>{t('setting.speed_1.25', '1.25×')}</option>
                                    <option>{t('setting.speed_1.5', '1.5×')}</option>
                                    <option>{t('setting.speed_1.75', '1.75×')}</option>
                                    <option>{t('setting.speed_2', '2×')}</option>
                                </StyledSelect>
                            </div>
                            <div className="pref-separator" />
                            {/* Difficulty */}
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4 className="pref-label">{t('setting.preferred_difficulty_level', 'Preferred Difficulty Level')}</h4>
                                    <p className="pref-hint">{t('setting.preferred_difficulty_level_description', 'Filter course recommendations by difficulty.')}</p>
                                </div>
                                <StyledSelect id="difficulty-select" icon="📊">
                                    <option>{t('setting.beginner', 'Beginner')}</option>
                                    <option>{t('setting.intermediate', 'Intermediate')}</option>
                                    <option>{t('setting.advanced', 'Advanced')}</option>
                                </StyledSelect>
                            </div>
                            <div className="pref-separator" />
                            {/* Video Quality */}
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4 className="pref-label">{t('setting.default_video_quality', 'Default Video Quality')}</h4>
                                    <p className="pref-hint">{t('setting.default_video_quality_description', 'Higher quality uses more data.')}</p>
                                </div>
                                <StyledSelect id="video-quality-select" icon="🎬">
                                    <option>{t('setting.quality_auto', 'Auto (Recommended)')}</option>
                                    <option>{t('setting.quality_1080p', '1080p')}</option>
                                    <option>{t('setting.quality_720p', '720p')}</option>
                                    <option>{t('setting.quality_480p', '480p')}</option>
                                    <option>{t('setting.quality_360p', '360p')}</option>
                                    <option>{t('setting.quality_240p', '240p')}</option>
                                    <option>{t('setting.quality_144p', '144p')}</option>
                                </StyledSelect>
                            </div>
                        </div>
                    </div>

                    {/* CARD 4 — Interested Categories */}
                    <div className="pref-card">
                        <div className="pref-card-header">
                            <span className="pref-card-icon">🏷️</span>
                            <div>
                                <h3 className="pref-card-title">{t('setting.interested_categories', 'Interested Categories')}</h3>
                                <p className="pref-card-desc">{t('setting.interested_categories_description', 'Select topics you want to explore and learn.')}</p>
                            </div>
                        </div>
                        <div className="pref-divider" />
                        <div className="pref-chips">
                            {allCategories.map(cat => {
                                const translationKey = cat === "Language" ? "language_skill" : cat.toLowerCase();
                                const isActive = selectedCategories.includes(cat);
                                return (
                                    <button
                                        key={cat}
                                        className={`pref-chip ${isActive ? 'active' : ''}`}
                                        onClick={() => toggleCategory(cat)}
                                    >
                                        {isActive && (
                                            <svg className="chip-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        {t(`setting.${translationKey}`, cat)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>{/* end Preferences_content */}

                {/* Footer */}
                <div className="page_actions_footer">
                    <button className="btn_save">{t('setting.save', 'Save Changes')}</button>
                    <button className="btn_reset">{t('setting.reset', 'Reset to Defaults')}</button>
                    <button className="btn_cancel">{t('setting.cancel', 'Cancel')}</button>
                </div>
            </div>
        </div>
    );
}

export default Preferences;