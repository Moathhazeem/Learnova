import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import "../config/i18n";
import "./My Learning.css";

const PLAN_STORAGE_KEY = "learnova-learning-plan";
const DAYS_OF_WEEK_SHORT = ["SA", "SU", "MO", "TU", "WE", "TH", "FR"];

const createTaskId = () => `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const DEFAULT_TASKS_BY_DAY = {
    SA: [{ id: "default-sa", task: "Practice Excel basics", duration: "30 mins", completed: true }],
    SU: [{ id: "default-su", task: "Watch HTML/CSS tutorial", duration: "45 mins", completed: false }],
    MO: [{ id: "default-mo", task: "Complete REST API assignment", duration: "60 mins", completed: false }],
    TU: [{ id: "default-tu", task: "Read Data Analyst article", duration: "15 mins", completed: false }],
    WE: [{ id: "default-we", task: "Build JavaScript interactive form", duration: "45 mins", completed: false }],
    TH: [{ id: "default-th", task: "Review Database integration concepts", duration: "40 mins", completed: false }],
    FR: [{ id: "default-fr", task: "Weekly learning reflection & recap", duration: "20 mins", completed: false }],
};

const loadTasksFromStorage = () => {
    try {
        const raw = localStorage.getItem(PLAN_STORAGE_KEY);
        if (!raw) return DEFAULT_TASKS_BY_DAY;
        const parsed = JSON.parse(raw);
        const merged = { ...DEFAULT_TASKS_BY_DAY };
        DAYS_OF_WEEK_SHORT.forEach((day) => {
            if (Array.isArray(parsed[day])) {
                merged[day] = parsed[day];
            }
        });
        return merged;
    } catch {
        return DEFAULT_TASKS_BY_DAY;
    }
};

// ─── CalendarUI Component (outside MyLearning to avoid re-creation on each render) ───
const CalendarUI = ({ t, i18n, taskDurationInput, setTaskDurationInput, tasksByDay, setTasksByDay, selectedPlanDay, setSelectedPlanDay }) => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskNameInput, setTaskNameInput] = useState("");

    const dayTasks = tasksByDay[selectedPlanDay] ?? [];

    const toggleTask = (day, taskId) => {
        setTasksByDay((prev) => ({
            ...prev,
            [day]: prev[day].map((item) =>
                item.id === taskId ? { ...item, completed: !item.completed } : item
            ),
        }));
    };

    const handleOpenModal = () => {
        setTaskNameInput("");
        setTaskDurationInput("");
        setIsModalOpen(true);
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!taskNameInput.trim()) return;
        const durationVal = taskDurationInput.trim() ? `${taskDurationInput.trim()} mins` : "30 mins";
        setTasksByDay((prev) => ({
            ...prev,
            [selectedPlanDay]: [
                ...prev[selectedPlanDay],
                {
                    id: createTaskId(),
                    task: taskNameInput.trim(),
                    duration: durationVal,
                    completed: false,
                },
            ],
        }));
        setTaskNameInput("");
        setTaskDurationInput("");
    };

    const handleDeleteTask = (day, taskId) => {
        setTasksByDay((prev) => ({
            ...prev,
            [day]: prev[day].filter((item) => item.id !== taskId),
        }));
    };

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
                    {DAYS_OF_WEEK_SHORT.map((day) => (
                        <button
                            key={day}
                            className={`plan-day-btn ${selectedPlanDay === day ? "active" : ""}`}
                            onClick={() => setSelectedPlanDay(day)}
                        >
                            {day}
                        </button>
                    ))}
                    <button className="plan-edit-btn" onClick={handleOpenModal} aria-label={t("learning.manage_plan", "Manage learning plan")}>
                        <Pencil size={18} color="#0089EA" />
                    </button>
                </div>

                {/* Plan tasks for selected day */}
                <div className="plan-tasks-list">
                    {dayTasks.length === 0 ? (
                        <p className="plan-tasks-empty">{t("learning.no_tasks", "No tasks for this day. Tap the pencil to add one.")}</p>
                    ) : (
                        dayTasks.map((taskItem) => (
                            <div
                                key={taskItem.id}
                                className={`plan-task-card ${taskItem.completed ? "task-completed" : ""}`}
                            >
                                <div className="task-info">
                                    <span className="task-name">{taskItem.task}</span>
                                    <span className="task-duration" ><img style={{ width: "18px", height: "18px" }} src="https://img.icons8.com/?size=100&id=63250&format=png&color=000000"></img> {taskItem.duration}</span>
                                </div>
                                <button
                                    className={`task-checkbox-btn ${taskItem.completed ? "checked" : ""}`}
                                    onClick={() => toggleTask(selectedPlanDay, taskItem.id)}
                                    aria-label={t("learning.toggle_task", "Toggle task completion")}
                                >
                                    {taskItem.completed ? <img style={{ width: "15px", height: "15px" }} src="https://img.icons8.com/?size=100&id=83145&format=png&color=FFFFFF"></img> : ""}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Manage plan: add new tasks & delete existing */}
            {isModalOpen && (
                <div className="planner-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="planner-modal-card" onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ display: "flex", gap: 10 }}><img src="https://img.icons8.com/?size=100&id=yYUxqLu0ysrc&format=gif" style={{ width: '20px' }}></img> {t("learning.manage_plan_day", "Manage plan")} ({selectedPlanDay})</h3>

                        {dayTasks.length > 0 && (
                            <div className="modal-existing-tasks">
                                <p className="modal-section-label">{t("learning.existing_tasks", "Your tasks")}</p>
                                <ul className="modal-task-list">
                                    {dayTasks.map((taskItem) => (
                                        <li key={taskItem.id} className="modal-task-row">
                                            <div className="modal-task-row-info">
                                                <span className="modal-task-row-name">{taskItem.task}</span>
                                                <span className="modal-task-row-duration">{taskItem.duration}</span>
                                            </div>
                                            <button
                                                type="button"
                                                className="modal-delete-task-btn"
                                                onClick={() => handleDeleteTask(selectedPlanDay, taskItem.id)}
                                                aria-label={t("learning.delete_task", "Delete task")}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <form onSubmit={handleAddTask}>
                            <p className="modal-section-label">{t("learning.add_task", "Add new task")}</p>
                            <div className="modal-form-group">
                                <label>{t("learning.task_description", "Task description")}</label>
                                <input
                                    type="text"
                                    value={taskNameInput}
                                    onChange={(e) => setTaskNameInput(e.target.value)}
                                    placeholder={t("learning.task_placeholder", "e.g. Practice CSS Grid")}
                                    required
                                />
                            </div>
                            <div className="modal-form-group">
                                <label>{t("learning.task_duration", "Duration (minutes)")}</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={taskDurationInput}
                                    onChange={(e) => setTaskDurationInput(e.target.value)}
                                    placeholder="45"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="modal-cancel-btn" onClick={() => setIsModalOpen(false)}>
                                    {t("learning.cancel", "Cancel")}
                                </button>
                               <button type="submit" className="modal-save-btn modal-add-btn">
                                    <Plus size={16} />
                                    {t("learning.add_task_btn", "Add task")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                {DAYS_OF_WEEK_SHORT.map((day) => (
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

const Streak = ({ t, i18n, minTarget, tasksByDay, selectedPlanDay }) => {
    const [progress, setProgress] = useState(30);
    const [vist, setVist] = useState(1);

    const visitsTarget = 1;

    // Calculate percentages
    const dayTasks = tasksByDay[selectedPlanDay] ?? [];
    const allTasksCompleted = dayTasks.length > 0 && dayTasks.every(taskItem => taskItem.completed);
    const displayProgress = allTasksCompleted ? minTarget : progress;
    const progressPercent = allTasksCompleted ? 100 : Math.min((progress / minTarget) * 100, 100);
    const vistPercent = Math.min((vist / visitsTarget) * 100, 100);

    const increase = () => {
        setProgress(prev => Math.min(prev + 5, minTarget));
    };

    return (
        <div className="streak-container">
            <div className="header">
                <div className="header-left">
                    <h3>{t("profile.streak", "Streak")}</h3>
                    <p>{t("profile.streak_description", "Watch your course to active Daily streak")}</p>
                </div>
                <div className="header-right">
                    <img src="/photo_icons/info.png" alt="Info about study" />
                    {/* 🟢 صندوق المعلومات الخفيف */}
                    <div className="tooltip-box">
                        Keep the fire burning! Your daily streak activates and updates when you visit your course and watch for at least 30 minutes every day.
                    </div>
                </div>
            </div>
            <div className="streak-days">
                <div className="day">
                    <img src={displayProgress < minTarget ? "https://img.icons8.com/?size=100&id=houGsYyNpCbu&format=png&color=A0A0A0" : "https://img.icons8.com/?size=100&id=houGsYyNpCbu&format=gif"} alt="Streak" />
                    <div className="day-description">
                        <div className="day-number-container">
                            <div className="day-number">1</div>
                            <div className="day-name">{t("profile.day", "Day")}</div>
                        </div>
                        <p className="day-description-text">{t("profile.day_description", "Current streak")}</p>
                    </div>
                    {/*<button className="streak-boost-btn" onClick={increase} disabled={progress >= minTarget}>
                        ⚡ {progress >= minTarget ? "Done!" : "Study +5m"}
                    </button>*/}
                </div>
                <div className="streak">
                    <div className="courese-streak">
                        <h3>{t("profile.course minutes", "Course min")}</h3>
                        <div className="par">
                            <div className="progress-bar-container">
                                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                            <p>{displayProgress}/{minTarget}</p>
                        </div>
                    </div>
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
    );
};

// ─── Main MyLearning Component ───
function MyLearning() {
    const [taskDurationInput, setTaskDurationInput] = useState("");
    const [minTarget, setMinTarget] = useState(30);
    const [selectedPlanDay, setSelectedPlanDay] = useState("SU");
    const [tasksByDay, setTasksByDay] = useState(loadTasksFromStorage);

    useEffect(() => {
        localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(tasksByDay));
    }, [tasksByDay]);

    useEffect(() => {
        if (taskDurationInput !== "") {
            setMinTarget(Number(taskDurationInput));
        }
    }, [taskDurationInput]);

    const durationVal = taskDurationInput && taskDurationInput.trim() ? `${taskDurationInput.trim()} mins` : "30 mins";
    const location = useLocation();
    const pathname = location.pathname.split("/").filter((x) => x);
    const { t, i18n } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );
    const [expandedCourse, setExpandedCourse] = useState(null);

    const syllabus = {
        0: ["Introduction to Node.js & Express", "Building REST APIs", "Database Integration with MongoDB", "Deployment and DevOps Basics"],
        1: ["HTML5 Semantic Elements", "CSS3 Flexbox and Grid Layouts", "Responsive Web Design Concepts", "JavaScript ES6+ Syntax & DOM Manipulation"],
        2: ["Data Analyst Role & Ecosystem", "Data Collection Techniques", "Data Wrangling & Cleaning", "Introduction to Data Visualization"],
        3: ["Excel Interface & Basic Formulae", "VLOOKUP, INDEX & MATCH functions", "Creating Interactive Pivot Tables", "Excel Charts & Dashboard Design"],
        4: ["Illustrator Interface & Basic Shapes", "Working with Pen Tool & Paths", "Typography & Color Management", "Advanced Vector Effects & Exporting"]
    };

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
            progress: 80,
            lastLesson: "02 Dec 2026, 07:20 AM",
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
        {
            specialization: "Adobe",
            title: "Adobe Illustrator logos design",
            progress: 30,
            lastLesson: "20 Nov 2026, 07:20 AM",
            providerLogo: "/photo_icons/Adobe_icon.jfif",
            path: "/course_start"
        }
    ];
    const navigate = useNavigate();

    const [filter, setFilter] = useState("all");

    const filteredCourses = courses.filter((course) => {
        if (filter === "Completed") return course.progress === 100;
        if (filter === "In Progress") return course.progress < 100;
        return true;
    });

    return (
        <div className="my-learning-container">
            {/* Breadcrumbs */}
            <nav className="breadcrumbs-nav_my_learning">
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

            <div className="my-learning-welcome-banner">
                <div className="banner-content">
                    <h1>{t("learning.welcome_back", "Welcome back, Learner!")}</h1>
                    <p>{t("learning.banner_sub", "You're doing great! Keep up the momentum and achieve your goals today.")}</p>
                </div>
                <div className="banner-stats">
                    <div className="stat-pill">
                        <span className="stat-num">3 / 4</span>
                        <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-num">75%</span>
                        <span className="stat-label">Progress</span>
                    </div>
                </div>
            </div>

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
                                        <div className={`course-card ${expandedCourse === index ? "is-expanded" : ""}`}>

                                            {/* 1. الجزء العلوي من الكرت */}
                                            <div className="course-card-top-row">
                                                <div className="course-card-provider">
                                                    <span className="specialization-title">
                                                        {isProgram ? course.specialization : course.courseCompany}
                                                    </span>
                                                    <img
                                                        src={course.providerLogo}
                                                        alt="Provider"
                                                        className="provider-logo"
                                                    />
                                                </div>
                                                <h3 className="course-name">
                                                    {isProgram ? course.title : course.courseName}
                                                </h3>
                                            </div>

                                            {/* 2. المحتوى الرئيسي الأوسط (Flexbox الأفقي الحالي) */}
                                            <div className="course-card-main-content">
                                                <div className="course-card-left">
                                                    <button className="continue-btn" onClick={() => {
                                                        if (course.progress === 100) {
                                                            window.open('https://linkedin.com', '_blank');
                                                        } else {
                                                            navigate(course.path);
                                                        }
                                                    }}>
                                                        {course.progress === 100
                                                            ? "Add Linkedin"
                                                            : course.progress > 0
                                                                ? "Continue"
                                                                : "Start"}
                                                    </button>
                                                    <div
                                                        className="see-more-link"
                                                        onClick={() => setExpandedCourse(expandedCourse === index ? null : index)}
                                                    >
                                                        <span>{expandedCourse === index ? "see less" : "see more"}</span>
                                                        <img
                                                            src="/photo_icons/arrow-down.png"
                                                            alt=""
                                                            style={{ transform: expandedCourse === index ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                                                        />
                                                    </div>
                                                    {expandedCourse === index && (
                                                        <div className="course-syllabus-drawer">
                                                            <h4 className="Course_Modules"><img className="Course_Modules_icon" src="https://img.icons8.com/?size=100&id=yYUxqLu0ysrc&format=png&color=000000"></img> Course Modules</h4>
                                                            <ul className="syllabus-list">
                                                                {syllabus[index]?.map((module, i) => (
                                                                    <li key={i} className="syllabus-item">
                                                                        <span className={`status-dot ${course.progress === 100 ? "completed" : i === 0 && course.progress > 0 ? "active" : "upcoming"}`}></span>
                                                                        <span className="module-name">{module}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
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
                                            </div> {/* نهاية الـ course-card-main-content */}



                                        </div> {/* نهاية الـ course-card */}
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
                        <CalendarUI 
                            t={t} 
                            i18n={i18n} 
                            taskDurationInput={taskDurationInput} 
                            setTaskDurationInput={setTaskDurationInput} 
                            tasksByDay={tasksByDay}
                            setTasksByDay={setTasksByDay}
                            selectedPlanDay={selectedPlanDay}
                            setSelectedPlanDay={setSelectedPlanDay}
                        />
                        <Streak 
                            t={t} 
                            i18n={i18n} 
                            minTarget={minTarget} 
                            tasksByDay={tasksByDay}
                            selectedPlanDay={selectedPlanDay}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyLearning;