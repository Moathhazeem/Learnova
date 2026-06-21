import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronRight, Bell, MessageSquare as Message } from 'lucide-react';
import './Communication.css';

function Communication() {
    const { t } = useTranslation();
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);

    return (
        <div className="communication-page">
            <div className="container">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs-nav">
                    <Link to="/Home" className="Breadcrumbs">
                        {t("setting.home", "Home")}
                    </Link>
                    {pathname.map((value, index) => {
                        const to = "/" + pathname.slice(0, index + 1).join("/");
                        const isLast = index === pathname.length - 1;
                        const translationKey = value.toLowerCase().replace("%20", "_").replace(" ", "_");
                        const fallbackText = decodeURIComponent(value).replace(/[_-]/g, " ");
                        if (value.toLowerCase() === 'home') return null;

                        return (
                            <span key={to} style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="breadcrumb-separator">
                                    <ChevronRight size={14} />
                                </span>
                                {isLast ? (
                                    <span className="current-page">{t(`setting.${translationKey}`, fallbackText)}</span>
                                ) : (
                                    <Link to={to} className="Breadcrumbs">
                                        {t(`setting.${translationKey}`, fallbackText)}
                                    </Link>
                                )}
                            </span>
                        );
                    })}
                </nav>
                <div className="communication-content">
                    <div className="Header-communication">
                        <h1>{t("setting.Communication_Center", "Communication Center")}</h1>
                        <p>{t("setting.Communication_Center_description", "Stay updated with your courses and connect with instructors.")}</p>
                    </div>
                    <div className="body-communication">
                        <div className="Tabs-communication">

                            {/* تاب الإشعارات */}
                            <div className="Notification-Tab">
                                <div className="tab-content-wrapper">
                                    <div className="Tab-icon_Notification">
                                        <Bell size={20} /> {/* صغرت الحجم لـ 20 ليناسب التصميم */}
                                    </div>
                                    <div onClick={() => { }} className="Tab-communication">
                                        {t("Notifications", "Notifications")}
                                    </div>
                                </div>
                                <div className="Number_of_unread_Notifications">3</div>
                            </div>
                            {/* تاب الرسائل */}
                            <div className="Messages-Tab">
                                <div className="tab-content-wrapper">
                                    <div className="Tab-icon_Message">
                                        <Message size={20} />
                                    </div>
                                    <div onClick={() => { }} className="Tab-communication">
                                        {t("Messages", "Messages")}
                                    </div>
                                </div>
                                <div className="Number_of_unread_Messages">5</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Communication;