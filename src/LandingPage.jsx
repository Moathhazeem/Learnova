import { useNavigate } from "react-router-dom";
import { CircleDollarSign, Clock, SlidersHorizontal, Star } from "lucide-react";
import "./LandingPage.css";

/**
 * Static mock array of popular courses displayed on the Landing Page.
 * Each object contains metadata such as course title, pricing, duration, difficulty level,
 * instructor details, rating, and target navigation path.
 */
const POPULAR_COURSES = [
    {
        image: "/Photo/Adobe Illustrator logo design.png",
        title: "Adobe Illustrator - logos design",
        price: "$50",
        duration: "1 h",
        level: "Beginner",
        instructor: "Dimitri Abdelhak",
        instructorImage: "/Photo/Dimitri Abdelhak.png",
        rating: "5.0",
        path: "/Log_in"
    },
    {
        image: "/Photo/Adobe Photoshop - Social media designs.png",
        title: "Adobe Photoshop - Social media designs",
        price: "$50",
        duration: "1 h",
        level: "Intermediate",
        instructor: "Dimitri Abdelhak",
        instructorImage: "/Photo/Dimitri Abdelhak.png",
        rating: "5.0"
    },
    {
        image: "/Photo/Adobe InDesign - Book cover designs.png",
        title: "Adobe InDesign - Book cover designs",
        price: "$50",
        duration: "1 h",
        level: "Advanced",
        instructor: "Dimitri Abdelhak",
        instructorImage: "/Photo/Dimitri Abdelhak.png",
        rating: "5.0"
    },
    {
        id: 41,
        image: "/Photo/figma.jfif",
        title: "Figma",
        price: "$80",
        rating: "5",
        category: "UI / UX Design",
        instructor: "Rawand Issa",
        duration: "3h",
        level: "Beginner",
        instructorImage: "/Photo/women_suites_1.jpg",
        ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
        priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
        durationIcon: <Clock size={18} className="text-gray-500" />,
        levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
        path: "/Explore/Course"
    },
    {
        id: 42,
        image: "/Photo/UI Design.jfif",
        title: "UI Design",
        price: "$20",
        rating: "4.5",
        category: "UI / UX Design",
        instructor: "Zyad Barzanji",
        duration: "12h",
        level: "Advanced",
        instructorImage: "/Photo/man_suites_4.jpg",
        ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
        priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
        durationIcon: <Clock size={18} className="text-gray-500" />,
        levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
        path: "/Explore/Course"
    },
    {
        id: 43,
        image: "/Photo/UX design.jfif",
        title: "UX design",
        price: "$50",
        rating: "4.5",
        category: "UI / UX Design",
        instructor: "Omed Jabar",
        duration: "12h",
        level: "Advanced",
        instructorImage: "/Photo/man_suites_5.jpg",
        ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
        priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
        durationIcon: <Clock size={18} className="text-gray-500" />,
        levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
        path: "/Explore/Course"
    },
    {
        id: 44,
        image: "/Photo/Adobe_XD.jfif",
        title: "Adobe XD",
        price: "$20",
        rating: "4.5",
        category: "UI / UX Design",
        instructor: "Zyad Barzanji",
        duration: "12h",
        level: "Beginner",
        instructorImage: "/Photo/man_suites_4.jpg",
        ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
        priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
        durationIcon: <Clock size={18} className="text-gray-500" />,
        levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
        path: "/Explore/Course"
    }
];

/**
 * LandingPage Component
 * 
 * Serves as the primary hero and showcase view of the Learnova web application.
 * Renders hero titles, introductory text, call-to-action authentication buttons,
 * and a list of popular course cards with routing logic.
 */
function LandingPage() {
    /**
     * Hook from `react-router-dom` used for programmatic page navigation.
     */
    const navigate = useNavigate();

    /**
     * Fallback click handler that navigates the user to the Login page (`/Log_in`).
     * Invoked when a course item does not explicitly define a custom `path`.
     */
    const handleClick = () => {
        navigate('/Log_in');
    };

    return (
        <div className="landing-page">
            {/* ─── Hero Header & Description Section ─── */}
            <div className="page-content">
                <h1 className="page-title">
                    Master new skills with <span className="page-title-2">world-class mentors</span>
                </h1>
                <p className="page-description">
                    Join over 10,000 students learning design, development, and business strategies. Start your journey today.
                </p>
            </div>

            {/* ─── Call to Action (CTA) Buttons ─── */}
            <div className="auth-buttons">
                {/* Button navigating to free registration / Sign Up page */}
                <button 
                    className="Started" 
                    onClick={() => navigate("/sign_up")}
                >
                    Get Started For free
                </button>
                {/* Button navigating to all courses / Explore page */}
                <button 
                    className="View-courses" 
                    onClick={() => navigate("/Explore")}
                >
                    View all courses
                </button>
            </div>

            {/* ─── Popular Courses Showcase Section ─── */}
            <div className="popular-courses-section">
                <h2 className="popular-courses-title">Popular Courses</h2>
                
                {/* Container displaying horizontal flex box of course cards */}
                <div className="courses-container">
                    {POPULAR_COURSES.map((course, index) => (
                        <div
                            className="landing-course-item"
                            key={course.id || index}
                            onClick={() => {
                                // If a explicit path is specified for the course, navigate to it; otherwise fallback to login
                                if (course.path) {
                                    navigate(course.path);
                                } else {
                                    handleClick();
                                }
                            }}
                        >
                            {/* Course Image Thumbnail */}
                            <div className="course-item-image">
                                <img src={course.image} alt={course.title} />
                            </div>

                            {/* Course Details Card Body */}
                            <div className="course-info">
                                <h3 className="course-title">{course.title}</h3>

                                {/* Price, Duration, and Level Row */}
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

                                {/* Instructor Profile & Rating Row */}
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
            </div>
        </div>
    );
}

export default LandingPage;
