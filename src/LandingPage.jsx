import { useNavigate } from "react-router-dom";
import { CircleDollarSign, Clock, SlidersHorizontal, Star } from "lucide-react";
import "./LandingPage.css";

// ─── Fallback image (served from Vite public/) ────────────────────────────────
const PLACEHOLDER = "/Photo/Adobe Illustrator logo design.png";

/**
 * Resolves a local or absolute image path for use in <img> src.
 * Local paths are served by Vite from the public/ folder at the root.
 */
const getImageUrl = (path) => {
    if (!path) return PLACEHOLDER;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return path.startsWith("/") ? path : `/${path}`;
};

/**
 * Curated list of featured/promotional courses shown on the marketing landing page.
 * This is intentionally static — it showcases hand-picked courses to visitors
 * before they sign up, and is fully independent from the Home dashboard's API feed.
 */
const FEATURED_COURSES = [
    {
        image: "/Photo/Adobe Illustrator logo design.png",
        title: "Adobe Illustrator — Logo Design",
        price: "$50",
        duration: "1h",
        level: "Beginner",
        instructorName: "Dimitri Abdelhak",
        instructorImage: "/Photo/Dimitri Abdelhak.png",
        rating: "5.0",
    },
    {
        image: "/Photo/Adobe Photoshop - Social media designs.png",
        title: "Adobe Photoshop — Social Media Designs",
        price: "$50",
        duration: "1h",
        level: "Intermediate",
        instructorName: "Dimitri Abdelhak",
        instructorImage: "/Photo/Dimitri Abdelhak.png",
        rating: "5.0",
    },
    {
        image: "/Photo/Adobe InDesign - Book cover designs.png",
        title: "Adobe InDesign — Book Cover Designs",
        price: "$50",
        duration: "1h",
        level: "Advanced",
        instructorName: "Dimitri Abdelhak",
        instructorImage: "/Photo/Dimitri Abdelhak.png",
        rating: "5.0",
    },
    {
        image: "/Photo/figma.jfif",
        title: "Figma — UI Fundamentals",
        price: "$80",
        duration: "3h",
        level: "Beginner",
        instructorName: "Rawand Issa",
        instructorImage: "/Photo/women_suites_1.jpg",
        rating: "5.0",
    },
    {
        image: "/Photo/UI Design.jfif",
        title: "UI Design Masterclass",
        price: "$20",
        duration: "12h",
        level: "Advanced",
        instructorName: "Zyad Barzanji",
        instructorImage: "/Photo/man_suites_4.jpg",
        rating: "4.5",
    },
    {
        image: "/Photo/UX design.jfif",
        title: "UX Design — Research to Prototype",
        price: "$50",
        duration: "12h",
        level: "Advanced",
        instructorName: "Omed Jabar",
        instructorImage: "/Photo/man_suites_5.jpg",
        rating: "4.5",
    },
    {
        image: "/Photo/Adobe_XD.jfif",
        title: "Adobe XD — Rapid Prototyping",
        price: "$20",
        duration: "12h",
        level: "Beginner",
        instructorName: "Zyad Barzanji",
        instructorImage: "/Photo/man_suites_4.jpg",
        rating: "4.5",
    },
];

/**
 * LandingPage — Marketing / public-facing page.
 *
 * Shows a hero section, CTA buttons, and a curated static list of featured courses.
 * It does NOT fetch from the backend; it is fully decoupled from Home.jsx, which
 * is the authenticated dashboard responsible for live backend data.
 */
function LandingPage() {
    const navigate = useNavigate();

    /** Prevent infinite loop if the placeholder itself fails to load. */
    const handleImgError = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = PLACEHOLDER;
    };

    return (
        <div className="landing-page">
            {/* ─── Hero Header & Description ─── */}
            <div className="page-content">
                <h1 className="page-title">
                    Master new skills with <span className="page-title-2">world-class mentors</span>
                </h1>
                <p className="page-description">
                    Join over 10,000 students learning design, development, and business strategies.
                    Start your journey today.
                </p>
            </div>

            {/* ─── CTA Buttons ─── */}
            <div className="auth-buttons">
                <button className="Started" onClick={() => navigate("/sign_up")}>
                    Get Started For Free
                </button>
                <button className="View-courses" onClick={() => navigate("/Explore")}>
                    View All Courses
                </button>
            </div>

            {/* ─── Featured Courses Showcase ─── */}
            <div className="popular-courses-section">
                <h2 className="popular-courses-title">Popular Courses</h2>

                <div className="courses-container">
                    {FEATURED_COURSES.map((course, index) => (
                        <div
                            className="landing-course-item"
                            key={index}
                            onClick={() => navigate("/Log_in")}
                        >
                            {/* Course Thumbnail */}
                            <div className="course-item-image">
                                <img
                                    src={getImageUrl(course.image)}
                                    alt={course.title}
                                    onError={handleImgError}
                                />
                            </div>

                            {/* Course Details */}
                            <div className="course-info">
                                <h3 className="course-title">{course.title}</h3>

                                {/* Price · Duration · Level */}
                                <div className="course-info-PRL">
                                    <div className="course-info-PRL-item">
                                        <CircleDollarSign size={16} />
                                        <p className="course-price">{course.price}</p>
                                    </div>
                                    <div className="course-info-PRL-item">
                                        <Clock size={16} />
                                        <p className="course-duration">{course.duration}</p>
                                    </div>
                                    <div className="course-info-PRL-item">
                                        <SlidersHorizontal size={16} />
                                        <p className="course-level">{course.level}</p>
                                    </div>
                                </div>

                                {/* Instructor · Rating */}
                                <div className="course-info-IR">
                                    <div className="course-info-IR-item">
                                        <img
                                            src={getImageUrl(course.instructorImage)}
                                            alt={course.instructorName}
                                            onError={handleImgError}
                                        />
                                        <p className="course-instructor">{course.instructorName}</p>
                                    </div>
                                    <div className="course-info-IR-item">
                                        <Star size={16} fill="#ffc107" stroke="#ffc107" />
                                        <p className="course-rating">{course.rating}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
