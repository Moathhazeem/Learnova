import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Preferences.css';
import "../config/i18n";
import { useTranslation } from "react-i18next";
function Preferences() {
    const [hovered, setHovered] = useState(null);
    const search = {
        white: "/photo_icons/For_setting/White_Search.png",
        black: "/photo_icons/For_setting/Gray_Search.png"
    }
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);

    const { t, i18n } = useTranslation();
    const changeLanguage = (e) => {
        const language = e.target.value;
        i18n.changeLanguage(language);
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }

    const [autoplay, setAutoplay] = useState(false);
    const [captions, setCaptions] = useState(false);

    const allCategories = [
        "Technology", "Business", "Design", "Marketing", "Photography",
        "Music", "Health", "Language", "Science", "Art"
    ];
    const [selectedCategories, setSelectedCategories] = useState(["Technology", "Language"]);

    const toggleCategory = (cat) => {
        if (selectedCategories.includes(cat)) {
            setSelectedCategories(selectedCategories.filter(c => c !== cat));
        } else {
            setSelectedCategories([...selectedCategories, cat]);
        }
    };

    const categories = [
        { name: "Profile", path: "/Setting/Profile", black: "/photo_icons/For_setting/UserMaleBlack.png", blue: "/photo_icons/For_setting/UserMaleBlue.png" },
        { name: "Security", path: "/Setting/Security", black: "/photo_icons/For_setting/SecrityBlack.png", blue: "/photo_icons/For_setting/SecrityBlue.png" },
        { name: "Preferences", path: "/Setting/Preferences", black: "/photo_icons/For_setting/PreferencesBlack.png", blue: "/photo_icons/For_setting/PreferencesBlue.png" },
        { name: "Privacy", path: "/Setting/Privacy", black: "/photo_icons/For_setting/PrivacyBlack.png", blue: "/photo_icons/For_setting/PrivacyBlue.png" },
        { name: "Notification", path: "/Setting/Notification", black: "/photo_icons/For_setting/NotificationBlack.png", blue: "/photo_icons/For_setting/NotificationBlue.png" },
        { name: "Payment", path: "/Setting/Payment", black: "/photo_icons/For_setting/PaymentBlack.png", blue: "/photo_icons/For_setting/PaymentBlue.png" },
    ];
    const language = {
        english: "/Photo/US_America.jpg",
        arabic: "/Photo/Saudi_Arabia.svg",
    };
    const [country, setCountry] = useState("palestine");
    const flage = {
        palestine: "/Photo/Palestine.png",
        usa: "/Photo/US_America.jpg",
        uk: "/Photo/UK.svg",
        canada: "/Photo/Canada.svg",
        australia: "/Photo/Australia.svg",
        new_zealand: "/Photo/New_Zealand.svg",
    }
    const [themeChange, setThemeChange] = useState("light");
    const theme = {
        light: "/photo_icons/For_setting/light_mode.png",
        dark: "/photo_icons/For_setting/dark_mode.png",
        system: "/photo_icons/For_setting/system_mode.png",
    }
    return (
        <div className="edit-profile-container">
            <nav className="breadcrumbs-nav">
                <Link to="/Home" className="Breadcrumbs">{t("setting.home", "Home")}</Link>

                {pathname.map((value, index) => {
                    const to = "/" + pathname.slice(0, index + 1).join("/");
                    const isLast = index === pathname.length - 1;
                    const translationKey = value.toLowerCase() === "setting" ? "header" : value.toLowerCase();

                    return (
                        <span key={to}>
                            <span className="breadcrumb-separator"> {t("setting.breadcrumb_separator", ">")} </span>
                            {isLast ? (
                                <span className="current-page">{t(`setting.${translationKey}`, value.replace("_", " "))}</span>
                            ) : (
                                <Link to={to} className="Breadcrumbs">{t(`setting.${translationKey}`, value.replace("_", " "))}</Link>
                            )}
                        </span>
                    );
                })}
            </nav>

            <div className="Setting">
                <div className="header_setting">
                    <p>{t('setting.header', 'Settings')}</p>
                    <div className="search_page_setting">
                        <img src={search.black}
                            alt="search" className="setting-search-icon" />
                        <input type="search" placeholder={t('setting.search', 'Search settings')} />

                    </div>
                </div>
                <div className="Setting_option">
                    {categories.map((category, index) => {
                        const isActive = location.pathname === category.path;
                        const isHovered = hovered === index;
                        return (
                            <Link
                                to={category.path}
                                key={index}
                                className="category-tag"
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                                style={isActive || isHovered ? { backgroundColor: "rgba(0, 137, 234, 0.20)" } : { backgroundColor: "#FFFFFF" }}
                            >
                                <img
                                    src={isActive || isHovered ? category.blue : category.black}
                                    alt={category.name}
                                />
                                <p style={isActive || isHovered ? { color: "#0089EA" } : { color: "#000000" }}>
                                    {t(`setting.${category.name.toLowerCase()}`, category.name)}
                                </p>
                            </Link>
                        );
                    })}
                </div>
                <div className="Preferences_content">
                    <div className="pref-section">
                        <div className="pref-section-header">
                            <h3>{t('setting.general', 'General Preferences')}</h3>
                            <p>{t('setting.general_description', 'Customize your interface and regional settings.')}</p>
                        </div>
                        <div className="pref-list">
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4>{t('setting.language', 'Language')}</h4>
                                </div>
                                <div className="select-wrapper">
                                    <span className="select-icon"><img src={i18n.language === "en" ? language.english : language.arabic} alt="language" /></span>
                                    <select value={i18n.language} onChange={changeLanguage}>
                                        <option value="en">{t('setting.english', 'English')}</option>
                                        <option value="ar">{t('setting.arabic', 'Arabic')}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4>{t('setting.data_format', 'Data Format')}</h4>
                                </div>
                                <div className="select-wrapper">
                                    <span className="select-icon">📅</span>
                                    <select>
                                        <option>DD / MM / YYYY</option>
                                        <option>MM / DD / YYYY</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4>{t('setting.theme', 'Theme')}</h4>
                                </div>
                                <div className="select-wrapper">
                                    <span className="select-icon"><img src={theme[themeChange]} alt="theme" /></span>
                                    <select value={themeChange} onChange={(e) => setThemeChange(e.target.value)}>
                                        <option value={"light"}>{t('setting.light', 'Light Mode')}</option>
                                        <option value={"dark"}>{t('setting.dark', 'Dark Mode')}</option>
                                        <option value={"system"}>{t('setting.system', 'System Mode')}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4>{t('setting.location', 'Location')}</h4>
                                </div>
                                <div className="select-wrapper">
                                    <span className="select-icon"><img src={flage[country]} alt="" /></span>
                                    <select value={country} onChange={(e) => setCountry(e.target.value)}>
                                        <option value="palestine">{t('setting.palestine', 'Palestine')}</option>
                                        <option value="usa">{t('setting.usa', 'USA')}</option>
                                        <option value="uk">{t('setting.uk', 'UK')}</option>
                                        <option value="canada">{t('setting.canada', 'Canada')}</option>
                                        <option value="australia">{t('setting.australia', 'Australia')}</option>
                                        <option value="new_zealand">{t('setting.new_zealand', 'New Zealand')}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4>{t('setting.text_size', 'Text Size')}</h4>
                                </div>
                                <div className="select-wrapper">
                                    <span className="select-icon" style={{ fontWeight: 'bold', fontFamily: 'serif' }}>Tt</span>
                                    <select>
                                        <option>{t('setting.small', 'Small')}</option>
                                        <option>{t('setting.medium', 'Medium')}</option>
                                        <option>{t('setting.large', 'Large')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pref-section">
                        <div className="pref-section-header">
                            <h3>{t('setting.course_preferences', 'Course Preferences')}</h3>
                            <p>{t('setting.course_preferences_description', 'Customize your learning experience')}</p>
                        </div>
                        <div className="pref-list">
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4>{t('setting.autoplay', 'Autoplay next lesson')}</h4>
                                    <p>{t('setting.autoplay_description', 'Automatically start the next lesson when one finishes')}</p>
                                </div>
                                <label className="pref-switch">
                                    <input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} />
                                    <span className="pref-slider"></span>
                                </label>
                            </div>
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4>{t('setting.captions', 'Enable captions by default')}</h4>
                                    <p>{t('setting.captions_description', 'Show subtitles when available')}</p>
                                </div>
                                <label className="pref-switch">
                                    <input type="checkbox" checked={captions} onChange={(e) => setCaptions(e.target.checked)} />
                                    <span className="pref-slider"></span>
                                </label>
                            </div>
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4>{t('setting.default_playback_speed', 'Default Playback Speed')}</h4>
                                    <p>{t('setting.default_playback_speed_description', 'Set the default playback speed for videos.')}</p>
                                </div>
                                <div className="select-wrapper">
                                    <select>
                                        <option>{t('setting.speed_0.5', '0.5 X')}</option>
                                        <option>{t('setting.speed_0.75', '0.75 X')}</option>
                                        <option>{t('setting.speed_1', '1 X (Normal)')}</option>
                                        <option>{t('setting.speed_1.25', '1.25 X')}</option>
                                        <option>{t('setting.speed_1.5', '1.5 X')}</option>
                                        <option>{t('setting.speed_1.75', '1.75 X')}</option>
                                        <option>{t('setting.speed_2', '2 X')}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4>{t('setting.preferred_difficulty_level', 'Preferred Difficulty Level')}</h4>
                                    <p>{t('setting.preferred_difficulty_level_description', 'Set the preferred difficulty level for videos.')}</p>
                                </div>
                                <div className="select-wrapper">
                                    <select>
                                        <option>{t('setting.beginner', 'Beginner')}</option>
                                        <option>{t('setting.intermediate', 'Intermediate')}</option>
                                        <option>{t('setting.advanced', 'Advanced')}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pref-row">
                                <div className="pref-info">
                                    <h4>{t('setting.default_video_quality', 'Default Video Quality')}</h4>
                                    <p>{t('setting.default_video_quality_description', 'Set the default video quality for videos.')}</p>
                                </div>
                                <div className="select-wrapper">
                                    <select>
                                        <option>{t('setting.quality_auto', 'Auto (Recommended)')}</option>
                                        <option>{t('setting.quality_1080p', '1080p')}</option>
                                        <option>{t('setting.quality_720p', '720p')}</option>
                                        <option>{t('setting.quality_480p', '480p')}</option>
                                        <option>{t('setting.quality_360p', '360p')}</option>
                                        <option>{t('setting.quality_240p', '240p')}</option>
                                        <option>{t('setting.quality_144p', '144p')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pref-section">
                        <div className="pref-section-header">
                            <h3>{t('setting.interested_categories', 'Interested Categories')}</h3>
                            <p>{t('setting.interested_categories_description', 'Choose your preferred categories')}</p>
                        </div>
                        <div className="pref-chips">
                            {allCategories.map(cat => {
                                const translationKey = cat === "Language" ? "language_skill" : cat.toLowerCase();
                                return (
                                    <button
                                        key={cat}
                                        className={`pref-chip ${selectedCategories.includes(cat) ? 'active' : ''}`}
                                        onClick={() => toggleCategory(cat)}
                                    >
                                        {t(`setting.${translationKey}`, cat)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preferences;