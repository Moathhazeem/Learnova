import { useState } from "react";
import "./Home.css";

function Home() {
    const [progress] = useState(30);
    const [image, setImage] = useState(null)
    const categories = [
        { name: "Healthcare", white: "/photo_icons/heart-health-white.png", blue: "/photo_icons/heart-health-blue.png" },
        { name: "Computer Science", white: "/photo_icons/Computer-science-white.png", blue: "/photo_icons/Computer-science-blue.png" },
        { name: "Data Science", white: "/photo_icons/data-science-white.png", blue: "/photo_icons/data-science-blue.png" },
        { name: "Artificial Intelligence", white: "/photo_icons/artificial-intelligence-white.png", blue: "/photo_icons/artificial-intelligence-blue.png" },
        { name: "Business", white: "/photo_icons/Business-white.png", blue: "/photo_icons/Business-blue.png" },
    ];

    const recommendedCourses = [
        {
            title: "Adobe Illustrator - logos design",
            image: "/Photo/Adobe Illustrator logo design.png",
            price: "$50",
            duration: "1 h",
            level: "Beginner",
            instructor: "Dimitri Abdelhak",
            instructorImage: "/Photo/Dimitri Abdelhak.png",
            rating: "5.0"
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
        }
    ];

    return (
        <div className="home-container">
            <div className="page-header">
                <h1>Welcome back, Moath!</h1>
            </div>

            <section className="in-progress-section">
                <div className="section-title">
                    <img src="/photo_icons/book.png" alt="Progress" />
                    <h2>In progress</h2>
                </div>

                <div className="progress-card">
                    <div className="progress-card-image">
                        <img src="/Photo/Adobe Illustrator logo design.png" alt="Adobe Illustrator" />
                    </div>
                    <div className="progress-card-info">
                        <div className="info-top">
                            <span className="learning-label">Continue learning</span>
                            <div className="play-button">
                                <img src="/photo_icons/play.png" alt="Play" />
                            </div>
                        </div>
                        <h3 className="course-title">Adobe Illustrator - logos design</h3>

                        <div className="progress-details">
                            <div className="progress-stats">
                                <span>{progress}% complete</span>
                                <span>6h 30m left</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="explore-section">
                <div className="section-header">
                    <h2>Explore Categories</h2>
                    <a href="#" className="show-more">
                        Show More
                        <img src="/photo_icons/show_more.png" alt="More" />
                    </a>
                </div>
                <div className="categories-grid">
                    {categories.map((cat, index) => (
                        <button key={index} className="category-tag" onMouseEnter={() => setImage(index)}
                            onMouseLeave={() => setImage(null)}>
                            <img src={image === index ? cat.white : cat.blue}
                                style={{ cursor: "pointer" }}
                                alt={cat.name}
                            />
                            {cat.name}
                        </button>
                    ))}
                </div>
            </section>

            <section className="recommended-section">
                <div className="section-header">
                    <h2>Recommended for You</h2>
                </div>
                <div className="courses-grid">
                    {recommendedCourses.map((course, index) => (
                        <div key={index} className="course-card">
                            <div className="course-image-container">
                                <img src={course.image} alt={course.title} className="course-image" />
                            </div>
                            <div className="course-body">
                                <h4 className="course-title">{course.title}</h4>
                                <div className="course-meta">
                                    <div className="meta-item">
                                        <img src="/photo_icons/price.png" alt="Price" />
                                        <span>{course.price}</span>
                                    </div>
                                    <div className="meta-item">
                                        <img src="/photo_icons/Timing.png" alt="Duration" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="meta-item">
                                        <img src="/photo_icons/Level.png" alt="Level" />
                                        <span>{course.level}</span>
                                    </div>
                                </div>
                                <div className="course-footer">
                                    <div className="instructor">
                                        <img src={course.instructorImage} alt={course.instructor} className="instructor-avatar" />
                                        <span>{course.instructor}</span>
                                    </div>
                                    <div className="rating">
                                        <img src="/photo_icons/Rating.png" alt="Rating" />
                                        <span>{course.rating}</span>
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