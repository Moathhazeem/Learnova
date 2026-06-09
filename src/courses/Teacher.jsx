import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import i18n from "../config/i18n";
import './Teacher.css';
import { MessageCircle, Phone, Mail, MapPin, Languages, ExternalLink, ListFilter, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';

function Teacher() {
    const { t } = useTranslation();
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);

    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [selectedSort, setSelectedSort] = useState("All");
    const [expandedFilter, setExpandedFilter] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        Level: [],
        Price: [],
        Rating: [],
        Duration: [],
        Topic: []
    });

    const handleFilterChange = (category, option) => {
        setSelectedFilters(prev => {
            const currentOptions = prev[category];
            const newOptions = currentOptions.includes(option)
                ? currentOptions.filter(item => item !== option)
                : [...currentOptions, option];
            return { ...prev, [category]: newOptions };
        });
    };

    const clearFilters = () => {
        setSelectedFilters({
            Level: [],
            Price: [],
            Rating: [],
            Duration: [],
            Topic: []
        });
    };

    const EducationalBackground = [
        {
            id: 1,
            photo: "/Photo/Savannah_College_of_Art_and_Design_seal.png",
            title: t("teacher.educational_background_item_1", "Savannah College of Art and Design"),
            degree: t("teacher.educational_background_item_1_certificate", "Bachelor of Fine Arts (BFA) in Graphic Design"),
            date: t("teacher.educational_background_item_1_date", "Sep 2010 – May 2014"),
        },
        {
            id: 2,
            photo: "/Photo/Yale_School_of_Art.png",
            title: t("teacher.educational_background_item_2", "Yale School of Art"),
            degree: t("teacher.educational_background_item_2_certificate", "Master of Fine Arts (MFA) in Graphic Design"),
            date: t("teacher.educational_background_item_2_date", "Sep 2015 – May 2017"),
        },
    ];

    const CoursesList = [
        {
            id: 1,
            title: "Adobe illustrator - logos design",
            duration: "1 month",
            durationHours: 20,
            status: "Live",
            price: "$50",
            priceValue: 50,
            priceType: "Paid",
            statusColor: "#4CAF50",
            level: "Intermediate",
            rating: 4.8,
            topic: "Graphic Design",
            popularity: 95
        },
        {
            id: 2,
            title: "Photoshop — Social media designs",
            duration: "1 month",
            durationHours: 15,
            status: "Soon",
            price: "$50",
            priceValue: 50,
            priceType: "Paid",
            statusColor: "#FFC107",
            level: "Beginner",
            rating: 4.5,
            topic: "Graphic Design",
            popularity: 88
        },
        {
            id: 3,
            title: "Adobe — Book Cover designs",
            duration: "1 month",
            durationHours: 10,
            status: "Unavailable",
            price: "Free",
            priceValue: 0,
            priceType: "Free",
            statusColor: "#BDBDBD",
            level: "Expert",
            rating: 4.2,
            topic: "Graphic Design",
            popularity: 70
        },
        {
            id: 4,
            title: "Adobe Premiere - Advertisements",
            duration: "1 month",
            durationHours: 25,
            status: "Ended",
            price: "$50",
            priceValue: 50,
            priceType: "Paid",
            statusColor: "#F44336",
            level: "Intermediate",
            rating: 3.8,
            topic: "Video Editing",
            popularity: 60
        },
        {
            id: 5,
            title: "Web Design Fundamentals",
            duration: "2 weeks",
            durationHours: 5,
            status: "Live",
            price: "Free",
            priceValue: 0,
            priceType: "Free",
            statusColor: "#4CAF50",
            level: "Beginner",
            rating: 4.6,
            topic: "Web Design",
            popularity: 92
        }
    ];

    const sortOptions = ["All", "Most Popular", "Highest Rated", "Price Low", "Price High", "Shortest", "Longest"];
    const filterOptions = [
        { name: "Level", options: ["Beginner", "Intermediate", "Expert"] },
        { name: "Price", options: ["Free", "Paid"] },
        { name: "Rating", options: ["4.5 & up", "4.0 & up", "3.5 & up"] },
        { name: "Duration", options: ["0-2 Hours", "3-6 Hours", "6-12 Hours", "17+ Hours"] },
        { name: "Topic", options: ["Graphic Design", "Web Design", "UI/UX", "Marketing", "Video Editing"] }
    ];

    const filteredAndSortedCourses = CoursesList.filter(course => {
        // Level filter
        if (selectedFilters.Level.length > 0 && !selectedFilters.Level.includes(course.level)) {
            return false;
        }
        // Price filter
        if (selectedFilters.Price.length > 0 && !selectedFilters.Price.includes(course.priceType)) {
            return false;
        }
        // Rating filter
        if (selectedFilters.Rating.length > 0) {
            const minRating = Math.min(...selectedFilters.Rating.map(r => parseFloat(r.split(" ")[0])));
            if (course.rating < minRating) return false;
        }
        // Topic filter
        if (selectedFilters.Topic.length > 0 && !selectedFilters.Topic.includes(course.topic)) {
            return false;
        }
        // Duration filter
        if (selectedFilters.Duration.length > 0) {
            const matchesDuration = selectedFilters.Duration.some(range => {
                if (range === "0-2 Hours") return course.durationHours <= 2;
                if (range === "3-6 Hours") return course.durationHours > 2 && course.durationHours <= 6;
                if (range === "6-12 Hours") return course.durationHours > 6 && course.durationHours <= 12;
                if (range === "17+ Hours") return course.durationHours >= 17;
                return true;
            });
            if (!matchesDuration) return false;
        }
        return true;
    }).sort((a, b) => {
        if (selectedSort === "Price Low") return a.priceValue - b.priceValue;
        if (selectedSort === "Price High") return b.priceValue - a.priceValue;
        if (selectedSort === "Highest Rated") return b.rating - a.rating;
        if (selectedSort === "Most Popular") return b.popularity - a.popularity;
        if (selectedSort === "Shortest") return a.durationHours - b.durationHours;
        if (selectedSort === "Longest") return b.durationHours - a.durationHours;
        return 0;
    });

    return (
        <div className="teacher-page">
            <div className="container">
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

                <div className="teacher-main-layout">
                    {/* Left Column: Side Info */}
                    <div className="teacher-sidebar">
                        <div className="teacher-card">
                            <img className="teacher-image" src="/Photo/Dimitri Abdelhak.png" alt="Teacher" />
                            <div className="teacher-details">
                                <div className="name-and-icons">
                                    <h2 className="teacher-name">
                                        {t("setting.teacher_name", "Dimitri Abdelhak")}
                                    </h2>
                                    <div className="teacher-icons">
                                        <div className="icon-wrapper">
                                            <MessageCircle size={24} color="currentColor" />
                                        </div>
                                        <div className="icon-wrapper">
                                            <Phone size={24} color="currentColor" />
                                        </div>
                                    </div>
                                </div>
                                <p className="teacher-work">
                                    {t("setting.teacher_work", "Teacher on Learnova")}
                                </p>
                            </div>
                        </div>

                        <div className="about-me-card">
                            <h3 className="about-me-title">{t("teacher.about_me", "About me")}</h3>
                            <p className="about-me-text">
                                {t("teacher.about_me_desc", "Hello! I'm Dimitri Abdelhak, a passionate graphic designer and educator with over 10 years of experience. I specialize in Photoshop, Illustrator, and InDesign, helping students turn their creative ideas into professional projects.")}
                            </p>
                        </div>

                        <div className="contact-info-card">
                            <h3 className="contact-info-title">{t("teacher.contact_info", "Contact Info")}</h3>
                            
                            <div className="contact-section">
                                <span className="contact-label">{t("teacher.location_label", "Location")}</span>
                                <div className="contact-detail">
                                    <MapPin size={20} color="#0089EA" />
                                    <p className="contact-text">{t("teacher.location_value", "Paris, France")}</p>
                                </div>
                            </div>

                            <div className="contact-section">
                                <span className="contact-label">{t("teacher.email_label", "Email")}</span>
                                <div className="contact-detail">
                                    <Mail size={20} color="#0089EA" />
                                    <p className="contact-text">{t("teacher.email_value", "Dimitriabdelhak@gmail.com")}</p>
                                </div>
                            </div>

                            <div className="contact-section">
                                <span className="contact-label">{t("teacher.languages_label", "Languages")}</span>
                                <div className="contact-detail">
                                    <Languages size={20} color="#0089EA" />
                                    <p className="contact-text">{t("teacher.languages_value", "English, French")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Main Content */}
                    <div className="teacher-main-content">
                        <div className="educational-background-card">
                            <h3 className="educational-background-title">{t("teacher.educational_background", "Educational Background")}</h3>
                            <div className="edu-list">
                                {EducationalBackground.map((item) => (
                                    <div key={item.id} className="edu-item">
                                        <div className="edu-left">
                                            <img className="edu-photo" src={item.photo} alt={item.title} />
                                            <div className="edu-info">
                                                <h4 className="edu-title">{item.title}</h4>
                                                <p className="edu-degree">{item.degree}</p>
                                                <p className="edu-date">{item.date}</p>
                                            </div>
                                        </div>
                                        <div className="edu-right">
                                            <Link to="#" className="show-certificate-link">
                                                {t("teacher.show_certificate", "Show certificate")}
                                                <ExternalLink size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="teacher-courses-card">
                            <div className="courses-header">
                                <h3 className="courses-title">{t("teacher.courses", "Courses")}</h3>
                                <div className="courses-actions">
                                    <div className="dropdown-wrapper">
                                        <button className="action-btn sort-btn" onClick={() => { setShowSortDropdown(!showSortDropdown); setShowFilterDropdown(false); }}>
                                            <ListFilter size={18} />
                                            {t("teacher.sort_by", `Sort by : ${selectedSort}`)}
                                        </button>
                                        {showSortDropdown && (
                                            <div className="dropdown-menu sort-menu">
                                                <div className="dropdown-header">
                                                    <ListFilter size={18} />
                                                    <span>{t("teacher.sort_by_short", "Sort by : All")}</span>
                                                </div>
                                                {sortOptions.map(option => (
                                                    <div key={option} className="dropdown-item" onClick={() => { setSelectedSort(option); setShowSortDropdown(false); }}>
                                                        {option}
                                                        {selectedSort === option && <Check size={16} className="check-icon" />}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="dropdown-wrapper">
                                        <button className="action-btn filter-btn" onClick={() => { setShowFilterDropdown(!showFilterDropdown); setShowSortDropdown(false); }}>
                                            <SlidersHorizontal size={18} />
                                            {t("teacher.filter", "Filter")}
                                        </button>
                                        {showFilterDropdown && (
                                            <div className="dropdown-menu filter-menu">
                                                <div className="dropdown-header">
                                                    <div className="header-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <SlidersHorizontal size={18} />
                                                            <span>{t("teacher.filter_short", "Filter")}</span>
                                                        </div>
                                                        <button 
                                                            className="clear-filters-btn" 
                                                            onClick={clearFilters}
                                                        >
                                                            {t("teacher.clear_all", "Clear All")}
                                                        </button>
                                                    </div>
                                                </div>
                                                {filterOptions.map(section => (
                                                    <div key={section.name} className="filter-section-wrapper">
                                                        <div 
                                                            className="dropdown-item filter-item" 
                                                            onClick={() => setExpandedFilter(expandedFilter === section.name ? null : section.name)}
                                                        >
                                                            {section.name}
                                                            <ChevronDown 
                                                                size={18} 
                                                                style={{ transform: expandedFilter === section.name ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} 
                                                            />
                                                        </div>
                                                        {expandedFilter === section.name && (
                                                            <div className="sub-filter-menu">
                                                                {section.options.map(option => (
                                                                    <div key={option} className="sub-filter-item">
                                                                        <label>
                                                                            <input 
                                                                                type="checkbox" 
                                                                                checked={selectedFilters[section.name].includes(option)}
                                                                                onChange={() => handleFilterChange(section.name, option)}
                                                                            />
                                                                            <span>{option}</span>
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="courses-table">
                                {filteredAndSortedCourses.length > 0 ? (
                                    filteredAndSortedCourses.map((course) => (
                                        <div key={course.id} className="course-row">
                                            <div className="course-col title-col">
                                                <p>{course.title}</p>
                                            </div>
                                            <div className="course-col duration-col">
                                                <p>{course.duration}</p>
                                            </div>
                                            <div className="course-col status-col">
                                                <p className="status-text" style={{ color: course.statusColor }}>
                                                    {course.status}
                                                </p>
                                            </div>
                                            <div className="course-col price-col">
                                                <p>{course.price}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-results">
                                        <p>{t("teacher.no_courses_found", "No courses match your selected filters.")}</p>
                                        <button className="clear-all-btn" onClick={clearFilters}>
                                            {t("teacher.clear_all_filters", "Clear all filters")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teacher;
