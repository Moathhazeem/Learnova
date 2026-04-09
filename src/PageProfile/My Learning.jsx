import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import "../config/i18n";
import "./My Learning.css";

// ─── CalendarUI Component (outside MyLearning to avoid re-creation on each render) ───
const CalendarUI = ({ t, i18n }) => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedPlanDay, setSelectedPlanDay] = useState("SU");

    const daysOfWeekShort = ["SA", "SU", "MO", "TU", "WE", "TH", "FR"];

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDay = (year, month) => new Date(year, month, 1).getDay();

    const totalDays = daysInMonth(currentYear, currentMonth);
    const startDayRaw = firstDay(currentYear, currentMonth); // 0=Sun … 6=Sat
    const startDay = (startDayRaw + 1) % 7; // shift so SA=0, SU=1 …

    const days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);

    const locale = i18n?.language === "ar" ? "ar-EG" : i18n?.language || "en";
    const monthName = new Intl.DateTimeFormat(locale, { month: "long" }).format(currentDate);

    return (
        <div className="calendar-widget">
            {/* Learning Plan Section */}
            <div className="learning-plan-section">
                <h4 className="plan-title">{t("learning.plan", "Learning plan")}</h4>
                <div className="plan-days-row">
                    {daysOfWeekShort.map((day) => (
                        <button
                            key={day}
                            className={`plan-day-btn ${selectedPlanDay === day ? "active" : ""}`}
                            onClick={() => setSelectedPlanDay(day)}
                        >
                            {day}
                        </button>
                    ))}
                    <button className="plan-edit-btn">
                        <Pencil size={18} color="#0089EA" />
                    </button>
                </div>
            </div>

            {/* Month Header */}
            <div className="calendar-main-header">
                <h3 className="calendar-month-title">
                    {monthName} {currentYear}
                </h3>
                <div className="calendar-nav-arrows">
                    <ChevronLeft
                        size={24}
                        className="nav-arrow"
                        onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))}
                    />
                    <ChevronRight
                        size={24}
                        className="nav-arrow"
                        onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))}
                    />
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
                {daysOfWeekShort.map((day) => (
                    <div key={day} className="calendar-day-label">
                        {day}
                    </div>
                ))}
                {days.map((day, i) => {
                    const isToday =
                        day === today.getDate() &&
                        currentMonth === today.getMonth() &&
                        currentYear === today.getFullYear();
                    return (
                        <div
                            key={i}
                            className={`calendar-day-num ${isToday ? "highlight" : ""} ${!day ? "empty" : ""}`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const Streak = ({ t, i18n }) => {
    const [progress, setProgress] = useState(10);
    const [vist, setVist] = useState(1);

    // Define target values
    const minTarget = 30;
    const visitsTarget = 1;

    // Calculate percentages
    const progressPercent = Math.min((progress / minTarget) * 100, 100);
    const vistPercent = Math.min((vist / visitsTarget) * 100, 100);

    const increase = () => {
        setProgress(Math.min(progress + 1, minTarget));
    }

    return (
        <div className="streak-container">
            <div className="header">
                <div className="header-left">
                    <h3>{t("profile.streak", "Streak")}</h3>
                    <p>{t("profile.streak_description", "Watch your course to active Daily streak")}</p>
                </div>
                <div className="header-right">
                    <img src="/photo_icons/info.png" alt="" />
                </div>
            </div>
            <div className="streak-days">
                <div className="day">
                    <img src="/photo_icons/fire.png" alt="Streak" />
                    <div className="day-description">
                        <div className="day-number-container">
                            <div className="day-number">1</div>
                            <div className="day-name">{t("profile.day", "Day")}</div>
                        </div>
                        <p className="day-description-text">{t("profile.day_description", "Current streak")}</p>
                    </div>

                </div>
                <div className="streak">
                    <div className="courese-streak">
                        <h3>{t("profile.course minutes", "Course min")}</h3>
                        <div className="par">
                            <div className="progress-bar-container">
                                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                            <p>{progress}/{minTarget}</p>
                        </div>
                    </div>
                    <div className="courese-vist">
                        <div className="courese-vist">
                            <h3>{t("profile.course visits", "Course visits")}</h3>
                            <div className="par">
                                <div className="progress-bar-container">
                                    <div className="progress-bar-fill" style={{ width: `${vistPercent}%` }}></div>
                                </div>
                                <p>{vist}/{visitsTarget}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Main MyLearning Component ───
function MyLearning() {
    const location = useLocation();
    const pathname = location.pathname.split("/").filter((x) => x);
    const { t, i18n } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        const updateThemeState = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };
        updateThemeState();
        const observer = new MutationObserver(updateThemeState);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    const courses = [
        {
            specialization: "IBM Full-Stack JavaScript Developer",
            title: "Introduction to Software Engineering",
            progress: 100,
            lastLesson: "Nov 14, 7:20 AM",
            providerLogo: "/photo_icons/IBM.png",
        },
        {
            courseCompany: "meta",
            courseName: "Introduction to HTML, CSS, JavaScript",
            progress: 0,
            lastLesson: "He didn't start",
            providerLogo: "/photo_icons/meta.png",
        },
        {
            specialization: "IBM Data Analyst",
            title: "Introduction to Data Analytics",
            progress: 100,
            lastLesson: "Complete Course",
            providerLogo: "/photo_icons/IBM.png",
        },
        {
            specialization: "Microsoft Data Analyst",
            title: "Introduction to Excel",
            progress: 100,
            lastLesson: "Complete Course",
            providerLogo: "/photo_icons/microsoft.png",
        },
    ];

    const [filter, setFilter] = useState("all");

    const filteredCourses = courses.filter((course) => {
        if (filter === "Completed") return course.progress === 100;
        if (filter === "In Progress") return course.progress < 100;
        return true;
    });

    return (
        <div className="my-learning-container">
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

            <div className="my-learning-content">
                {/* Filter Buttons */}
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

                {/* Main Layout: Courses + Calendar */}
                <div className="main-learning-layout">
                    <div className="my-learning-content-myLearning">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course, index) => {
                                const isProgram = !!course.specialization;
                                return (
                                    <div key={index} className="course-specialization-group">
                                        {isProgram && (
                                            <div className="specialization-header">
                                                <span className="specialization-title">
                                                    {course.specialization}
                                                </span>
                                                <img
                                                    src={course.providerLogo}
                                                    alt="Provider"
                                                    className="provider-logo"
                                                />
                                            </div>
                                        )}
                                        <div
                                            className={`course-card ${!isProgram ? "is-single-course" : ""}`}
                                        >
                                            <div className="course-card-top-row">
                                                {!isProgram && (
                                                    <div className="course-card-provider">
                                                        <span className="specialization-title">
                                                            {course.courseCompany}
                                                        </span>
                                                        <img
                                                            src={course.providerLogo}
                                                            alt="Provider"
                                                            className="provider-logo"
                                                        />
                                                    </div>
                                                )}
                                                <h3 className="course-name">
                                                    {isProgram ? course.title : course.courseName}
                                                </h3>
                                            </div>
                                            <div className="course-card-main-content">
                                                <div className="course-card-left">
                                                    <button className="continue-btn">
                                                        {course.progress === 100
                                                            ? "Add Linkedin"
                                                            : course.progress > 0
                                                                ? "Continue"
                                                                : "Start"}
                                                    </button>
                                                    <div className="see-more-link">
                                                        <span>see more</span>
                                                        <img src="/photo_icons/arrow-down.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="course-card-right">
                                                    <div className="progress-section">
                                                        <span className="progress-percentage">
                                                            {course.progress}%
                                                        </span>
                                                        <div className="progress-bar-container">
                                                            <div
                                                                className="progress-bar-fill"
                                                                style={{ width: `${course.progress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="last-lesson-info">
                                                        <span>
                                                            Last lesson :{" "}
                                                            <strong>{course.lastLesson}</strong>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="no-courses">
                                <p>No courses found for this filter.</p>
                            </div>
                        )}
                    </div>

                    {/* Sticky Calendar Sidebar */}
                    <div className="calendar-sidebar">
                        <CalendarUI t={t} i18n={i18n} />
                        <Streak t={t} i18n={i18n} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyLearning;