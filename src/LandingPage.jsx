import { useState } from "react";
import "./LandingPage.css";
import SignIn from "./sign_page/sign_in";
function LandingPage() {
    return (
        <>
            <div className="landing-page">
                <div className="page-content">
                    <h1 className="page-title">Master new skills with <h1 className="page-title-2">world-class mentors</h1></h1>
                    <p className="page-description">Join over 10,000 students learning design, development, and business strategies. Start your journey today.</p>
                </div>
                {/*buttons about sign in or view courses*/}
                <div className="auth-buttons">
                    <button className="Started">Get Started For free</button>
                    <button className="View-courses">View all courses</button>
                </div>
                <div className="popular-courses-section">
                    <h2 className="popular-courses-title">Popular Courses</h2>
                    <div className="courses-container">
                        {/* One course card */}
                        <div className="Courses_info">
                            <div className="course-card">
                                <img className="course-image" src="./Photo/Adobe Illustrator logo design.png" alt="Adobe Illustrator logo design" />
                                <div className="course-content">
                                    <p className="Name_course">Adobe Illustrator - logos design</p>
                                    <div className="course-details-row">
                                        <div className="price_info">
                                            <img className="price-icon" src="./photo_icons/price.png" alt="price" />
                                            <p className="price">$50</p>
                                        </div>
                                        <div className="timing_info">
                                            <img className="timing-icon" src="./photo_icons/Timing.png" alt="Timing" />
                                            <p className="Timing">1 h</p>
                                        </div>
                                        <div className="level_info">
                                            <img className="level-icon" src="./photo_icons/Level.png" alt="Level" />
                                            <p className="Level">Beginner</p>
                                        </div>
                                    </div>
                                    <div className="course-instructor-row">
                                        <div className="teacher_info">
                                            <img className="teacher-image" src="./Photo/Dimitri Abdelhak.png" alt="Dimitri Abdelhak" />
                                            <p className="Teacher">Dimitri Abdelhak</p>
                                        </div>
                                        <div className="rating_info">
                                            <img className="rating-icon" src="./photo_icons/Rating.png" alt="Rating" />
                                            <p className="Rating">5.0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Two courses card */}
                        <div className="Courses_info">
                            <div className="course-card">
                                <img className="course-image" src="./Photo/Adobe Photoshop - Social media designs.png" alt="Adobe Photoshop - Social media designs" />
                                <div className="course-content">
                                    <p className="Name_course">Adobe Photoshop - Social media designs</p>
                                    <div className="course-details-row">
                                        <div className="price_info">
                                            <img className="price-icon" src="./photo_icons/price.png" alt="price" />
                                            <p className="price">$50</p>
                                        </div>
                                        <div className="timing_info">
                                            <img className="timing-icon" src="./photo_icons/Timing.png" alt="Timing" />
                                            <p className="Timing">1 h</p>
                                        </div>
                                        <div className="level_info">
                                            <img className="level-icon" src="./photo_icons/Level.png" alt="Level" />
                                            <p className="Level">Intermediate</p>
                                        </div>
                                    </div>
                                    <div className="course-instructor-row">
                                        <div className="teacher_info">
                                            <img className="teacher-image" src="./Photo/Dimitri Abdelhak.png" alt="Dimitri Abdelhak" />
                                            <p className="Teacher">Dimitri Abdelhak</p>
                                        </div>
                                        <div className="rating_info">
                                            <img className="rating-icon" src="./photo_icons/Rating.png" alt="Rating" />
                                            <p className="Rating">5.0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*Three courses card */}
                        <div className="Courses_info">
                            <div className="course-card">
                                <img className="course-image" src="./Photo/Adobe InDesign - Book cover designs.png" alt="Adobe InDesign - Book cover designs" />
                                <div className="course-content">
                                    <p className="Name_course">Adobe InDesign - Book cover designs</p>
                                    <div className="course-details-row">
                                        <div className="price_info">
                                            <img className="price-icon" src="./photo_icons/price.png" alt="price" />
                                            <p className="price">$50</p>
                                        </div>
                                        <div className="timing_info">
                                            <img className="timing-icon" src="./photo_icons/Timing.png" alt="Timing" />
                                            <p className="Timing">1 h</p>
                                        </div>
                                        <div className="level_info">
                                            <img className="level-icon" src="./photo_icons/Level.png" alt="Level" />
                                            <p className="Level">Intermediate</p>
                                        </div>
                                    </div>
                                    <div className="course-instructor-row">
                                        <div className="teacher_info">
                                            <img className="teacher-image" src="./Photo/Dimitri Abdelhak.png" alt="Dimitri Abdelhak" />
                                            <p className="Teacher">Dimitri Abdelhak</p>
                                        </div>
                                        <div className="rating_info">
                                            <img className="rating-icon" src="./photo_icons/Rating.png" alt="Rating" />
                                            <p className="Rating">5.0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LandingPage
