import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Pencil, Search, X, CircleDollarSign, Clock, SlidersHorizontal, User, Star } from "lucide-react";
import "../config/i18n";
import "./Explore.css";

function Explore() {
    const navigate = useNavigate();
    const location = useLocation();
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
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
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
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
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
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
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
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
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
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
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
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
        },
        {
            id: 7,
            image: "/Photo/Adobe Illustrator logo design.png",
            title: "Advanced Logo Illustration",
            price: "$75",
            rating: "4.8",
            category: "Graphic Design",
            instructor: "Dimitri Abdelhak",
            duration: "2h",
            level: "Advanced",
            instructorImage: "/Photo/Dimitri Abdelhak.png",
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
        },
        {
            id: 8,
            image: "/Photo/Adobe Photoshop - Social media designs.png",
            title: "Social Media Masterclass",
            price: "$40",
            rating: "4.9",
            category: "Graphic Design",
            instructor: "Alex Johnson",
            duration: "3h",
            level: "Intermediate",
            instructorImage: "/Photo/Alex Johnson.png",
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
        },
        {
            id: 9,
            image: "/Photo/Adobe InDesign - Book cover designs.png",
            title: "Editorial Design Basics",
            price: "$60",
            rating: "4.7",
            category: "Graphic Design",
            instructor: "George Smith",
            duration: "2h 30m",
            level: "Beginner",
            instructorImage: "/Photo/George Smith.png",
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
        },
        {
            id: 10,
            image: "/Photo/Adobe Premiere pro - Advertisements.png",
            title: "Video Editing Essentials",
            price: "$120",
            rating: "4.6",
            category: "Graphic Design",
            instructor: "Adam Smith",
            duration: "4h",
            level: "Intermediate",
            instructorImage: "/Photo/Adam Smith.png",
            ratingIcon: <Star size={16} className="text-yellow-500 fill-yellow-500" />,
            priceIcon: <CircleDollarSign size={18} className="text-gray-500" />,
            durationIcon: <Clock size={18} className="text-gray-500" />,
            levelIcon: <SlidersHorizontal size={18} className="text-gray-500" />,
            path: "/Explore/Course"
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
    const [selectedFilter, setSelectedFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchInputRef = useRef(null);

    const handleClearSearch = () => {
        setSearchQuery("");
        searchInputRef.current?.focus();
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Escape") {
            handleClearSearch();
            searchInputRef.current?.blur();
        }
    };
    const coursesPerPage = 9;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.filter-item-container')) {
                setFillterPrice(false);
                setFillterTime(false);
                setFillterLevel(false);
                setFillterSortBy(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedFilter, searchQuery]);

    const filterCourses = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;
        if (!selectedFilter || selectedFilter === "All") return true;

        // Category Filter
        const categories = explore.map(item => item.title);
        if (categories.includes(selectedFilter)) {
            return course.category === selectedFilter;
        }

        const price = parseInt(course.price.replace("$", ""));
        const hours = parseInt(course.duration);

        // Level Filters
        if (["Beginner", "Intermediate", "Advanced"].includes(selectedFilter)) {
            return course.level === selectedFilter;
        }

        // Price Filters
        if (selectedFilter === "Less or equal than $50") return price <= 50;
        if (selectedFilter === "More than $50") return price > 50;
        if (selectedFilter === "More than $100") return price >= 100;

        // Time Filters
        if (selectedFilter === "Less than 10 hours") return hours < 10;
        if (selectedFilter === "More than 10 hours") return hours > 10;
        if (selectedFilter === "10 - 20 hours") return hours >= 10 && hours <= 20;

        return true;
    });

    const totalPagesCount = Math.ceil(filterCourses.length / coursesPerPage);
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filterCourses.slice(indexOfFirstCourse, indexOfLastCourse);

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
                    const translationKey = value.toLowerCase().replace("%20", "_").replace(" ", "_");

                    return (
                        <span key={to} style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="breadcrumb-separator">
                                {t("setting.breadcrumb_separator", ">")}
                            </span>
                            {isLast ? (
                                <span className="current-page">
                                    {t(`setting.${translationKey}`, decodeURIComponent(value))}
                                </span>
                            ) : (
                                <Link to={to} className="Breadcrumbs">
                                    {t(`setting.${translationKey}`, decodeURIComponent(value))}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </nav>

            <div className="explore-container">
                <div className="explore-header-section">
                    <div className="explore-header">
                        <h1>{t("explore.title", "Explore Courses")}</h1>
                        <p>{t("explore.subtitle", "Discover thousands of courses to start learning something new today")}</p>
                    </div>
                    <div className="search-bar-container">
                        <div
                            className={`search-input-wrapper ${isSearchFocused ? "is-focused" : ""} ${searchQuery ? "has-value" : ""}`}
                        >
                            <span className="search-icon-badge" style={{ cursor: 'default' }} aria-hidden="true">
                                <Search size={18} strokeWidth={2.25} style={{ opacity: 0.6 }} />
                            </span>
                            <input
                                id="explore-search"
                                ref={searchInputRef}
                                type="search"
                                enterKeyHint="search"
                                autoComplete="off"
                                placeholder={t("explore.search_placeholder", "Courses, skills, or instructors...")}
                                className="explore-search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                onKeyDown={handleSearchKeyDown}
                                aria-label={t("explore.search_placeholder", "Courses, skills, or instructors...")}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="search-clear-btn"
                                    onClick={handleClearSearch}
                                    aria-label={t("explore.clear_search", "Clear")}
                                >
                                    <X size={16} strokeWidth={2.5} />
                                </button>
                            )}
                        </div>
                        {searchQuery && (
                            <p className="search-live-hint" role="status">
                                {t("explore.searching_for", "Filtering results for")}{" "}
                                <strong>&ldquo;{searchQuery}&rdquo;</strong>
                            </p>
                        )}
                    </div>
                </div>

                <div className="explore-content">
                    <div
                        className={`explore-item ${selectedFilter === "All" || selectedFilter === "" ? "active" : ""}`}
                        onClick={() => setSelectedFilter("All")}
                    >
                        <p className="explore-item-text">All Categories</p>
                    </div>
                    {explore.map((item) => (
                        <div
                            className={`explore-item ${selectedFilter === item.title ? "active" : ""}`}
                            key={item.id}
                            onClick={() => setSelectedFilter(item.title)}
                        >
                            <div className="explore-item-icon">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <p className="explore-item-text">{item.title}</p>
                        </div>
                    ))}
                </div>

                <div className="explore-content-courses">
                    <div className="courses-toolbar">
                        <div className="courses-toolbar-info">
                            <h3 className="total-courses">
                                {t("explore.showing", "Showing")}{" "}
                                <span className="results-highlight">{filterCourses.length}</span>{" "}
                                {t("explore.results", "results")}
                            </h3>
                            <p className="courses-toolbar-hint">
                                {t("explore.filter_hint", "Refine your search with the filters below")}
                            </p>
                        </div>
                        <div className="courses-container-fillter">
                            {Fillter.map((item) => (
                                <div key={item.id} className="filter-item-container">
                                    <div
                                        className={`courses-container-fillter-item ${(
                                            (item.title === "Price" && FillterPrice) ||
                                            (item.title === "Time" && FillterTime) ||
                                            (item.title === "Level" && FillterLevel) ||
                                            (item.title === "Sort by" && FillterSortBy)
                                        ) ? 'active' : ''}`}
                                        onClick={() => {
                                            if (item.title === "Price") {
                                                setFillterPrice(!FillterPrice);
                                                setFillterTime(false);
                                                setFillterLevel(false);
                                                setFillterSortBy(false);
                                            }
                                            if (item.title === "Time") {
                                                setFillterTime(!FillterTime);
                                                setFillterPrice(false);
                                                setFillterLevel(false);
                                                setFillterSortBy(false);
                                            }
                                            if (item.title === "Level") {
                                                setFillterLevel(!FillterLevel);
                                                setFillterPrice(false);
                                                setFillterTime(false);
                                                setFillterSortBy(false);
                                            }
                                            if (item.title === "Sort by") {
                                                setFillterSortBy(!FillterSortBy);
                                                setFillterPrice(false);
                                                setFillterTime(false);
                                                setFillterLevel(false);
                                            }
                                        }}
                                    >
                                        <span className="filter-icon-wrap">
                                            <img src={item.icon} alt="" aria-hidden="true" />
                                        </span>
                                        <p className="courses-container-fillter-item-text">{item.title}</p>
                                        <img
                                            src={item.arrow}
                                            alt="arrow"
                                            className="filter-arrow"
                                            style={{
                                                transform: (
                                                    (item.title === "Price" && FillterPrice) ||
                                                    (item.title === "Time" && FillterTime) ||
                                                    (item.title === "Level" && FillterLevel) ||
                                                    (item.title === "Sort by" && FillterSortBy)
                                                ) ? 'rotate(180deg)' : 'rotate(0)'
                                            }}
                                        />
                                    </div>

                                    {(
                                        (item.title === "Price" && FillterPrice) ||
                                        (item.title === "Time" && FillterTime) ||
                                        (item.title === "Level" && FillterLevel) ||
                                        (item.title === "Sort by" && FillterSortBy)
                                    ) && (
                                            <div className="filter-dropdown">
                                                {item.title === "Price" && (
                                                    <>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("All"); setFillterPrice(false); }}>All Prices</div>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("Less or equal than $50"); setFillterPrice(false); }}>Less or equal than $50</div>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("More than $50"); setFillterPrice(false); }}>More than $50</div>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("More than $100"); setFillterPrice(false); }}>More than $100</div>
                                                    </>
                                                )}
                                                {item.title === "Time" && (
                                                    <>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("All"); setFillterTime(false); }}>All Times</div>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("Less than 10 hours"); setFillterTime(false); }}>Less than 10 hours</div>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("More than 10 hours"); setFillterTime(false); }}>More than 10 hours</div>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("10 - 20 hours"); setFillterTime(false); }}>10 - 20 hours</div>
                                                    </>
                                                )}
                                                {item.title === "Level" && (
                                                    <>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("All"); setFillterLevel(false); }}>All Levels</div>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("Beginner"); setFillterLevel(false); }}>Beginner</div>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("Intermediate"); setFillterLevel(false); }}>Intermediate</div>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("Advanced"); setFillterLevel(false); }}>Advanced</div>
                                                    </>
                                                )}
                                                {item.title === "Sort by" && (
                                                    <>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("All"); setFillterSortBy(false); }}>All Sorts</div>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("Newest"); setFillterSortBy(false); }}>Newest</div>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("Oldest"); setFillterSortBy(false); }}>Oldest</div>
                                                        <div className="filter-option" onClick={() => { setSelectedFilter("Most Popular"); setFillterSortBy(false); }}>Most Popular</div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="courses-container">
                        {currentCourses.length > 0 ? (
                            currentCourses.map((course) => {
                                return (
                                    <div className="course-item" key={course.id} onClick={() => {
                                        if (course.title === "Adobe Illustrator Logo Design") {
                                            navigate("/Explore/Course");
                                        }
                                    }}>
                                        <div className="course-item-image">
                                            <img src={course.image} alt={course.title} />
                                            <div className="course-category-badge">{course.category}</div>
                                        </div>
                                        <div className="course-info">
                                            <h3 className="course-title">{course.title}</h3>
                                            <div className="course-info-PRL">
                                                <div className="course-info-PRL-item">
                                                    <div className="course-price-icon">{course.priceIcon}</div>
                                                    <p className="course-price">{course.price}</p>
                                                </div>
                                                <div className="course-info-PRL-item">
                                                    <div className="course-duration-icon">{course.durationIcon}</div>
                                                    <p className="course-duration">{course.duration}</p>
                                                </div>
                                                <div className="course-info-PRL-item">
                                                    <div className="course-level-icon">{course.levelIcon}</div>
                                                    <p className="course-level">{course.level}</p>
                                                </div>
                                            </div>
                                            <div className="course-info-IR">
                                                <div className="course-info-IR-item">
                                                    <img src={course.instructorImage} alt="instructor" />
                                                    <p className="course-instructor">{course.instructor}</p>
                                                </div>
                                                <div className="course-info-IR-item">
                                                    <div className="course-rating-icon">{course.ratingIcon}</div>
                                                    <p className="course-rating">{course.rating}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '300px', color: '#666363', gap: '20px', gridColumn: '1 / -1' }}>
                                <img src="/photo_icons/book.png" alt="No Results" style={{ width: '80px', opacity: '0.5' }} />
                                <h3 style={{ fontSize: '28px' }}>No results found</h3>
                                <p style={{ fontSize: '20px' }}>Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>
                </div>
                {totalPagesCount > 1 && (
                    <div className="courses-container-footer">
                        <div className="page-number-item-arrow" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                            <ChevronLeft size={30} />
                        </div>

                        {Array.from({ length: totalPagesCount }, (_, i) => i + 1).map((pageNumber) => {
                            return (
                                <div className={`page-number ${currentPage === pageNumber ? "active" : ""}`} key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>
                                    <p>{pageNumber}</p>
                                </div>
                            )
                        })}
                        <div className="page-number-item-arrow" onClick={() => setCurrentPage(Math.min(totalPagesCount, currentPage + 1))}>
                            <ChevronRight size={30} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Explore;