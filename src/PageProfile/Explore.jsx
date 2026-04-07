import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import "../config/i18n";
import "./Explore.css";

function Explore() {
    const pathname = location.pathname.split("/").filter((x) => x);
    const { t, i18n } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const explore = [
        {
            id: 1,
            image: "/photo_icons/Healthcare.png",
            title: "Healthcare",
        },
        {
            id: 2,
            image: "/photo_icons/Computer Science.png",
            title: "Computer Science",
        },
        {
            id: 3,
            image: "/photo_icons/Data Science.png",
            title: "Data Science",
        },
        {
            id: 4,
            image: "/photo_icons/Artificial Intelligence.png",
            title: "Artificial Intelligence",
        },
        {
            id: 5,
            image: "/photo_icons/Business.png",
            title: "Business",
        },
        {
            id: 6,
            image: "/photo_icons/Marketing.png",
            title: "Marketing",
        },
        {
            id: 7,
            image: "/photo_icons/Graphic Design.png",
            title: "Graphic Design",
        },
        {
            id: 8,
            image: "/photo_icons/Web Development.png",
            title: "Web Development",
        },
        {
            id: 9,
            image: "/photo_icons/Game Development.png",
            title: "Game Development",
        },
        {
            id: 10,
            image: "/photo_icons/Mobile Development.png",
            title: "Mobile Development",
        },
        {
            id: 11,
            image: "/photo_icons/UIUX Design.png",
            title: "UI / UX Design",
        },
        {
            id: 12,
            image: "/photo_icons/3D Modeling & Animation.png",
            title: "3D Modeling & Animation",
        },
        {
            id: 13,
            image: "/photo_icons/Photography & Videography.png",
            title: "Photography & Videography",
        },
    ]
    const courses = [
        {
            id: 1,
            image: "/Photo/Adobe Illustrator logo design.png",
            title: "Adobe Illustrator Logo Design",
            price: "$50",
            rating: "5.0",
            category: "Graphic Design",
            instructor: "Dimitri Abdelhak",
            duration: "1h",
            level: "Beginner",
            instructorImage: "/Photo/Dimitri Abdelhak.png",
            ratingImage: "/photo_icons/Rating.png",
            priceImage: "/photo_icons/price.png",
            durationImage: "/photo_icons/Timing.png",
            levelImage: "/photo_icons/Level.png",
        },
        {
            id: 2,
            image: "/Photo/Adobe Photoshop - Social media designs.png",
            title: "Adobe Photoshop - Social media designs",
            price: "$50",
            rating: "5.0",
            category: "Graphic Design",
            instructor: "Dimitri Abdelhak",
            duration: "1h",
            level: "Intermediate",
            instructorImage: "/Photo/Dimitri Abdelhak.png",
            ratingImage: "/photo_icons/Rating.png",
            priceImage: "/photo_icons/price.png",
            durationImage: "/photo_icons/Timing.png",
            levelImage: "/photo_icons/Level.png",
        },
        {
            id: 3,
            image: "/Photo/Adobe InDesign - Book cover designs.png",
            title: "Adobe InDesign - Book cover designs",
            price: "$50",
            rating: "5.0",
            category: "Graphic Design",
            instructor: "Dimitri Abdelhak",
            duration: "1h",
            level: "Advanced",
            instructorImage: "/Photo/Dimitri Abdelhak.png",
            ratingImage: "/photo_icons/Rating.png",
            priceImage: "/photo_icons/price.png",
            durationImage: "/photo_icons/Timing.png",
            levelImage: "/photo_icons/Level.png",
        },
        {
            id: 4,
            image: "/Photo/Adobe Premiere pro - Advertisements.png",
            title: "Adobe Premiere pro - Advertisements",
            price: "$100",
            rating: "4.1",
            category: "Graphic Design",
            instructor: "Alex Johnson",
            duration: "1h 30m",
            level: "Beginner",
            instructorImage: "/Photo/Alex Johnson.png",
            ratingImage: "/photo_icons/Rating.png",
            priceImage: "/photo_icons/price.png",
            durationImage: "/photo_icons/Timing.png",
            levelImage: "/photo_icons/Level.png",
        },
        {
            id: 5,
            image: "/Photo/Adobe After effects-Motion Graphics.png",
            title: "Adobe After effects - Motion Graphics",
            price: "$50",
            rating: "4.5",
            category: "Graphic Design",
            instructor: "George Smith",
            duration: "1h 30m",
            level: "Advanced",
            instructorImage: "/Photo/George Smith.png",
            ratingImage: "/photo_icons/Rating.png",
            priceImage: "/photo_icons/price.png",
            durationImage: "/photo_icons/Timing.png",
            levelImage: "/photo_icons/Level.png",
        },
        {
            id: 6,
            image: "/Photo/Adobe Audition-Acoustic engineering.png",
            title: "Adobe Audition-Acoustic engineering",
            price: "$50",
            rating: "4.5",
            category: "Graphic Design",
            instructor: "Adam Smith",
            duration: "1h 30m",
            level: "Advanced",
            instructorImage: "/Photo/Adam Smith.png",
            ratingImage: "/photo_icons/Rating.png",
            priceImage: "/photo_icons/price.png",
            durationImage: "/photo_icons/Timing.png",
            levelImage: "/photo_icons/Level.png",
        },
    ]
    const PageNumbers = [
        {
            id: 1,
            number: 1,
        },
        {
            id: 2,
            number: 2,
        },
        {
            id: 3,
            number: 3,
        },
        {
            id: 4,
            number: 4,
        },
        {
            id: 5,
            number: 5,
        },
    ]
    const Fillter = [
        {
            id: 1,
            title: "Price",
            icon: "/photo_icons/price.png",
            arrow: "/photo_icons/arrow-down.png",
        },
        {
            id: 2,
            title: "Time",
            icon: "/photo_icons/Timing.png",
            arrow: "/photo_icons/arrow-down.png",
        },
        {
            id: 3,
            title: "Level",
            icon: "/photo_icons/Level.png",
            arrow: "/photo_icons/arrow-down.png",
        },
        {
            id: 4,
            title: "Sort by",
            icon: "/photo_icons/Sort by.png",
            arrow: "/photo_icons/arrow-down.png",
        },
    ]
    const [FillterPrice, setFillterPrice] = useState(false);
    const [FillterTime, setFillterTime] = useState(false);
    const [FillterLevel, setFillterLevel] = useState(false);
    const [FillterSortBy, setFillterSortBy] = useState(false);
    const [FillterPriceOpen, setFillterPriceOpen] = useState(false);
    const [FillterTimeOpen, setFillterTimeOpen] = useState(false);
    const [FillterLevelOpen, setFillterLevelOpen] = useState(false);
    const [FillterSortByOpen, setFillterSortByOpen] = useState(false);
    return (
        <div className="explore">
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

            <div className="explore-container">
                <div className="explore-header">
                    <h1>Explore Courses</h1>
                    <p>Discover thousands of courses to start learning something new today</p>
                </div>
                <div className="explore-content">
                    {explore.map((item) => (
                        <button className="explore-item" key={item.id}>
                            <div className="explore-item-icon">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <p className="explore-item-text">{item.title}</p>
                        </button>
                    ))}
                </div>

                <div className="explore-content-courses">
                    <h3 className="total-courses">Showing {explore.length} results</h3>
                    <div className="courses-container-fillter">
                        {Fillter.map((item) => (
                            <div key={item.id} className="filter-item-container">
                                <div
                                    className="courses-container-fillter-item"
                                    onClick={() => {
                                        if (item.title === "Price") setFillterPrice(!FillterPrice);
                                        if (item.title === "Time") setFillterTime(!FillterTime);
                                        if (item.title === "Level") setFillterLevel(!FillterLevel);
                                        if (item.title === "Sort by") setFillterSortBy(!FillterSortBy);
                                    }}
                                >
                                    <img src={item.icon} alt={item.title} />
                                    <p className="courses-container-fillter-item-text">{item.title}</p>
                                    <img
                                        src={item.arrow}
                                        alt="arrow"
                                        style={{
                                            transition: 'transform 0.3s ease',
                                            transform: (
                                                (item.title === "Price" && FillterPrice) ||
                                                (item.title === "Time" && FillterTime) ||
                                                (item.title === "Level" && FillterLevel) ||
                                                (item.title === "Sort by" && FillterSortBy)
                                            ) ? 'rotate(180deg)' : 'rotate(0)'
                                        }}
                                    />
                                </div>

                                {item.title === "Price" && FillterPrice && (
                                    <div className="courses-container-fillter-price">
                                        <div className="fillter-price-option">Less than $50</div>
                                        <div className="fillter-price-option">More than $50</div>
                                        <div className="fillter-price-option">$100 - $200</div>
                                    </div>
                                )}
                                {item.title === "Time" && FillterTime && (
                                    <div className="courses-container-fillter-price">
                                        <div className="fillter-time-option">Less than 10 hours</div>
                                        <div className="fillter-time-option">More than 10 hours</div>
                                        <div className="fillter-time-option">10 - 20 hours</div>
                                    </div>
                                )}
                                {item.title === "Level" && FillterLevel && (
                                    <div className="courses-container-fillter-price">
                                        <div className="fillter-level-option">Beginner</div>
                                        <div className="fillter-level-option">Intermediate</div>
                                        <div className="fillter-level-option">Advanced</div>
                                    </div>
                                )}
                                {item.title === "Sort by" && FillterSortBy && (
                                    <div className="courses-container-fillter-price">
                                        <div className="fillter-sort-by-option">Newest</div>
                                        <div className="fillter-sort-by-option">Oldest</div>
                                        <div className="fillter-sort-by-option">Most Popular</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="courses-container">
                        {courses.map((courses) => {
                            return (
                                <div className="course-item">
                                    <div className="course-item-image">
                                        <img src={courses.image} alt={courses.title}></img>
                                    </div>
                                    <div className="course-info">
                                        <h3 className="course-title">{courses.title}</h3>
                                        <div className="course-info-PRL">
                                            <div className="course-info-PRL-item">
                                                <img src={courses.priceImage} alt="price" />
                                                <p className="course-price">{courses.price}</p>
                                            </div>
                                            <div className="course-info-PRL-item">
                                                <img src={courses.durationImage} alt="duration" />
                                                <p className="course-duration">{courses.duration}</p>
                                            </div>
                                            <div className="course-info-PRL-item">
                                                <img src={courses.levelImage} alt="level" />
                                                <p className="course-level">{courses.level}</p>
                                            </div>
                                        </div>
                                        <div className="course-info-IR">
                                            <div className="course-info-IR-item">
                                                <img src={courses.instructorImage} alt="instructor" />
                                                <p className="course-instructor">{courses.instructor}</p>
                                            </div>
                                            <div className="course-info-IR-item">
                                                <img src={courses.ratingImage} alt="rating" />
                                                <p className="course-rating">{courses.rating}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="courses-container-footer">
                    <div className="page-number-item-arrow" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                        <ChevronLeft size={30} />
                    </div>

                    {Array.from({ length: 5 }, (_, i) => i + 1).map((pageNumber) => {
                        return (
                            <div className={`page-number ${currentPage === pageNumber ? "active" : ""}`} key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>
                                <p>{pageNumber}</p>
                            </div>
                        )
                    })}
                    <div className="page-number-item-arrow" onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}>
                        <ChevronRight size={30} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Explore;