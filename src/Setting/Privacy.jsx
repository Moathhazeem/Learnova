import React, { useState, useEffect } from 'react';
import './Privacy.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);

    const { t } = useTranslation();

    const checkMatch = (title, keywords) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return title.toLowerCase().includes(q) || keywords.some(k => k.toLowerCase().includes(q));
    };

    const showVisibilitySection = checkMatch("Profile Visibility", ["visibility", "public", "private", "connections", "search engine", "indexing", "allow indexing"]);
    const showSharingSection = checkMatch("Data Sharing & Analytics", ["data sharing", "analytics", "progress", "online status", "usage data", "share"]);
    const showPermissionsSection = checkMatch("Account Permissions", ["permissions", "third-party", "integrations", "linkedin", "core services", "sharing"]);
    const showDangerSection = checkMatch("Danger Zone", ["danger zone", "download data", "delete account", "remove"]);

    const hasAnyMatch = showVisibilitySection || showSharingSection || showPermissionsSection || showDangerSection;

    const categories = [
        { name: "Profile", path: "/Setting/Profile", black: "/photo_icons/For_setting/UserMaleBlack.png", white: "/photo_icons/For_setting/UserMaleWhite.png", blue: "/photo_icons/For_setting/UserMaleBlue.png" },
        { name: "Security", path: "/Setting/Security", black: "/photo_icons/For_setting/SecrityBlack.png", white: "/photo_icons/For_setting/SecrityWhite.png", blue: "/photo_icons/For_setting/SecrityBlue.png" },
        { name: "Preferences", path: "/Setting/Preferences", black: "/photo_icons/For_setting/PreferencesBlack.png", blue: "/photo_icons/For_setting/PreferencesBlue.png" },
        { name: "Privacy", path: "/Setting/Privacy", black: "/photo_icons/For_setting/PrivacyBlack.png", white: "/photo_icons/For_setting/PrivacyWhite.png", blue: "/photo_icons/For_setting/PrivacyBlue.png" },
        { name: "Notification", path: "/Setting/Notification", black: "/photo_icons/For_setting/NotificationBlack.png", white: "/photo_icons/For_setting/NotificationWhite.png", blue: "/photo_icons/For_setting/NotificationBlue.png" },
        { name: "Payment", path: "/Setting/Payment", black: "/photo_icons/For_setting/PaymentBlack.png", white: "/photo_icons/For_setting/PaymentWhite.png", blue: "/photo_icons/For_setting/PaymentBlue.png" },
    ];

    const [visibility, setVisibility] = useState('public');
    const [settings, setSettings] = useState({
        allowIndexing: false,
        shareUsageData: true,
        shareProgress: false,
        showOnline: true,
        linkedinCertificates: false,
        learnovaSharing: true
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleDownloadData = () => {
        const dummyData = {
            message: "Your profile data backup",
            timestamp: new Date().getFullYear().toString(),
            profile: {
                visibility: visibility,
                settings: settings
            }
        };
        const blob = new Blob([JSON.stringify(dummyData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'user-data-backup.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDeleteAccount = () => {
        localStorage.clear();
        sessionStorage.clear();
        setIsDeleteModalOpen(false);
        navigate('/log_in');
    };

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
            </div>

            <div className="Privacy_content">
                {/* 1. Profile Visibility Section */}
                {showVisibilitySection && (
                <div className="privacy-section-card">
                    <div className="privacy-section-header">
                        <h3>{t('setting.privacy_visiblity', 'Profile Visibility')}</h3>
                        <p className="privacy-section-desc">{t('setting.privacy_visiblity_content', 'Control who can see your profile and activity')}</p>
                    </div>

                    <div className="visibility-grid">
                        <div
                            className={`visibility-card ${visibility === 'public' ? 'active' : ''}`}
                            onClick={() => setVisibility('public')}
                        >
                            <div className="visibility-card-header">
                                <div className="visibility-icon-wrapper">
                                    <img src="/photo_icons/For_setting/Globe_black.png" alt="Public"
                                        style={isDarkMode ? { filter: "brightness(0) invert(1)" } : {}} />
                                </div>
                                <div className="visibility-radio-circle">
                                    <div className="visibility-radio-inner"></div>
                                </div>
                            </div>
                            <div className="visibility-card-content">
                                <h4>{t('setting.public', 'Public')}</h4>
                                <p>{t('setting.public_desc', 'Anyone can view your profile and course history. Visible to search engines.')}</p>
                            </div>
                        </div>

                        <div
                            className={`visibility-card ${visibility === 'private' ? 'active' : ''}`}
                            onClick={() => setVisibility('private')}
                        >
                            <div className="visibility-card-header">
                                <div className="visibility-icon-wrapper">
                                    <img src="/photo_icons/For_setting/private_black.png" alt="Private"
                                        style={isDarkMode ? { filter: "brightness(0) invert(1)" } : {}} />
                                </div>
                                <div className="visibility-radio-circle">
                                    <div className="visibility-radio-inner"></div>
                                </div>
                            </div>
                            <div className="visibility-card-content">
                                <h4>{t('setting.private', 'Private')}</h4>
                                <p>{t('setting.private_desc', 'Only you can view your progress and details. Hidden from search engines.')}</p>
                            </div>
                        </div>

                        <div
                            className={`visibility-card ${visibility === 'connections' ? 'active' : ''}`}
                            onClick={() => setVisibility('connections')}
                        >
                            <div className="visibility-card-header">
                                <div className="visibility-icon-wrapper">
                                    <img src="/photo_icons/For_setting/only_me_black.png" alt="Connections"
                                        style={isDarkMode ? { filter: "brightness(0) invert(1)" } : {}} />
                                </div>
                                <div className="visibility-radio-circle">
                                    <div className="visibility-radio-inner"></div>
                                </div>
                            </div>
                            <div className="visibility-card-content">
                                <h4>{t('setting.connections', 'Connections Only')}</h4>
                                <p>{t('setting.connections_desc', 'Only verified connections and instructors can view your profile details.')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="privacy-option-item mt-6">
                        <div className="privacy-option-left">
                            <div className="privacy-option-info">
                                <h5>{t('setting.search_engine_indexing', 'Allow Search Engine Indexing')}</h5>
                                <p>{t('setting.search_engine_indexing_description', 'Allow search engines like Google to show your profile in search results.')}</p>
                            </div>
                        </div>
                        <div
                            className={`switch-ios ${settings.allowIndexing ? 'on' : ''}`}
                            onClick={() => toggleSetting('allowIndexing')}
                        >
                            <div className="switch-ios-circle"></div>
                        </div>
                    </div>
                </div>
                )}

                {/* 2. Data Sharing & Analytics Section */}
                {showSharingSection && (
                <div className="privacy-section-card">
                    <div className="privacy-section-header">
                        <h3>{t('setting.data_sharing_analytics', 'Data Sharing & Analytics')}</h3>
                        <p className="privacy-section-desc">{t('setting.data_sharing_analytics_desc', 'Manage how your learning statistics are shared and utilized.')}</p>
                    </div>

                    <div className="privacy-options-list">
                        <div className="privacy-option-item">
                            <div className="privacy-option-left">
                                <div className="privacy-option-info">
                                    <h5>{t('setting.share_courses', 'Share Courses Progress')}</h5>
                                    <p>{t('setting.share_courses_description', 'Show your completion percentage and achievements on public leaderboards.')}</p>
                                </div>
                            </div>
                            <div
                                className={`switch-ios ${settings.shareProgress ? 'on' : ''}`}
                                onClick={() => toggleSetting('shareProgress')}
                            >
                                <div className="switch-ios-circle"></div>
                            </div>
                        </div>

                        <div className="privacy-option-item">
                            <div className="privacy-option-left">
                                <div className="privacy-option-info">
                                    <h5>{t('setting.show_online', 'Show Online Status')}</h5>
                                    <p>{t('setting.show_online_description', 'Allow your peer students to see when you are currently active.')}</p>
                                </div>
                            </div>
                            <div
                                className={`switch-ios ${settings.showOnline ? 'on' : ''}`}
                                onClick={() => toggleSetting('showOnline')}
                            >
                                <div className="switch-ios-circle"></div>
                            </div>
                        </div>

                        <div className="privacy-option-item">
                            <div className="privacy-option-left">
                                <div className="privacy-option-info">
                                    <h5>{t('setting.share_usage_data', 'Share Usage Data')}</h5>
                                    <p>{t('setting.share_usage_data_desc', 'Help us improve Learnova by sending anonymous diagnostic and usage telemetry.')}</p>
                                </div>
                            </div>
                            <div
                                className={`switch-ios ${settings.shareUsageData ? 'on' : ''}`}
                                onClick={() => toggleSetting('shareUsageData')}
                            >
                                <div className="switch-ios-circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {/* 3. Account Permissions Section */}
                {showPermissionsSection && (
                <div className="privacy-section-card">
                    <div className="privacy-section-header">
                        <h3>{t('setting.account_permissions', 'Account Permissions')}</h3>
                        <p className="privacy-section-desc">{t('setting.account_permissions_desc', 'Control permissions for third-party platforms and integrations.')}</p>
                    </div>

                    <div className="privacy-options-list">
                        <div className="privacy-option-item">
                            <div className="privacy-option-left">
                                <div className="privacy-option-info">
                                    <h5>{t('setting.Learnova', 'Learnova Core Services')}</h5>
                                    <p>{t('setting.Learnova_description', 'Allow essential background services to customize and recommend courses.')}</p>
                                </div>
                            </div>
                            <div
                                className={`switch-ios ${settings.learnovaSharing ? 'on' : ''}`}
                                onClick={() => toggleSetting('learnovaSharing')}
                            >
                                <div className="switch-ios-circle"></div>
                            </div>
                        </div>

                        <div className="privacy-option-item">
                            <div className="privacy-option-left">
                                <div className="privacy-option-info">
                                    <h5>{t('setting.LinkedIn', 'LinkedIn Integration')}</h5>
                                    <p>{t('setting.LinkedIn_description', 'Share credentials and certificates automatically to your LinkedIn feed.')}</p>
                                </div>
                            </div>
                            <div
                                className={`switch-ios ${settings.linkedinCertificates ? 'on' : ''}`}
                                onClick={() => toggleSetting('linkedinCertificates')}
                            >
                                <div className="switch-ios-circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {/* Danger Zone Section */}
                {showDangerSection && (
                <div className="privacy-section-card danger-card">
                    <div className="privacy-section-header danger-header">
                        <div className="danger-title-wrapper">
                            <img src="/photo_icons/For_setting/danger.png" alt="Danger Zone" className="danger-icon" />
                            <h3>{t('setting.danger_zone', 'Danger Zone')}</h3>
                        </div>
                        <p className="privacy-section-desc">{t('setting.danger_zone_description', 'Irreversible actions related to your account security and data privacy.')}</p>
                    </div>

                    <div className="privacy-options-list">
                        <div className="privacy-option-item no-border">
                            <div className="privacy-option-left">
                                <img src="/photo_icons/For_setting/download_black.png" alt="Download Data"
                                    style={isDarkMode ? { filter: "brightness(0) invert(1)" } : {}} className="danger-option-icon" />
                                <div className="privacy-option-info">
                                    <h5>{t('setting.Download_Data', 'Download Data')}</h5>
                                    <p>{t('setting.Download_Data_description', 'Request a copy of your personal data, including course history and transcripts.')}</p>
                                </div>
                            </div>
                            <button className="Danger_zone_button_white" onClick={handleDownloadData}>
                                <img src="/photo_icons/For_setting/download_black2.png" alt="" />
                                {t('setting.Download_Data', 'Download Data')}
                            </button>
                        </div>

                        <div className="privacy-option-item no-border">
                            <div className="privacy-option-left">
                                <img src="/photo_icons/For_setting/delete.png" alt="Delete Account" className="danger-option-icon" />
                                <div className="privacy-option-info">
                                    <h5 style={{ color: "#FF4D4D" }}>{t('setting.Delete_Account', 'Delete Account')}</h5>
                                    <p>{t('setting.Delete_Account_description', 'Permanently remove your account and all associated data. This action cannot be undone.')}</p>
                                </div>
                            </div>
                            <button className="Danger_zone_button_red" onClick={() => setIsDeleteModalOpen(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="btn-trash-icon">
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                                {t('setting.Delete_Account', 'Delete Account')}
                            </button>
                        </div>
                    </div>
                </div>
                )}

                {!hasAnyMatch && (
                     <div className="no-results-found" style={{ textAlign: 'center', padding: '40px 20px', color: '#888' }}>
                         <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>No settings match your search</p>
                         <p style={{ fontSize: '14px' }}>Try searching for something else on this page.</p>
                     </div>
                )}
            </div>

            <div className="page_actions_footer">
                <button className="btn_save">{t('setting.save', 'Save Changes')}</button>
                <button className="btn_reset">{t('setting.reset', 'Reset Defaults')}</button>
                <button className="btn_cancel">{t('setting.cancel', 'Cancel')}</button>
            </div>

            {isDeleteModalOpen && (
                <div className="privacy-modal-overlay" onClick={() => setIsDeleteModalOpen(false)}>
                    <div className="privacy-modal-card" onClick={e => e.stopPropagation()}>
                        <div className="privacy-modal-header">
                            <img src="/photo_icons/For_setting/danger.png" alt="Warning" className="privacy-modal-warning-icon" />
                            <h4>{t('setting.delete_modal_title', 'Delete Account')}</h4>
                        </div>
                        <div className="privacy-modal-body">
                            <p>{t('setting.delete_modal_warning', 'Are you sure you want to delete your account? This action cannot be undone.')}</p>
                        </div>
                        <div className="privacy-modal-footer">
                            <button className="privacy-modal-btn-cancel" onClick={() => setIsDeleteModalOpen(false)}>
                                {t('setting.cancel', 'Cancel')}
                            </button>
                            <button className="privacy-modal-btn-delete" onClick={handleDeleteAccount}>
                                {t('setting.confirm_delete', 'Yes, Delete')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Privacy;