import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../config/i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import './Course.css';
import { PlayCircle, ShieldCheck, Monitor, Award, Heart, Share2 } from 'lucide-react';
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

                <div className="course-content" >
                    <div className="course-content-left">
                        <div className="course-content-left-header">
                            <h3>{t("courses.Adobe_Illustrator_Logo_Design_Course", "Adobe Illustrator Logo Design Course")}</h3>
                            <p>{t("courses.Adobe_Illustrator_Logo_Design_Course_description", "This course gives you a practical,no-nonsense path to designing professional logos using Adobe Illustrator. You will learn how to build clean, scalable, and modern logos from scratch, starting with basic vector tools and moving toward full brand-ready designs. The focus is on real skills—concept creation, shape building, typography, color theory, and exporting final files for clients.")}</p>
                        </div>
                        <div className="course-content-left-body">
                            <p className="name_teacher">Create by <Link to="/teacher" style={{ color: "#0089EA", textDecoration: "underline" }}>Dimitri Abdelhakim</Link></p>
                            <p className="date">Last updated 1 / 1 / 2025</p>
                            <p className="language_speak"><img src="" alt="" /> English , <p style={{ color: "#0089EA", textDecoration: "underline" }}>26 more</p></p>
                            <p className="language_word"><img src="" alt="" /> English , <p style={{ color: "#0089EA", textDecoration: "underline" }}>26 more</p></p>
                        </div>
                    </div>
                    <div className="course-content-right">
                        <div className="course-card-sticky">
                            <div className="card-course">
                                <div className="card-image-container">
                                    <img src="/Photo/Adobe Illustrator logo design.png" alt="Course logo design by Illustrator" />
                                    <div className="overlay-play">
                                        <PlayCircle size={48} color="white" strokeWidth={1.5} />
                                        <span>{t("courses.preview_course", "Preview this course")}</span>
                                    </div>
                                </div>
                                <div className="card_body">
                                    <div className="price-section">
                                        <span className="current-price">50$</span>
                                        <span className="original-price">100$</span>
                                        <span className="discount-badge">50% OFF</span>
                                    </div>

                                    <div className="card_body_buttons">
                                        <button className="Add_to_cart">{t("courses.add_to_cart", "Add to Cart")}</button>
                                        <button className="love-btn">
                                            <Heart size={24} />
                                        </button>
                                    </div>
                                    <button className="buy_now">{t("courses.buy_now", "Buy Now")}</button>
                                    
                                    <p className="guarantee">
                                        <ShieldCheck size={16} />
                                        {t("courses.guarantee", "30-Day Money-Back Guarantee")}
                                    </p>

                                    <div className="include-course">
                                        <h4>{t("courses.include_course", "This course includes:")}</h4>
                                        <ul className="include-list">
                                            <li>
                                                <PlayCircle size={18} className="icon" />
                                                <span>{t("courses.houres", "1 hour on-demand video")}</span>
                                            </li>
                                            <li>
                                                <ShieldCheck size={18} className="icon" />
                                                <span>{t("courses.lifetime", "Complete lifetime access")}</span>
                                            </li>
                                            <li>
                                                <Monitor size={18} className="icon" />
                                                <span>{t("courses.access", "Access on mobile and TV")}</span>
                                            </li>
                                            <li>
                                                <Award size={18} className="icon" />
                                                <span>{t("courses.certificate", "Certificate of completion")}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div className="share-section">
                                        <button className="share-btn">{t("courses.share", "Share")}</button>
                                        <button className="coupon-btn">{t("courses.apply_coupon", "Apply Coupon")}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
export default Course;
