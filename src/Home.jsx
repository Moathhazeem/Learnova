import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    BookOpen,
    Play,
    ChevronRight,
    CircleDollarSign,
    Clock,
    SlidersHorizontal,
    Star,
    Loader2,
    AlertCircle,
    Inbox
} from "lucide-react";
import "./Home.css";

function Home() {
    // Current user resolution from localStorage
    const savedUser = (() => {
        try {
            return JSON.parse(localStorage.getItem("user") || "{}");
        } catch {
            return {};
        }
    })();
    const userId = savedUser.id || savedUser._id || "671800000000000000000001";
    const userName = savedUser.firstName || "Learner";

    // In-progress courses & active course state
    const [inProgressList, setInProgressList] = useState([]);
    const [activeCourse, setActiveCourse] = useState(null);
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState("0h left");
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [errorCourses, setErrorCourses] = useState(null);

    // Dynamic backend courses state
    const [courses, setCourses] = useState([]);
    const [loadingRecs, setLoadingRecs] = useState(true);
    const [errorRecs, setErrorRecs] = useState(null);

    // Toast notices & hover state
    const [notice, setNotice] = useState(null);
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    // 1. Fetch courses dynamically from the backend on load
    useEffect(() => {
        let isMounted = true;

        const fetchCourses = async () => {
            try {
                setLoadingRecs(true);
                setErrorRecs(null);
                const response = await axios.get("http://localhost:5000/api/courses");
                if (isMounted) {
                    setCourses(response.data.data || []);
                }
            } catch (err) {
                console.error("Error fetching courses:", err);
                if (isMounted) {
                    setErrorRecs(err.response?.data?.message || "Failed to load courses. Please try again.");
                }
            } finally {
                if (isMounted) {
                    setLoadingRecs(false);
                }
            }
        };

        const fetchInProgress = async () => {
            try {
                setLoadingCourses(true);
                setErrorCourses(null);
                const response = await axios.get(`http://localhost:5000/api/courses/in-progress/${userId}`);
                if (isMounted) {
                    const enrollments = response.data.data || [];
                    setInProgressList(enrollments);
                    if (enrollments.length > 0) {
                        const firstItem = enrollments[0];
                        setActiveCourse(firstItem.course || firstItem);
                        setProgress(firstItem.progressPercentage ?? 0);
                        setTimeLeft(firstItem.timeLeft || "In progress");
                    } else {
                        setActiveCourse(null);
                    }
                }
            } catch (err) {
                console.error("Error fetching in-progress courses:", err);
                if (isMounted) {
                    setErrorCourses("Unable to load in-progress courses.");
                }
            } finally {
                if (isMounted) {
                    setLoadingCourses(false);
                }
            }
        };

        fetchCourses();
        fetchInProgress();

        return () => {
            isMounted = false;
        };
    }, [userId]);

    // Handle course progress update
    const handleProgressIncrement = async (e) => {
        e.stopPropagation();
        if (!activeCourse?._id) return;

        const nextVal = Math.min(progress + 10, 100);
        const updatedTimeLeft = nextVal >= 100 ? "Completed" : "5h 45m left";

        try {
            await axios.post("http://localhost:5000/api/courses/progress/update", {
                userId,
                courseId: activeCourse._id,
                progressPercentage: nextVal,
                timeLeft: updatedTimeLeft
            });
            setProgress(nextVal);
            setTimeLeft(updatedTimeLeft);
            setNotice({ type: "success", text: `Progress updated to ${nextVal}%!` });
        } catch (err) {
            console.error("Failed to update progress:", err);
            setNotice({ type: "error", text: "Could not update progress. Please retry." });
        } finally {
            setTimeout(() => setNotice(null), 3000);
        }
    };

    const handleClick = () => {
        navigate('/course_start');
    };

    const categories = [
        { name: "Healthcare", white: "/photo_icons/heart-health-white.png", blue: "/photo_icons/heart-health-blue.png" },
        { name: "Computer Science", white: "/photo_icons/Computer-science-white.png", blue: "/photo_icons/Computer-science-blue.png" },
        { name: "Data Science", white: "/photo_icons/data-science-white.png", blue: "/photo_icons/data-science-blue.png" },
        { name: "Artificial Intelligence", white: "/photo_icons/artificial-intelligence-white.png", blue: "/photo_icons/artificial-intelligence-blue.png" },
        { name: "Business", white: "/photo_icons/Business-white.png", blue: "/photo_icons/Business-blue.png" },
    ];

    const PLACEHOLDER = "/Photo/Adobe Illustrator logo design.png";

    const getImageUrl = (path, fallback = PLACEHOLDER) => {
        if (!path) return fallback;
        // Absolute URLs (e.g. Cloudinary, S3) → use as-is
        if (path.startsWith("http://") || path.startsWith("https://")) return path;
        // Local paths → served by Vite from the public/ folder at the root
        return path.startsWith("/") ? path : `/${path}`;
    };

    return (
        <div className="home-container">

            {/* Notice / Feedback Toast */}
            {notice && (
                <div style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    zIndex: 9999,
                    padding: "12px 20px",
                    borderRadius: "8px",
                    color: "#fff",
                    backgroundColor: notice.type === "success" ? "#16a34a" : "#dc2626",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    fontWeight: 500
                }}>
                    {notice.text}
                </div>
            )}

            {/* ---------------- 1. DASHBOARD WELCOME HEADER ---------------- */}
            <div className="home-welcome-section">
                <div className="welcome-text-block">
                    <p className="welcome-eyebrow">Your learning dashboard</p>
                    <h1>Welcome back, {userName}!</h1>
                    <p className="welcome-subtitle">
                        Pick up where you left off and discover something new today.
                    </p>
                </div>
            </div>

            {/* ---------------- 2. IN PROGRESS COURSE SECTION ---------------- */}
            <section className="in-progress-section">
                <div className="section-title">
                    <span className="section-icon-wrap">
                        <BookOpen size={20} strokeWidth={2.25} />
                    </span>
                    <h2>In progress</h2>
                </div>

                {loadingCourses ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "24px", color: "#64748b" }}>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Loading active courses...</span>
                    </div>
                ) : errorCourses ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "20px", color: "#dc2626", backgroundColor: "#fef2f2", borderRadius: "8px" }}>
                        <AlertCircle size={20} />
                        <span>{errorCourses}</span>
                    </div>
                ) : activeCourse ? (
                    <article className="progress-card" onClick={handleClick}>
                        <div className="progress-card-image">
                            <img
                                src={getImageUrl(activeCourse?.image || activeCourse?.thumbnail)}
                                alt={activeCourse?.title || "Course thumbnail"}
                                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER; }}
                            />
                            <span className="progress-card-badge">
                                {activeCourse?.category || "Graphic Design"}
                            </span>
                        </div>

                        <div className="progress-card-info">
                            <div className="info-top">
                                <span className="learning-label">Continue learning</span>
                                <div style={{ display: "flex", gap: "8px" }}>
                                    <button
                                        type="button"
                                        className="play-button"
                                        aria-label="Update progress (+10%)"
                                        title="Simulate course progress"
                                        onClick={handleProgressIncrement}
                                    >
                                        <Play size={16} fill="currentColor" strokeWidth={0} />
                                    </button>
                                </div>
                            </div>
                            <h3 className="course-title">
                                {activeCourse?.title || "Adobe Illustrator - logos design"}
                            </h3>

                            <div className="progress-details">
                                <div className="progress-stats">
                                    <span><strong>{progress}%</strong> complete</span>
                                    <span>{timeLeft}</span>
                                </div>
                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </article>
                ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "24px", color: "#64748b", border: "1px dashed #cbd5e1", borderRadius: "8px", backgroundColor: "#f8fafc" }}>
                        <Inbox size={22} />
                        <span>No courses in progress yet. Explore our course recommendations below to start learning!</span>
                    </div>
                )}
            </section>

            {/* ---------------- 3. CATEGORIES EXPLORATION SECTION ---------------- */}
            <section className="explore-section">
                <div className="section-header">
                    <h2>Explore Categories</h2>
                    <Link to="/Explore" className="show-more">
                        Show More
                        <ChevronRight size={18} strokeWidth={2.5} />
                    </Link>
                </div>

                <div className="categories-grid">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`category-tag ${image === index ? "is-hovered" : ""}`}
                            onMouseEnter={() => setImage(index)}
                            onMouseLeave={() => setImage(null)}
                        >
                            <span className="category-tag-icon">
                                <img src={image === index ? cat.white : cat.blue} alt="" aria-hidden="true" />
                            </span>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ---------------- 4. RECOMMENDED COURSES SECTION (DYNAMIC BACKEND DATA) ---------------- */}
            <section className="recommended-section">
                <div className="section-header">
                    <h2>Recommended for You</h2>
                    <Link to="/Explore" className="show-more">
                        View all
                        <ChevronRight size={18} strokeWidth={2.5} />
                    </Link>
                </div>

                {loadingRecs ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "24px", color: "#64748b" }}>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Loading recommendations...</span>
                    </div>
                ) : errorRecs ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "20px", color: "#dc2626", backgroundColor: "#fef2f2", borderRadius: "8px" }}>
                        <AlertCircle size={20} />
                        <span>{errorRecs}</span>
                    </div>
                ) : courses.length === 0 ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "24px", color: "#64748b", border: "1px dashed #cbd5e1", borderRadius: "8px" }}>
                        <Inbox size={22} />
                        <span>No courses available currently.</span>
                    </div>
                ) : (
                    <div className="courses-container">
                        {courses.map((course, index) => {
                            const courseTitle = course.title;
                            const courseImg = getImageUrl(course.image || course.thumbnail, "/Photo/Adobe Illustrator logo design.png");
                            const coursePrice = typeof course.price === "number" ? `$${course.price}` : (course.price || "$0");
                            const courseDuration = course.duration || "N/A";
                            const courseLevel = course.level || "Beginner";
                            const instructorName = course.instructor?.name || "Learnova Expert";
                            const instructorImg = getImageUrl(course.instructor?.avatar, "/Photo/Dimitri Abdelhak.png");
                            const courseRating = course.rating !== undefined ? Number(course.rating).toFixed(1) : "5.0";

                            return (
                                <div
                                    key={course._id || index}
                                    className="home-course-item"
                                    onClick={() => navigate('/Explore/Course')}
                                >
                                    {/* Course Thumbnail */}
                                    <div className="course-item-image">
                                        <img
                                            src={courseImg}
                                            alt={courseTitle}
                                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER; }}
                                        />
                                    </div>

                                    {/* Course Content Information */}
                                    <div className="course-info">
                                        <h3 className="course-title">{courseTitle}</h3>

                                        {/* Price, Duration, Level Metadata Row */}
                                        <div className="course-info-PRL">
                                            <div className="course-info-PRL-item">
                                                <CircleDollarSign size={16} />
                                                <p className="course-price">{coursePrice}</p>
                                            </div>
                                            <div className="course-info-PRL-item">
                                                <Clock size={16} />
                                                <p className="course-duration">{courseDuration}</p>
                                            </div>
                                            <div className="course-info-PRL-item">
                                                <SlidersHorizontal size={16} />
                                                <p className="course-level">{courseLevel}</p>
                                            </div>
                                        </div>

                                        {/* Instructor Profile & Course Rating Row */}
                                        <div className="course-info-IR">
                                            <div className="course-info-IR-item">
                                                <img
                                                    src={instructorImg}
                                                    alt="instructor"
                                                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER; }}
                                                />
                                                <p className="course-instructor">{instructorName}</p>
                                            </div>
                                            <div className="course-info-IR-item">
                                                <Star size={16} fill="#ffc107" stroke="#ffc107" />
                                                <p className="course-rating">{courseRating}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Home;