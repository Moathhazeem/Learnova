import React, { useState } from "react";
// 1. تصحيح الـ Imports من react-i18next
import { useTranslation } from 'react-i18next';
// 2. دمج imports الـ react-router-dom في سطر واحد
import { useNavigate, Link, useLocation } from "react-router-dom";
// 3. تغيير ChevronLeft إلى ChevronRight لتطابق الاستخدام في الأسفل
import { ChevronRight, ChevronDown, Bookmark, Search, Grid, BarChart, Clock, Trash2, DollarSign, Signal, Star, Tag } from "lucide-react";
import "./Save.css";

function Save() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname.split('/').filter(x => x);
    const { t } = useTranslation();

    // 3 mock courses matching the "3 items saved" initially
    const [savedCourses, setSavedCourses] = useState([
        {
            id: 1,
            title: "Adobe Illustrator - logos design",
            image: "Photo/Adobe Illustrator logo design.png",
            price: "$50",
            duration: "1 h",
            level: "Beginer",
            instructorName: "Dimitri Abdelhak",
            instructorAvatar: "Photo/Dimitri Abdelhak.png",
            rating: "5.0"
        },
        {
            id: 2,
            title: "Adobe Photoshop - Social media designs",
            image: "Photo/Adobe Photoshop - Social media designs.png",
            price: "$45",
            duration: "2.5 h",
            level: "Beginer",
            instructorName: "Adam Smith",
            instructorAvatar: "Photo/Adam Smith.png",
            rating: "4.8"
        },
        {
            id: 3,
            title: "Adobe After effects - Motion Graphics",
            image: "Photo/Adobe After effects-Motion Graphics.png",
            price: "$60",
            duration: "3 h",
            level: "Intermediate",
            instructorName: "George Smith",
            instructorAvatar: "Photo/George Smith.png",
            rating: "4.9"
        }
    ]);

    const [searchQuery, setSearchQuery] = useState("");

    const handleDelete = (id) => {
        setSavedCourses(prevCourses => prevCourses.filter(course => course.id !== id));
    };

    // Filter courses based on search query
    const filteredCourses = savedCourses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="Save-page">
            <div className="Save-container">
                {/* Breadcrumbs */}
                <nav className="breadcrumbs-nav">
                    <Link to="/Home" className="Breadcrumbs">
                        {t('setting.home', 'Home')}
                    </Link>
                    {pathname.map((value, index) => {
                        const to = '/' + pathname.slice(0, index + 1).join('/');
                        const isLast = index === pathname.length - 1;
                        const translationKey = value.toLowerCase().replace('%20', '_').replace(' ', '_');
                        const fallbackText = decodeURIComponent(value).replace(/[_-]/g, ' ');
                        if (value.toLowerCase() === 'home') return null;
                        return (
                            <span key={to} style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="breadcrumb-separator"><ChevronRight size={14} /></span>
                                {isLast ? (
                                    <span className="current-page">{t(`setting.${translationKey}`, fallbackText)}</span>
                                ) : (
                                    <Link to={to} className="Breadcrumbs">{t(`setting.${translationKey}`, fallbackText)}</Link>
                                )}
                            </span>
                        );
                    })}
                </nav>
                <div className="Save-main">
                    <div className="save-header-container">
                        {/* الأيقونة الزرقاء من lucide-react */}
                        <div className="save-icon-wrapper">
                            <Bookmark size={28} className="bookmark-icon" />
                        </div>

                        {/* النصوص والوصف */}
                        <div className="save-text-content">
                            <h1 className="save-title">{t('setting.save_courses', 'Save Courses')}</h1>
                            <p className="save-subtitle">
                                {t('setting.manage_journey', 'Manage your learning journey. You have ')}
                                <span className="saved-count">{savedCourses.length}</span>
                                {t('setting.items_saved', ' items saved.')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="filter-section">
                    <div className="search-wrapper">
                        <Search size={18} className="search-input-icon" />
                        <input
                            type="text"
                            placeholder={t('search', 'Making logos , developer python.....')}
                            className="save-search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-buttons">
                        <button className="filter-btn">
                            <Grid size={16} />
                            <span className="text">{t('setting.categories', 'Categories')}</span>
                            <ChevronDown size={14} />
                        </button>
                        <button className="filter-btn">
                            <BarChart size={16} className="rotate-icon" />
                            <span className="text">{t('setting.level', 'Level')}</span>
                            <ChevronDown size={14} />
                        </button>
                        <button className="filter-btn">
                            <Clock size={16} />
                            <span className="text">{t('setting.duration', 'Duration')}</span>
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>
                <div className="courses-list-container">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <div className="course-card-save" key={course.id}>
                                <div className="card-image-wrapper">
                                    <img src={course.image} alt={course.title} className="course-img" />
                                    <button className="delete-btn" onClick={() => handleDelete(course.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="card-details">
                                    <h3 className="course-card-title">{course.title}</h3>
                                    <div className="card-meta-info">
                                        <span className="meta-item">
                                            <Tag size={14} />
                                            <span>{course.price}</span>
                                        </span>
                                        <span className="meta-item">
                                            <Clock size={14} />
                                            <span>{course.duration}</span>
                                        </span>
                                        <span className="meta-item">
                                            <Signal size={14} />
                                            <span>{course.level}</span>
                                        </span>
                                    </div>
                                    <div className="course-footer">
                                        <div className="instructor-info">
                                            <img src={course.instructorAvatar} alt="Instructor" className="instructor-avatar" />
                                            <span className="instructor-name">{course.instructorName}</span>
                                        </div>
                                        <div className="course-rating">
                                            <Star size={14} className="start-icon" />
                                            <span>{course.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-saved-courses">{t('setting.no_saved_courses', 'No saved courses found.')}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Save;