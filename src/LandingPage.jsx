import { useNavigate } from "react-router-dom";
import { CircleDollarSign, Clock, SlidersHorizontal, Star } from "lucide-react";
import "./LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="landing-page">
                <div className="page-content">
                    <h1 className="page-title">Master new skills with <h1 className="page-title-2">world-class mentors</h1></h1>
                    <p className="page-description">Join over 10,000 students learning design, development, and business strategies. Start your journey today.</p>
                </div>
                {/*buttons about sign in or view courses*/}
                <div className="auth-buttons">
                    <button className="Started" onClick={() => navigate("/sign_up")}>Get Started For free</button>
                    <button className="View-courses" onClick={() => navigate("/Explore")}>View all courses</button>
                </div>
                <div className="popular-courses-section">
                    <h2 className="popular-courses-title">Popular Courses</h2>
                    <div className="courses-container">
                        {[
                            {
                                image: "/Photo/Adobe Illustrator logo design.png",
                                title: "Adobe Illustrator - logos design",
                                price: "$50",
                                duration: "1 h",
                                level: "Beginner",
                                instructor: "Dimitri Abdelhak",
                                instructorImage: "/Photo/Dimitri Abdelhak.png",
                                rating: "5.0"
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
                            }
                        ].map((course, index) => (
                            <div className="landing-course-item" key={index}>
                                <div className="course-item-image">
                                    <img src={course.image} alt={course.title} />
                                </div>
                                <div className="course-info">
                                    <h3 className="course-title">{course.title}</h3>
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
        </>
    )
}
export default LandingPage
