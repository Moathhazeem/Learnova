import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BookOpen,
    Play,
    ChevronRight,
    CircleDollarSign,
    Clock,
    SlidersHorizontal,
    Star,
    Loader2
} from "lucide-react";
import {
    getInProgressCourses,
    getAIRecommendations,
    updateCourseProgress
} from "./services/api";
import "./Home.css";

/**
 * Home Component
 * 
 * Serves as the user dashboard displaying:
 * - Welcome header / overview greeting
 * - Currently in-progress course card with dynamic completion bar
 * - Category navigation tags with interactive hover states
 * - Grid of recommended courses with price, duration, level, and rating metadata
 */
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
    const [progress, setProgress] = useState(30);
    const [timeLeft, setTimeLeft] = useState("6h 30m left");
    const [loadingCourses, setLoadingCourses] = useState(true);

    // AI recommendations state
    const [recommendations, setRecommendations] = useState([]);
    const [loadingRecs, setLoadingRecs] = useState(true);

    // General status/toast messages
    const [notice, setNotice] = useState(null);

    // Category tag hover state
    const [image, setImage] = useState(null);

    // React Router navigation instance
    const navigate = useNavigate();

    // Fetch dashboard data
    useEffect(() => {
        let isMounted = true;

        const loadDashboardData = async () => {
            // 1. Fetch In-Progress Courses
            try {
                setLoadingCourses(true);
                const res = await getInProgressCourses(userId);
                if (isMounted && res.data && res.data.length > 0) {
                    setInProgressList(res.data);
                    const firstItem = res.data[0];
                    setActiveCourse(firstItem.course || firstItem);
                    setProgress(firstItem.progressPercentage ?? 30);
                    setTimeLeft(firstItem.timeLeft || "6h 30m left");
                }
            } catch (err) {
                console.error("Failed to load in-progress courses:", err);
            } finally {
                if (isMounted) setLoadingCourses(false);
            }

            // 2. Fetch AI Recommendations
            try {
                setLoadingRecs(true);
                const res = await getAIRecommendations(userId);
                if (isMounted && res.data) {
                    setRecommendations(res.data);
                }
            } catch (err) {
                console.error("Failed to load AI recommendations:", err);
            } finally {
                if (isMounted) setLoadingRecs(false);
            }
        };

        loadDashboardData();
        return () => {
            isMounted = false;
        };
    }, [userId]);

    /**
     * Updates active course progress via API
     */
    const handleProgressIncrement = async (e) => {
        e.stopPropagation();
        if (!activeCourse?._id) return;

        const nextVal = Math.min(progress + 10, 100);
        const updatedTimeLeft = nextVal >= 100 ? "Completed" : "5h 45m left";

        try {
            await updateCourseProgress({
                userId,
                courseId: activeCourse._id,
                progressPercentage: nextVal,
                timeLeft: updatedTimeLeft
            });
            setProgress(nextVal);
            setTimeLeft(updatedTimeLeft);
            setNotice({ type: "success", text: `Progress updated to ${nextVal}%!` });
            setTimeout(() => setNotice(null), 3000);
        } catch (err) {
            console.error("Failed to update progress:", err);
            setNotice({ type: "error", text: "Could not update progress. Please retry." });
            setTimeout(() => setNotice(null), 3000);
        }
    };

    const handleClick = () => {
        navigate('/course_start');
    };

    // ==================== DATA CONFIGURATIONS ==================== //

    /**
     * Categories list used to populate category tag buttons.
     * Each entry contains the category display name and image paths for white & blue icon variations.
     */
    const categories = [
        { name: "Healthcare", white: "/photo_icons/heart-health-white.png", blue: "/photo_icons/heart-health-blue.png" },
        { name: "Computer Science", white: "/photo_icons/Computer-science-white.png", blue: "/photo_icons/Computer-science-blue.png" },
        { name: "Data Science", white: "/photo_icons/data-science-white.png", blue: "/photo_icons/data-science-blue.png" },
        { name: "Artificial Intelligence", white: "/photo_icons/artificial-intelligence-white.png", blue: "/photo_icons/artificial-intelligence-blue.png" },
        { name: "Business", white: "/photo_icons/Business-white.png", blue: "/photo_icons/Business-blue.png" },
    ];

    /**
     * Recommended courses catalog rendered in the lower grid section.
     * Includes course metadata (title, image, price, duration, difficulty level, instructor details, rating, and destination path).
     */
    const recommendedCourses = [
        {
            title: "Adobe Illustrator - logos design",
            image: "/Photo/Adobe Illustrator logo design.png",
            price: "$50",
            duration: "1 h",
            level: "Beginner",
            instructor: "Dimitri Abdelhak",
            instructorImage: "/Photo/Dimitri Abdelhak.png",
            rating: "5.0",
            path: "/Explore/Course"
        },
        {
            title: "Adobe Photoshop - Social media designs",
            image: "/Photo/Adobe Photoshop - Social media designs.png",
            price: "$50",
            duration: "1 h",
            level: "Intermediate",
            instructor: "Dimitri Abdelhak",
            instructorImage: "/Photo/Dimitri Abdelhak.png",
            rating: "5.0"
        },
        {
            title: "Adobe InDesign - Book cover designs",
            image: "/Photo/Adobe InDesign - Book cover designs.png",
            price: "$50",
            duration: "1 h",
            level: "Advanced",
            instructor: "Dimitri Abdelhak",
            instructorImage: "/Photo/Dimitri Abdelhak.png",
            rating: "5.0"
        },
        {
            id: 32,
            image: "/Photo/social media marketing.jfif",
            title: "Social Media Marketing",
            price: "$150",
            rating: "4.0",
            category: "Marketing",
            instructor: "Abdullah Samer",
            duration: "6h",
            level: "Intermediate",
            instructorImage: "/Photo/man_suites_2.jpg",
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
        },
        {
            id: 33,
            image: "/Photo/digital marketing.jfif",
            title: "Digital Marketing",
            price: "$100",
            rating: "4.3",
            category: "Marketing",
            instructor: "Abdullah Samer",
            duration: "5.5h",
            level: "Beginner",
            instructorImage: "/Photo/man_suites_2.jpg",
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
        },
        {
            id: 34,
            image: "/Photo/html&css.jfif",
            title: "HTML&CSS",
            price: "$50",
            rating: "4.1",
            category: "Web Development",
            instructor: "Rawand Issa",
            duration: "5.5h",
            level: "Beginner",
            instructorImage: "/Photo/women_suites_1.jpg",
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
        },
        {
            id: 35,
            image: "/Photo/ReactJs.jfif",
            title: "React.js",
            price: "$70",
            rating: "4.4",
            category: "Web Development",
            instructor: "Rawand Issa",
            duration: "8h",
            level: "Advanced",
            instructorImage: "/Photo/women_suites_1.jpg",
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
        },
    ];

    // ==================== COMPONENT RENDER ==================== //

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
                ) : (
                    <article className="progress-card" onClick={handleClick}>
                        <div className="progress-card-image">
                            <img
                                src={activeCourse?.thumbnail || "/Photo/Adobe Illustrator logo design.png"}
                                alt={activeCourse?.title || "Course thumbnail"}
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

                            {/* Progress percentage and visually animated dynamic fill bar */}
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

                {/* Category tags with dynamic hover state to toggle icon colors */}
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

            {/* ---------------- 4. RECOMMENDED COURSES SECTION (AI-POWERED) ---------------- */}
            <section className="recommended-section">
                <div className="section-header">
                    <h2>Recommended for You (AI-Powered)</h2>
                    <Link to="/Explore" className="show-more">
                        View all
                        <ChevronRight size={18} strokeWidth={2.5} />
                    </Link>
                </div>

                {loadingRecs ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "24px", color: "#64748b" }}>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Fetching Gemini AI recommendations...</span>
                    </div>
                ) : (
                    <div className="courses-container">
                        {(recommendations.length > 0 ? recommendations : recommendedCourses).map((course, index) => {
                            const courseTitle = course.title;
                            const courseImg = course.thumbnail || course.image || "/Photo/Adobe Illustrator logo design.png";
                            const coursePrice = typeof course.price === "number" ? `$${course.price}` : (course.price || "$50");
                            const courseDuration = course.duration || "1h";
                            const courseLevel = course.level || "Beginner";
                            const instructorName = course.instructor?.name || course.instructor || "Learnova Expert";
                            const instructorImg = course.instructor?.avatar || course.instructorImage || "/Photo/Dimitri Abdelhak.png";
                            const courseRating = course.rating ? `${course.rating}` : "5.0";

                            return (
                                <div
                                    key={course._id || course.id || index}
                                    className="home-course-item"
                                    onClick={() => {
                                        if (course.path) {
                                            navigate(course.path);
                                        } else {
                                            handleClick();
                                        }
                                    }}
                                >
                                    {/* Course Thumbnail */}
                                    <div className="course-item-image">
                                        <img src={courseImg} alt={courseTitle} />
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
                                                <img src={instructorImg} alt="instructor" />
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