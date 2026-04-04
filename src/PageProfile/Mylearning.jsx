import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../config/i18n";
import "./Mylearning.css";

function MyLearning() {
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);
    const { t } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains("dark"));

    useEffect(() => {
        const updateThemeState = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };
        updateThemeState();

        const observer = new MutationObserver(updateThemeState);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    const courses = [
        {
            specialization: "IBM Full-Stack JavaScript Developer",
            title: "Introduction to Software Engineering",
            progress: 30,
            lastLesson: "Nov 14, 7:20 AM",
            providerLogo: "/photo_icons/IBM.png"
        },
        {
            courseCompany: "meta",
            courseName: "Introduction to HTML ,CSS , JavaScript",
            progress: 0,
            lastLesson: "He didn't start",
            providerLogo: "/photo_icons/meta.png"
        },
        {
            specialization: "IBM Data Analyst ",
            title: "Introduction to Data Analystics",
            progress: 100,
            lastLesson: "Complete Course",
            providerLogo: "/photo_icons/IBM.png"
        },
        {
            specialization: "Microsoft Data Analyst ",
            title: "Introduction to Excel",
            progress: 100,
            lastLesson: "Complete Course",
            providerLogo: "/photo_icons/microsoft.png"
        }
    ];

    const [filter, setFilter] = useState("all");

    const filteredCourses = courses.filter(course => {
        if (filter === "Completed") return course.progress === 100;
        if (filter === "In Progress") return course.progress < 100;
        return true;
    });

    return (
        <div className="my-learning-container">
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

            <div className="my-learning-content">
                <div className="learning-header">
                    <div className="Courses_complete_inProgress">
                        <button 
                            className={`Courses_all ${filter === "all" ? "active" : ""}`} 
                            onClick={() => setFilter("all")}
                        >
                            All
                        </button>
                        <button 
                            className={`Courses_complete ${filter === "Completed" ? "active" : ""}`} 
                            onClick={() => setFilter("Completed")}
                        >
                            Completed
                        </button>
                        <button 
                            className={`Courses_inProgress ${filter === "In Progress" ? "active" : ""}`} 
                            onClick={() => setFilter("In Progress")}
                        >
                            In Progress
                        </button>
                    </div>
                </div>

                <div className="my-learning-content-myLearning">
                    {filteredCourses.map((course, index) => {
                        const isProgram = !!course.specialization;
                        return (
                            <div key={index} className="course-specialization-group">
                                {isProgram && (
                                    <div className="specialization-header">
                                        <span className="specialization-title">{course.specialization}</span>
                                        <img src={course.providerLogo} alt="Provider" className="provider-logo" />
                                    </div>
                                )}

                                <div className={`course-card ${!isProgram ? 'is-single-course' : ''}`}>
                                    <div className="course-card-top-row">
                                        {!isProgram && (
                                            <div className="course-card-provider">
                                                <span className="specialization-title">{course.courseCompany}</span>
                                                <img src={course.providerLogo} alt="Provider" className="provider-logo" />
                                            </div>
                                        )}
                                        <h3 className="course-name">{isProgram ? course.title : course.courseName}</h3>
                                    </div>

                                    <div className="course-card-main-content">
                                        <div className="course-card-left">
                                            <button className="continue-btn">{course.progress === 100 ? "Add Linkedin" : course.progress > 0 ? "Continue" : "Start"}</button>
                                            <div className="see-more-link">
                                                <span>see more</span>
                                                <img src="/photo_icons/show_more.png" alt="" />
                                            </div>
                                        </div>

                                        <div className="course-card-right">
                                            <div className="progress-section">
                                                <span className="progress-percentage">{course.progress}%</span>
                                                <div className="progress-bar-container">
                                                    <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
                                                </div>
                                            </div>
                                            <div className="last-lesson-info">
                                                <span>Last lesson : <strong>{course.lastLesson}</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default MyLearning;