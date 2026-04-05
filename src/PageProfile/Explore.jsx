import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import "../config/i18n";
import "./Explore.css";

function Explore() {
    const pathname = location.pathname.split("/").filter((x) => x);
    const { t, i18n } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );
    const explore = [
        {
            id: 1,
            image: "/photo_icons/Healthcare.png",
            title: "Healthcare",
        },
        {
            id: 2,
            image: "/photo_icons/Computer Science.png",
            title: "Computer Science",
        },
        {
            id: 3,
            image: "/photo_icons/Data Science.png",
            title: "Data Science",
        },
        {
            id: 4,
            image: "/photo_icons/Artificial Intelligence.png",
            title: "Artificial Intelligence",
        },
        {
            id: 5,
            image: "/photo_icons/Business.png",
            title: "Business",
        },
        {
            id: 6,
            image: "/photo_icons/Marketing.png",
            title: "Marketing",
        },
        {
            id: 7,
            image: "/photo_icons/Graphic Design.png",
            title: "Graphic Design",
        },
        {
            id: 8,
            image: "/photo_icons/Web Development.png",
            title: "Web Development",
        },
        {
            id: 9,
            image: "/photo_icons/Game Development.png",
            title: "Game Development",
        },
        {
            id: 10,
            image: "/photo_icons/Mobile Development.png",
            title: "Mobile Development",
        },
        {
            id: 11,
            image: "/photo_icons/UIUX Design.png",
            title: "UI / UX Design",
        },
        {
            id: 12,
            image: "/photo_icons/3D Modeling & Animation.png",
            title: "3D Modeling & Animation",
        },
        {
            id: 13,
            image: "/photo_icons/Photography & Videography.png",
            title: "Photography & Videography",
        },
    ]
    return (
        <div className="explore">
            {/* Breadcrumbs */}
            <nav className="breadcrumbs-nav">
                <Link to="/Home" className="Breadcrumbs">
                    {t("setting.home", "Home")}
                </Link>
                {pathname.map((value, index) => {
                    const to = "/" + pathname.slice(0, index + 1).join("/");
                    const isLast = index === pathname.length - 1;
                    const translationKey =
                        value.toLowerCase() === "setting" ? "header" : value.toLowerCase();
                    return (
                        <span key={to}>
                            <span className="breadcrumb-separator">
                                {" "}
                                {t("setting.breadcrumb_separator", ">")}{" "}
                            </span>
                            {isLast ? (
                                <span className="current-page">
                                    {t(`setting.${translationKey}`, value.replace("%20", " "))}
                                </span>
                            ) : (
                                <Link to={to} className="Breadcrumbs">
                                    {t(`setting.${translationKey}`, value.replace("%20", " "))}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </nav>

            <div className="explore-container">
                <div className="explore-header">
                    <h1>Explore Courses</h1>
                    <p>Discover thousands of courses to start learning something new today</p>
                </div>
                <div className="explore-content">
                    {explore.map((item) => (
                        <button className="explore-item" key={item.id}>
                            <div className="explore-item-icon">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <p className="explore-item-text">{item.title}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Explore;