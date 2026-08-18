import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BookOpen,
    Play,
    ChevronRight,
    CircleDollarSign,
    Clock,
    SlidersHorizontal,
    Star
} from "lucide-react";
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
    // ==================== STATE MANAGEMENT ==================== //

    // Tracks overall active course completion percentage (0 to 100)
    const [progress] = useState(30);

    // Tracks the index of the currently hovered category tag to toggle icon style (blue vs white)
    const [image, setImage] = useState(null);

    // React Router navigation instance for programmatic route changes
    const navigate = useNavigate();

    // ==================== HANDLER FUNCTIONS ==================== //

    /**
     * Navigates the user to the active course learning player page.
     */
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

            {/* ---------------- 1. DASHBOARD WELCOME HEADER ---------------- */}
            <div className="home-welcome-section">
                <div className="welcome-text-block">
                    <p className="welcome-eyebrow">Your learning dashboard</p>
                    <h1>Welcome back, Moath!</h1>
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

                {/* Main clickable active course banner */}
                <article className="progress-card" onClick={handleClick}>
                    <div className="progress-card-image">
                        <img src="/Photo/Adobe Illustrator logo design.png" alt="Adobe Illustrator" />
                        <span className="progress-card-badge">Graphic Design</span>
                    </div>

                    <div className="progress-card-info">
                        <div className="info-top">
                            <span className="learning-label">Continue learning</span>
                            <button type="button" className="play-button" aria-label="Resume course">
                                <Play size={16} fill="currentColor" strokeWidth={0} />
                            </button>
                        </div>
                        <h3 className="course-title">Adobe Illustrator - logos design</h3>

                        {/* Progress percentage and visually animated dynamic fill bar */}
                        <div className="progress-details">
                            <div className="progress-stats">
                                <span><strong>{progress}%</strong> complete</span>
                                <span>6h 30m left</span>
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

            {/* ---------------- 4. RECOMMENDED COURSES SECTION ---------------- */}
            <section className="recommended-section">
                <div className="section-header">
                    <h2>Recommended for You</h2>
                    <Link to="/Explore" className="show-more">
                        View all
                        <ChevronRight size={18} strokeWidth={2.5} />
                    </Link>
                </div>

                {/* Course catalog card grid */}
                <div className="courses-container">
                    {recommendedCourses.map((course, index) => (
                        <div
                            key={index}
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
                                <img src={course.image} alt={course.title} />
                            </div>

                            {/* Course Content Information */}
                            <div className="course-info">
                                <h3 className="course-title">{course.title}</h3>

                                {/* Price, Duration, Level Metadata Row */}
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

                                {/* Instructor Profile & Course Rating Row */}
                                <div className="course-info-IR">
                                    <div className="course-info-IR-item">
                                        <img src={course.instructorImage} alt="instructor" />
                                        <p className="course-instructor">{course.instructor}</p>
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
            </section>
        </div>
    );
}

export default Home;