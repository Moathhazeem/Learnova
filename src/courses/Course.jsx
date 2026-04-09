import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../config/i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import './Course.css';
function Course() {
    const { t } = useTranslation();
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);
    const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains("dark"));

    useEffect(() => {
        const updateThemeState = () => {
            setIsDarkMode(document.body.classList.contains("dark"));
        };
        updateThemeState();

        const observer = new MutationObserver(updateThemeState);
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="course-page">
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
                        
                        return (
                            <span key={to} style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="breadcrumb-separator">
                                    {t("setting.breadcrumb_separator", ">")}
                                </span>
                                {isLast ? (
                                    <span className="current-page">
                                        {t(`setting.${translationKey}`, decodeURIComponent(value))}
                                    </span>
                                ) : (
                                    <Link to={to} className="Breadcrumbs">
                                        {t(`setting.${translationKey}`, decodeURIComponent(value))}
                                    </Link>
                                )}
                            </span>
                        );
                    })}
                </nav>

                <div className="course-content-placeholder" style={{ marginTop: '40px' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>{t("setting.course_details", "Course Details")}</h1>
                    <p className="course-name" style={{ fontSize: '20px', color: '#666363', marginTop: '10px' }}>
                        Adobe Illustrator Logo Design Course
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Course;
