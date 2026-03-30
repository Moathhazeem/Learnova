import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../config/i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import './Notification.css';
function Notification() {
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
                                <span
                                    className="category-name"
                                    style={{
                                        color: isActive || isHovered ? "#0089EA" : (isDarkMode ? "#FFFFFF" : "#000000")
                                    }}
                                >
                                    {t(`setting.${category.name.toLowerCase()}`, category.name)}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                <div className="Setting_content">
                    <div className="notification_content">
                        <div className="notification_header">
                            <div className="notification_header_left">
                                <img src="/photo_icons/For_setting/NotificationBlack.png" alt="notification" />
                                <p>{t('setting.notification', 'Notifications')}</p>
                            </div>
                        </div>
                        <div className="Disturb_content">
                            <div className="Disturb_content_left">
                                <img src="/photo_icons/For_setting/Do_Not_Disturb.png" alt="notification" />
                                <div className="Disturb_content_right">
                                    <h4>{t('setting.notification_content_right_title', 'Do Not Disturb')}</h4>
                                    <p>{t('setting.notification_content_right_description', 'Mute notifications temporarily')}</p>
                                </div>
                            </div>
                            <div className={`switch ${switchs[0] ? "on" : "off"}`} onClick={() => toggleSwitch(0)}>
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="Email_Notifications">
                            <div className="Email_Notifications_header">
                                <img src="/photo_icons/For_setting/email_black.png" alt="notification" />
                                <h4>{t('setting.Email_Notifications_title', 'Email Notifications')}</h4>
                            </div>
                            <div className="Email_Notifications_content">
                                <img src="/photo_icons/For_setting/new_courses.png" alt="notification" />
                                <div className="Email_Notifications_content_left">
                                    <p>{t('setting.New Courses', 'New Courses')}</p>
                                    <p>{t('setting.New Courses Description', 'Get notified when new courses are available')}</p>
                                </div>
                                <div className={`switch ${switchs[1] ? "on" : "off"}`} onClick={() => toggleSwitch(1)}>
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="Email_Notifications_content">
                                <img src="/photo_icons/For_setting/Course_Updates.png" alt="notification" />
                                <div className="Email_Notifications_content_left">
                                    <p>{t('setting.Course Updates', 'Course Updates')}</p>
                                    <p>{t('setting.Course Updates Description', 'Receive updates when new lessons or courses are available')}</p>
                                </div>
                                <div className={`switch ${switchs[2] ? "on" : "off"}`} onClick={() => toggleSwitch(2)}>
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="Email_Notifications_content">
                                <img src="/photo_icons/For_setting/Assignment_Deadlines.png" alt="notification" />
                                <div className="Email_Notifications_content_left">
                                    <p>{t('setting.Assignment Deadlines', 'Assignment Deadlines')}</p>
                                    <p>{t('setting.Assignment Deadlines Description', 'Reminders for upcoming assignment deadlines')}</p>
                                </div>
                                <div className={`switch ${switchs[3] ? "on" : "off"}`} onClick={() => toggleSwitch(3)}>
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="Email_Notifications_content">
                                <img src="/photo_icons/For_setting/Discussion_Replies.png" alt="notification" />
                                <div className="Email_Notifications_content_left">
                                    <p>{t('setting.Discussion Replies', 'Discussion Replies')}</p>
                                    <p>{t('setting.Discussion Replies Description', 'When someone replies to your discussion posts')}</p>
                                </div>
                                <div className={`switch ${switchs[4] ? "on" : "off"}`} onClick={() => toggleSwitch(4)}>
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="Email_Notifications_content">
                                <img src="/photo_icons/For_setting/Marketing_Promotions.png" alt="notification" />
                                <div className="Email_Notifications_content_left">
                                    <p>{t('setting.Marketing & Promotions', 'Marketing & Promotions')}</p>
                                    <p>{t('setting.Marketing & Promotions Description', 'News about special offers and course recommendations')}</p>
                                </div>
                                <div className={`switch ${switchs[5] ? "on" : "off"}`} onClick={() => toggleSwitch(5)}>
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="Email_Notifications_content">
                                <img src="/photo_icons/For_setting/Achievements_Certificates.png" alt="notification" />
                                <div className="Email_Notifications_content_left">
                                    <p>{t('setting.Achievements & Certificates', 'Achievements & Certificates')}</p>
                                    <p>{t('setting.Achievements & Certificates Description', 'Be notified when you complete a course or earn a badge')}</p>
                                </div>
                                <div className={`switch ${switchs[6] ? "on" : "off"}`} onClick={() => toggleSwitch(6)}>
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>



                        <div className="Push_Notifications">
                            <div className="Push_Notfifcation_header">
                                <img src="/photo_icons/For_setting/Push_Notifications.png" alt="notification" />
                                <h4>{t('setting.Push_Notifications_title', 'Push Notifications')}</h4>
                            </div>
                            <div className="Push_Notfifcation_content">
                                <img src="/photo_icons/For_setting/new_courses.png" alt="notification" />
                                <div className="Push_Notfifcation_content_left">
                                    <p>{t('setting.New Courses', 'New Courses')}</p>
                                    <p>{t('setting.New Courses Description', 'Get notified when new courses are available')}</p>
                                </div>
                                <div className={`switch ${switchs[1] ? "on" : "off"}`} onClick={() => toggleSwitch(1)}>
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="Push_Notfifcation_content">
                                <img src="/photo_icons/For_setting/Course_Updates.png" alt="notification" />
                                <div className="Push_Notfifcation_content_left">
                                    <p>{t('setting.Course Updates', 'Course Updates')}</p>
                                    <p>{t('setting.Course Updates Description', 'Receive updates when new lessons or courses are available')}</p>
                                </div>
                                <div className={`switch ${switchs[2] ? "on" : "off"}`} onClick={() => toggleSwitch(2)}>
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="Push_Notfifcation_content">
                                <img src="/photo_icons/For_setting/Assignment_Deadlines.png" alt="notification" />
                                <div className="Push_Notfifcation_content_left">
                                    <p>{t('setting.Assignment Deadlines', 'Assignment Deadlines')}</p>
                                    <p>{t('setting.Assignment Deadlines Description', 'Reminders for upcoming assignment deadlines')}</p>
                                </div>
                                <div className={`switch ${switchs[3] ? "on" : "off"}`} onClick={() => toggleSwitch(3)}>
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="Push_Notfifcation_content">
                                <img src="/photo_icons/For_setting/Discussion_Replies.png" alt="notification" />
                                <div className="Push_Notfifcation_content_left">
                                    <p>{t('setting.Discussion Replies', 'Discussion Replies')}</p>
                                    <p>{t('setting.Discussion Replies Description', 'When someone replies to your discussion posts')}</p>
                                </div>
                                <div className={`switch ${switchs[4] ? "on" : "off"}`} onClick={() => toggleSwitch(4)}>
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="Push_Notfifcation_content">
                                <img src="/photo_icons/For_setting/Marketing_Promotions.png" alt="notification" />
                                <div className="Push_Notfifcation_content_left">
                                    <p>{t('setting.Marketing & Promotions', 'Marketing & Promotions')}</p>
                                    <p>{t('setting.Marketing & Promotions Description', 'News about special offers and course recommendations')}</p>
                                </div>
                                <div className={`switch ${switchs[5] ? "on" : "off"}`} onClick={() => toggleSwitch(5)}>
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="Push_Notfifcation_content">
                                <img src="/photo_icons/For_setting/Achievements_Certificates.png" alt="notification" />
                                <div className="Push_Notfifcation_content_left">
                                    <p>{t('setting.Achievements & Certificates', 'Achievements & Certificates')}</p>
                                    <p>{t('setting.Achievements & Certificates Description', 'Be notified when you complete a course or earn a badge')}</p>
                                </div>
                                <div className={`switch ${switchs[6] ? "on" : "off"}`} onClick={() => toggleSwitch(6)}>
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Notification;