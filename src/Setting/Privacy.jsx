import React, { useState, useEffect } from 'react';
import './Privacy.css';
import { Link, useLocation } from 'react-router-dom';
import "../config/i18n";
import { useTranslation } from "react-i18next";

function Privacy() {
    const [hovered, setHovered] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains("dark"));
    const search = {
        white: "/photo_icons/search_white.png",
        black: "/photo_icons/search_black.png"
    }
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);

    const { t } = useTranslation();

    const categories = [
        { name: "Profile", path: "/Setting/Profile", black: "/photo_icons/For_setting/UserMaleBlack.png", white: "/photo_icons/For_setting/UserMaleWhite.png", blue: "/photo_icons/For_setting/UserMaleBlue.png" },
        { name: "Security", path: "/Setting/Security", black: "/photo_icons/For_setting/SecrityBlack.png", white: "/photo_icons/For_setting/SecrityWhite.png", blue: "/photo_icons/For_setting/SecrityBlue.png" },
        { name: "Preferences", path: "/Setting/Preferences", black: "/photo_icons/For_setting/PreferencesBlack.png", blue: "/photo_icons/For_setting/PreferencesBlue.png" },
        { name: "Privacy", path: "/Setting/Privacy", black: "/photo_icons/For_setting/PrivacyBlack.png", white: "/photo_icons/For_setting/PrivacyWhite.png", blue: "/photo_icons/For_setting/PrivacyBlue.png" },
        { name: "Notification", path: "/Setting/Notification", black: "/photo_icons/For_setting/NotificationBlack.png", white: "/photo_icons/For_setting/NotificationWhite.png", blue: "/photo_icons/For_setting/NotificationBlue.png" },
        { name: "Payment", path: "/Setting/Payment", black: "/photo_icons/For_setting/PaymentBlack.png", white: "/photo_icons/For_setting/PaymentWhite.png", blue: "/photo_icons/For_setting/PaymentBlue.png" },
    ];
    const [isOn, setIsOn] = useState(false);
    const [isOff, setIsOff] = useState(false);
    const [switchs, setSwitchs] = useState([false, false, false, false, false, false, false]);
    const danger_zone = "/photo_icons/For_setting/danger_zone.png"; // Assuming this path exists or matches the pattern

    const toggleSwitch = (index) => {
        setSwitchs(prev => prev.map((item, i) => i === index ? !item : item));
    }
    useEffect(() => {
        const updateThemeState = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };
        updateThemeState();

        const observer = new MutationObserver(updateThemeState);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

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
                                <Link to={to} className="Breadcrumbs">
                                    {t(`setting.${translationKey}`, value.replace("_", " "))}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </nav>

            <div className="Setting">
                <div className="header_setting">
                    <p>{t('setting.header', 'Settings')}</p>
                    <div className="search_page_setting">
                        <img src={isDarkMode ? search.white : search.black}
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
                                className={`category-tag ${isActive ? 'active' : ''}`}
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                                style={isActive || isHovered ? { backgroundColor: isDarkMode ? "rgba(0, 137, 234, 0.35)" : "rgba(0, 137, 234, 0.20)" } : { backgroundColor: isDarkMode ? "#141414" : "#FFFFFF" }}
                            >
                                <img
                                    src={isActive || isHovered ? category.blue : (isDarkMode ? (category.white || category.black) : category.black)}
                                    alt={category.name}
                                    style={(!isActive && !isHovered && isDarkMode && !category.white) ? { filter: "brightness(0) invert(1)" } : {}}
                                />
                                <p style={isActive || isHovered ? { color: "#0089EA" } : { color: isDarkMode ? "#F0F0F0" : "#000000" }}>
                                    {t(`setting.${category.name.toLowerCase()}`, category.name)}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="Privacy_content">
                <div className="Privacy_visiblity">
                    <div className="Privacy_visiblity_header">
                        <h3>{t('setting.privacy_visiblity', 'Profile Visibility')}</h3>
                        <p>{t('setting.privacy_visiblity_content', 'Control who can see your profile and activity')}</p>
                    </div>
                    <div className="Privacy_visiblity_body">
                        <div className="Privacy_visiblity_option">
                            <input type="radio" name="privacy" id="public" defaultChecked />
                            <div className="Privacy_visiblity_option_left">
                                <img src="/photo_icons/For_setting/Globe_black.png" alt="Public"
                                    style={isDarkMode ? { filter: "brightness(0) invert(1)" } : {}} />
                                <label htmlFor="public">{t('setting.public', 'Public')}</label>
                            </div>
                        </div>
                        <div className="Privacy_visiblity_option">
                            <input type="radio" name="privacy" id="private" />
                            <div className="Privacy_visiblity_option_left">
                                <img src="/photo_icons/For_setting/private_black.png" alt="Private"
                                    style={isDarkMode ? { filter: "brightness(0) invert(1)" } : {}} />
                                <label htmlFor="private">{t('setting.private', 'Private')}</label>
                            </div>
                        </div>
                        <div className="Privacy_visiblity_option">
                            <input type="radio" name="privacy" id="only_me" />
                            <div className="Privacy_visiblity_option_left">
                                <img src="/photo_icons/For_setting/only_me_black.png" alt="only_me"
                                    style={isDarkMode ? { filter: "brightness(0) invert(1)" } : {}} />
                                <label htmlFor="only_me">{t('setting.only_me', 'Only me')}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Activity_status">
                    <div className="Activity_status_header">
                        <h3>{t('setting.activity_status', 'Activity Status')}</h3>
                        <p>{t('setting.activity_status_content', 'Manage what information is shared with the Learnova community.')}</p>
                    </div>
                    <div className="Activity_status_body">
                        <div className="Activity_status_option">
                            <div className="Activity_status_option_left">
                                <img src="/photo_icons/For_setting/progress_black.png" alt="Share courses"
                                    style={isDarkMode ? { filter: "brightness(0) invert(1)" } : {}} />
                                <div className="Activity_status_option_text">
                                    <h5>{t('setting.share_courses', 'Share Courses Progress')}</h5>
                                    <p>{t('setting.share_courses_description', 'Show your completion percentage on course leaderboards.')}</p>
                                </div>
                            </div>
                            <div className={`switch ${switchs[0] ? "on" : ""}`} onClick={() => toggleSwitch(0)}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="Activity_status_option">
                            <div className="Activity_status_option_left">
                                <img src="/photo_icons/For_setting/online_black.png" alt="Show Online"
                                    style={isDarkMode ? { filter: "brightness(0) invert(1)" } : {}} />
                                <div className="Activity_status_option_text">
                                    <h5>{t('setting.show_online', 'Show Online Status')}</h5>
                                    <p>{t('setting.show_online_description', 'Allow others to see when you are currently active.')}</p>
                                </div>
                            </div>
                            <div className={`switch ${switchs[1] ? "on" : ""}`} onClick={() => toggleSwitch(1)}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="Activity_status_option">
                            <div className="Activity_status_option_left">
                                <img src={isDarkMode ? search.white : search.black} alt="Search Engine Indexing" />
                                <div className="Activity_status_option_text">
                                    <h5>{t('setting.search_engine_indexing', 'Search Engine Indexing')}</h5>
                                    <p>{t('setting.search_engine_indexing_description', 'Allow search engines like Google to show your profile.')}</p>
                                </div>
                            </div>
                            <div className={`switch ${switchs[2] ? "on" : ""}`} onClick={() => toggleSwitch(2)}>
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Data_sharing">
                    <div className="Data_sharing_header">
                        <h3>{t('setting.data_sharing', 'Data Sharing')}</h3>
                        <p>{t('setting.data_sharing_description', 'Manage permissions for third-party integrations.')}</p>
                    </div>
                    <div className="Data_sharing_body">
                        <div className="Data_sharing_option">
                            <div className="Data_sharing_option_left">
                                <div className="Data_sharing_option_text">
                                    <h5>{t('setting.Learnova', 'Learnova')}</h5>
                                    <p>{t('setting.Learnova_description', 'Allow Learnova to show your profile.')}</p>
                                </div>
                            </div>
                            <div className={`switch ${switchs[3] ? "on" : ""}`} onClick={() => toggleSwitch(3)}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="Data_sharing_option">
                            <div className="Data_sharing_option_left">
                                <div className="Data_sharing_option_text">
                                    <h5>{t('setting.LinkedIn', 'LinkedIn')}</h5>
                                    <p>{t('setting.LinkedIn_description', 'Share certificates automatically.')}</p>
                                </div>
                            </div>
                            <div className={`switch ${switchs[4] ? "on" : ""}`} onClick={() => toggleSwitch(4)}>
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Danger_zone">
                    <div className="Danger_zone_header">
                        <img src="/photo_icons/For_setting/danger.png" alt="Danger Zone"
                            className="danger-icon" />
                        <div className="danger-icon-container">
                            <h3>{t('setting.danger_zone', 'Danger Zone')}</h3>
                            <p>{t('setting.danger_zone_description', 'Irreversible actions related to your account and data.')}</p>
                        </div>
                    </div>
                    <div className="Danger_zone_body">
                        <div className="Danger_zone_option">
                            <div className="Danger_zone_option_left">
                                <img src="/photo_icons/For_setting/download_black.png" alt="Download Data"
                                    style={isDarkMode ? { filter: "brightness(0) invert(1)" } : {}} />
                                <div className="Danger_zone_option_text">
                                    <h5>{t('setting.Download_Data', 'Download Data')}</h5>
                                    <p>{t('setting.Download_Data_description', 'Request a copy of your personal data, including course history.')}</p>
                                </div>
                            </div>
                            <button className="Danger_zone_button_white">
                                <img src="/photo_icons/For_setting/download_black2.png" alt="" />
                                {t('setting.Download_Data', 'Download Data')}
                            </button>
                        </div>
                        <div className="Danger_zone_option">
                            <div className="Danger_zone_option_left">
                                <img src="/photo_icons/For_setting/delete.png" alt="Delete Account" />
                                <div className="Danger_zone_option_text">
                                    <h5 style={{ color: "#FF4D4D" }}>{t('setting.Delete_Account', 'Delete Account')}</h5>
                                    <p>{t('setting.Delete_Account_description', 'Permanently remove your account and all data.')}</p>
                                </div>
                            </div>
                            <button className="Danger_zone_button_red">
                                <img src="/photo_icons/For_setting/delete2.png" alt="" />
                                {t('setting.Delete_Account', 'Delete Account')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page_actions_footer">
                <button className="btn_save">{t('setting.save', 'Save')}</button>
                <button className="btn_reset">{t('setting.reset', 'Reset')}</button>
                <button className="btn_cancel">{t('setting.cancel', 'Cancel')}</button>
            </div>
        </div>
    );
}

export default Privacy;