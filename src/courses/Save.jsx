import React from "react";
// 1. تصحيح الـ Imports من react-i18next
import { useTranslation } from 'react-i18next';
// 2. دمج imports الـ react-router-dom في سطر واحد
import { useNavigate, Link, useLocation } from "react-router-dom";
// 3. تغيير ChevronLeft إلى ChevronRight لتطابق الاستخدام في الأسفل
import { ChevronRight, Bookmark } from "lucide-react";
import "./Save.css";

function Save() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname.split('/').filter(x => x);
    const { t } = useTranslation();
    return (
        <div className="Save-page">
            <div className="Save-container">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs-nav">
                    <Link to="/Home" className="Breadcrumbs">
                        {t('setting.home', 'Home')}
                    </Link>
                    {pathname.map((value, index) => {
                        const to = '/' + pathname.slice(0, index + 1).join('/');
                        const isLast = index === pathname.length - 1;
                        const translationKey = value.toLowerCase().replace('%20', '_').replace(' ', '_');
                        const fallbackText = decodeURIComponent(value).replace(/[_-]/g, ' ');
                        if (value.toLowerCase() === 'home') return null;
                        return (
                            <span key={to} style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="breadcrumb-separator"><ChevronRight size={14} /></span>
                                {isLast ? (
                                    <span className="current-page">{t(`setting.${translationKey}`, fallbackText)}</span>
                                ) : (
                                    <Link to={to} className="Breadcrumbs">{t(`setting.${translationKey}`, fallbackText)}</Link>
                                )}
                            </span>
                        );
                    })}
                </nav>
                <div className="Save-main">
                    <div className="save-header-container">
                        {/* الأيقونة الزرقاء من lucide-react */}
                        <div className="save-icon-wrapper">
                            <Bookmark size={28} className="bookmark-icon" />
                        </div>

                        {/* النصوص والوصف */}
                        <div className="save-text-content">
                            <h1 className="save-title">{t('setting.save_courses', 'Save Courses')}</h1>
                            <p className="save-subtitle">
                                {t('setting.manage_journey', 'Manage your learning journey. You have ')}
                                <span className="saved-count">3</span>
                                {t('setting.items_saved', ' items saved.')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Save;