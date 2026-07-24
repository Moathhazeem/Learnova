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

    const checkMatch = (title, keywords) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return title.toLowerCase().includes(q) || keywords.some(k => k.toLowerCase().includes(q));
    };

    const showSystemAlerts = checkMatch("System Alerts", ["system alerts", "do not disturb", "dnd", "quiet hours", "schedule"]);
    const showEngagement = checkMatch("Engagement & Growth", ["engagement", "growth", "new courses", "course updates", "assignment deadlines", "discussion replies"]);
    const showMarketing = checkMatch("Marketing & Achievement", ["marketing", "promotions", "offers", "achievements", "certificates", "badges"]);

    const hasAnyMatch = showSystemAlerts || showEngagement || showMarketing;

    const categories = [
        { name: "Profile", path: "/Setting/Profile", black: "/photo_icons/For_setting/UserMaleBlack.png", white: "/photo_icons/For_setting/UserMaleWhite.png", blue: "/photo_icons/For_setting/UserMaleBlue.png" },
        { name: "Security", path: "/Setting/Security", black: "/photo_icons/For_setting/SecrityBlack.png", white: "/photo_icons/For_setting/SecrityWhite.png", blue: "/photo_icons/For_setting/SecrityBlue.png" },
        { name: "Preferences", path: "/Setting/Preferences", black: "/photo_icons/For_setting/PreferencesBlack.png", blue: "/photo_icons/For_setting/PreferencesBlue.png" },
        { name: "Privacy", path: "/Setting/Privacy", black: "/photo_icons/For_setting/PrivacyBlack.png", white: "/photo_icons/For_setting/PrivacyWhite.png", blue: "/photo_icons/For_setting/PrivacyBlue.png" },
        { name: "Notification", path: "/Setting/Notification", black: "/photo_icons/For_setting/NotificationBlack.png", white: "/photo_icons/For_setting/NotificationWhite.png", blue: "/photo_icons/For_setting/NotificationBlue.png" },
        { name: "Payment", path: "/Setting/Payment", black: "/photo_icons/For_setting/PaymentBlack.png", white: "/photo_icons/For_setting/PaymentWhite.png", blue: "/photo_icons/For_setting/PaymentBlue.png" },
    ];
    const [settings, setSettings] = useState({
        dnd: false,
        newCourses: true,
        courseUpdates: true,
        assignmentDeadlines: true,
        discussionReplies: false,
        marketingPromotions: false,
        achievementsCertificates: true
    });
    const [initialSettings, setInitialSettings] = useState({
        dnd: false,
        newCourses: true,
        courseUpdates: true,
        assignmentDeadlines: true,
        discussionReplies: false,
        marketingPromotions: false,
        achievementsCertificates: true
    });
    const [showToast, setShowToast] = useState(false);
    const [showDndModal, setShowDndModal] = useState(false);

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setInitialSettings({ ...settings });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const hasChanges = Object.keys(settings).some(key => settings[key] !== initialSettings[key]);

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
                        <input
                            type="search"
                            placeholder={t('setting.search', 'Search settings')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
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
                                style={isActive || isHovered ? { backgroundColor: "#0089EA" } : { backgroundColor: "#FFFFFF" }}
                            >
                                <img
                                    src={isActive || isHovered ? category.blue : category.black}
                                    alt={category.name}
                                    style={isActive || isHovered ? { filter: "brightness(0) invert(1)" } : { filter: "none" }}
                                />
                                <p style={isActive || isHovered ? { color: "#FFFFFF" } : { color: "#000000" }}>
                                    {t(`setting.${category.name.toLowerCase()}`, category.name)}
                                </p>
                            </Link>
                        );
                    })}
                </div>

                <div className="Setting_content">
                    <div className="notification_redesign_wrapper">
                        {/* Benefit-driven Header & Introduction */}
                        <div className="notification_intro_section">
                            <div className="notification_title_group">
                                <img src="/photo_icons/For_setting/notification.png" alt="notification" className="main-notification-icon" />
                                <h2>{t('setting.new_title', 'Stay Updated & Never Miss a Beat')}</h2>
                            </div>
                            <p className="notification_intro_text">
                                {t('setting.intro_text', 'Customize your notification preferences to get timely updates about what matters most to you. We promise to keep you informed, not overwhelmed.')}
                            </p>
                        </div>

                        {/* Card 1: System Alerts (Do Not Disturb) */}
                        {showSystemAlerts && (
                        <>
                        <section className="notification_card system_alerts_card" aria-labelledby="system-alerts-heading">
                            <div className="card_header">
                                <h3 id="system-alerts-heading">{t('setting.system_alerts_title', 'System Alerts')}</h3>
                                <span className="card_badge alert_badge">{t('setting.important_badge', 'Priority')}</span>
                            </div>
                            <div className="setting_row">
                                <div className="setting_info">
                                    <div className="setting_label_group">
                                        <img src="/photo_icons/For_setting/Do_Not_Disturb.png" alt="Do Not Disturb" className="setting_row_icon" />
                                        <div>
                                            <h4>{t('setting.dnd_title', 'Do Not Disturb')}</h4>
                                            <p className="setting_description">
                                                {t('setting.dnd_desc', 'Mute notifications temporarily -> Focus deeply when you need quiet hours.')}
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        className="cta_button dnd_schedule_cta" 
                                        onClick={() => setShowDndModal(true)}
                                    >
                                        {t('setting.dnd_cta', "Review 'Do Not Disturb' Schedule")}
                                    </button>
                                </div>
                                <div 
                                    className={`modern-switch-container ${settings.dnd ? "active" : ""}`}
                                    onClick={() => toggleSetting('dnd')}
                                >
                                    <div className="modern-switch-track">
                                        <div className="modern-switch-thumb"></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="card_divider"></div>
                        </>
                        )}

                        {/* Card 2: Engagement & Growth */}
                        {showEngagement && (
                        <>
                        <section className="notification_card engagement_growth_card" aria-labelledby="engagement-growth-heading">
                            <div className="card_header">
                                <h3 id="engagement-growth-heading">{t('setting.engagement_growth_title', 'Engagement & Growth')}</h3>
                            </div>
                            
                            <div className="card_settings_list">
                                {/* New Courses */}
                                <div className="setting_row">
                                    <div className="setting_label_group">
                                        <img src="/photo_icons/For_setting/new_courses.png" alt="New Courses" className="setting_row_icon" />
                                        <div>
                                            <h4>{t('setting.new_courses_title', 'New Courses')}</h4>
                                            <p className="setting_description">
                                                {t('setting.new_courses_desc', 'Get notified when new courses are available -> Be the first to enroll in the latest content.')}
                                            </p>
                                        </div>
                                    </div>
                                    <div 
                                        className={`modern-switch-container ${settings.newCourses ? "active" : ""}`}
                                        onClick={() => toggleSetting('newCourses')}
                                    >
                                        <div className="modern-switch-track">
                                            <div className="modern-switch-thumb"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Updates */}
                                <div className="setting_row">
                                    <div className="setting_label_group">
                                        <img src="/photo_icons/For_setting/Course_Updates.png" alt="Course Updates" className="setting_row_icon" />
                                        <div>
                                            <h4>{t('setting.course_updates_title', 'Course Updates')}</h4>
                                            <p className="setting_description">
                                                {t('setting.course_updates_desc', 'Receive updates when new lessons or courses are available -> Stay up to date with fresh content in your active courses.')}
                                            </p>
                                        </div>
                                    </div>
                                    <div 
                                        className={`modern-switch-container ${settings.courseUpdates ? "active" : ""}`}
                                        onClick={() => toggleSetting('courseUpdates')}
                                    >
                                        <div className="modern-switch-track">
                                            <div className="modern-switch-thumb"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Assignment Deadlines */}
                                <div className="setting_row">
                                    <div className="setting_label_group">
                                        <img src="/photo_icons/For_setting/Assignment_Deadlines.png" alt="Assignment Deadlines" className="setting_row_icon" />
                                        <div>
                                            <h4>{t('setting.assignment_deadlines_title', 'Assignment Deadlines')}</h4>
                                            <p className="setting_description">
                                                {t('setting.assignment_deadlines_desc', 'Reminders for upcoming assignment deadlines -> Keep on track and never miss a submission window.')}
                                            </p>
                                        </div>
                                    </div>
                                    <div 
                                        className={`modern-switch-container ${settings.assignmentDeadlines ? "active" : ""}`}
                                        onClick={() => toggleSetting('assignmentDeadlines')}
                                    >
                                        <div className="modern-switch-track">
                                            <div className="modern-switch-thumb"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Discussion Replies */}
                                <div className="setting_row">
                                    <div className="setting_label_group">
                                        <img src="/photo_icons/For_setting/Discussion_Replies.png" alt="Discussion Replies" className="setting_row_icon" />
                                        <div>
                                            <h4>{t('setting.discussion_replies_title', 'Discussion Replies')}</h4>
                                            <p className="setting_description">
                                                {t('setting.discussion_replies_desc', 'When someone replies to your discussion posts -> Keep the conversation going and connect with peers.')}
                                            </p>
                                        </div>
                                    </div>
                                    <div 
                                        className={`modern-switch-container ${settings.discussionReplies ? "active" : ""}`}
                                        onClick={() => toggleSetting('discussionReplies')}
                                    >
                                        <div className="modern-switch-track">
                                            <div className="modern-switch-thumb"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="card_divider"></div>
                        </>
                        )}

                        {/* Card 3: Marketing & Achievement */}
                        {showMarketing && (
                        <section className="notification_card marketing_achievement_card" aria-labelledby="marketing-achievement-heading">
                            <div className="card_header">
                                <h3 id="marketing-achievement-heading">{t('setting.marketing_achievement_title', 'Marketing & Achievement')}</h3>
                            </div>
                            
                            <div className="card_settings_list">
                                {/* Marketing & Promotions */}
                                <div className="setting_row">
                                    <div className="setting_label_group">
                                        <img src="/photo_icons/For_setting/Marketing_Promotions.png" alt="Marketing & Promotions" className="setting_row_icon" />
                                        <div>
                                            <h4>{t('setting.marketing_promotions_title', 'Marketing & Promotions')}</h4>
                                            <p className="setting_description">
                                                {t('setting.marketing_promotions_desc', 'News about special offers and course recommendations -> Unlock exclusive discounts and stay ahead with special offers.')}
                                            </p>
                                        </div>
                                    </div>
                                    <div 
                                        className={`modern-switch-container ${settings.marketingPromotions ? "active" : ""}`}
                                        onClick={() => toggleSetting('marketingPromotions')}
                                    >
                                        <div className="modern-switch-track">
                                            <div className="modern-switch-thumb"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Achievements & Certificates */}
                                <div className="setting_row">
                                    <div className="setting_label_group">
                                        <img src="/photo_icons/For_setting/Achievements_Certificates.png" alt="Achievements & Certificates" className="setting_row_icon" />
                                        <div>
                                            <h4>{t('setting.achievements_certificates_title', 'Achievements & Certificates')}</h4>
                                            <p className="setting_description">
                                                {t('setting.achievements_certificates_desc', 'Be notified when you complete a course or earn a badge -> Celebrate your milestones and share your success.')}
                                            </p>
                                        </div>
                                    </div>
                                    <div 
                                        className={`modern-switch-container ${settings.achievementsCertificates ? "active" : ""}`}
                                        onClick={() => toggleSetting('achievementsCertificates')}
                                    >
                                        <div className="modern-switch-track">
                                            <div className="modern-switch-thumb"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        )}

                        {!hasAnyMatch && (
                            <div className="no-results-found" style={{ textAlign: 'center', padding: '40px 20px', color: '#888' }}>
                                <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>No settings match your search</p>
                                <p style={{ fontSize: '14px' }}>Try searching for something else on this page.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Action Button for saving changes */}
            <div className={`fab-save-container ${hasChanges ? 'visible' : ''}`}>
                <button className="fab-save-button" onClick={handleSave}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                    </svg>
                    <span>{t('setting.save_all_changes', 'Save All Changes')}</span>
                </button>
            </div>

            {/* Success Toast */}
            <div className={`toast-notification ${showToast ? 'show' : ''}`}>
                <div className="toast-content">
                    <svg viewBox="0 0 24 24" width="20" height="20" className="toast-success-icon">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>{t('setting.save_success_msg', 'Your preferences have been successfully updated!')}</span>
                </div>
            </div>

            {/* Simulated DND Schedule Modal */}
            {showDndModal && (
                <div className="modal-backdrop" onClick={() => setShowDndModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{t('setting.dnd_modal_title', 'Do Not Disturb Schedule')}</h3>
                            <button className="close-modal-btn" onClick={() => setShowDndModal(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>{t('setting.dnd_modal_desc', 'Define quiet hours where notifications will be silenced automatically.')}</p>
                            <div className="time-select-group">
                                <div className="time-select">
                                    <label>{t('setting.dnd_from', 'From')}</label>
                                    <input type="time" defaultValue="22:00" />
                                </div>
                                <div className="time-select">
                                    <label>{t('setting.dnd_to', 'To')}</label>
                                    <input type="time" defaultValue="07:00" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn secondary" onClick={() => setShowDndModal(false)}>{t('setting.cancel', 'Cancel')}</button>
                            <button className="modal-btn primary" onClick={() => setShowDndModal(false)}>{t('setting.save', 'Apply')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Notification;