// ─── المكتبات الخارجية ───────────────────────────────────────────────────────
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
    ChevronRight, ChevronDown,
    Bookmark, Search,
    Grid, BarChart, Clock,
    Trash2, CircleDollarSign, SlidersHorizontal, Star
} from "lucide-react";

// ─── الأنماط المحلية ─────────────────────────────────────────────────────────
import "./Save.css";

// ─── بيانات ثابتة: خيارات الفلاتر (لا تتغير بين renders) ───────────────────
const filterData = [
    {
        id: "categories",
        label: "Categories",
        options: ["All categories", "Computer Science", "Data Science", "Web Development", "UI / UX Design"],
        multiSelect: false,
    },
    {
        id: "level",
        label: "Level",
        options: ["All levels", "Beginner", "Intermediate", "Advanced"],
        multiSelect: true,
    },
    {
        id: "duration",
        label: "Duration",
        options: ["All durations", "Below 1h", "1h - 2h", "2h - 4h"],
        multiSelect: false,
    },
];

function Save() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    // استخراج مقاطع المسار لعرض Breadcrumbs
    const pathname = location.pathname.split("/").filter((x) => x);

    // ─── الكورسات المحفوظة (بيانات تجريبية) ─────────────────────────────────
    const [savedCourses, setSavedCourses] = useState([
        {
            id: 1,
            title: "Adobe Illustrator - logos design",
            image: "Photo/Adobe Illustrator logo design.png",
            price: "$50",
            duration: "1h",
            level: "Beginner",
            category: "Graphic Design",
            instructorName: "Dimitri Abdelhak",
            instructorAvatar: "/Photo/man_suites.jpg",
            rating: "5.0",
        },
        {
            id: 2,
            title: "Adobe Photoshop - Social media designs",
            image: "Photo/Adobe Photoshop - Social media designs.png",
            price: "$45",
            duration: "2.5h",
            level: "Beginner",
            category: "Graphic Design",
            instructorName: "Adam Smith",
            instructorAvatar: "/Photo/man_suites_4.jpg",
            rating: "4.8",
        },
        {
            id: 3,
            title: "Adobe After effects - Motion Graphics",
            image: "Photo/Adobe After effects-Motion Graphics.png",
            price: "$60",
            duration: "3h",
            level: "Intermediate",
            category: "Graphic Design",
            instructorName: "George Smith",
            instructorAvatar: "/Photo/man_suites_3.jpg",
            rating: "4.9",
        },
    ]);

    // ─── حالة الفلاتر والبحث ─────────────────────────────────────────────────
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        categories: ["All categories"],
        level: ["All levels"],
        duration: ["All durations"],
    });
    const [searchQuery, setSearchQuery] = useState("");

    // تبديل حالة فتح/إغلاق قائمة فلتر معيّنة
    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };
    // تحديث قيمة فلتر عند اختيار خيار من القائمة المنسدلة
    const handleSelectOption = (filterId, option, multiSelect) => {
        setSelectedFilters((prev) => {
            const currentSelected = prev[filterId] || [];

            if (multiSelect) {
                // إذا اختار المستخدم الخيار الافتراضي "الكل" يُعاد تعيين الفلتر
                if (option === "All levels" || option === "All categories" || option === "All durations") {
                    return { ...prev, [filterId]: [option] };
                }

                // إزالة الخيار الافتراضي عند اختيار خيار محدد
                let newSelected = currentSelected.filter(
                    (item) => item !== "All levels" && item !== "All categories" && item !== "All durations"
                );

                if (newSelected.includes(option)) {
                    newSelected = newSelected.filter((item) => item !== option);
                    // إذا أصبحت القائمة فارغة، أعِد الخيار الافتراضي
                    if (newSelected.length === 0) {
                        const defaultOpt =
                            filterId === "categories"
                                ? "All categories"
                                : filterId === "level"
                                ? "All levels"
                                : "All durations";
                        newSelected = [defaultOpt];
                    }
                } else {
                    newSelected.push(option);
                }
                return { ...prev, [filterId]: newSelected };
            } else {
                return { ...prev, [filterId]: [option] };
            }
        });
    };

    // حذف كورس محفوظ بناءً على id
    const handleDelete = (id) => {
        setSavedCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
    };

    // ─── تصفية الكورسات بناءً على البحث والفلاتر المختارة ────────────────────
    const filteredCourses = savedCourses.filter((course) => {
        // مطابقة نص البحث مع العنوان أو اسم المدرّب
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructorName.toLowerCase().includes(searchQuery.toLowerCase());

        // مطابقة فلتر الفئة
        const selectedCategories = selectedFilters.categories || ["All categories"];
        let matchesCategory =
            selectedCategories.includes("All categories") || selectedCategories.length === 0;
        if (!matchesCategory) {
            matchesCategory = selectedCategories.some(
                (cat) =>
                    (course.category && course.category.toLowerCase() === cat.toLowerCase()) ||
                    course.title.toLowerCase().includes(cat.toLowerCase())
            );
        }

        // مطابقة فلتر المستوى
        const selectedLevels = selectedFilters.level || ["All levels"];
        let matchesLevel = selectedLevels.includes("All levels") || selectedLevels.length === 0;
        if (!matchesLevel) {
            matchesLevel = selectedLevels.some((lvl) => {
                const normLvl = lvl.toLowerCase() === "beginner" ? "beginer" : lvl.toLowerCase();
                return course.level.toLowerCase() === normLvl;
            });
        }

        // مطابقة فلتر المدة الزمنية
        const selectedDurations = selectedFilters.duration || ["All durations"];
        let matchesDuration =
            selectedDurations.includes("All durations") || selectedDurations.length === 0;
        if (!matchesDuration) {
            const hours = parseFloat(course.duration);
            matchesDuration = selectedDurations.some((dur) => {
                if (dur === "Below 1h") return hours < 1;
                if (dur === "1h - 2h") return hours >= 1 && hours <= 2;
                if (dur === "2h - 4h") return hours > 2 && hours <= 4;
                return false;
            });
        }

        return matchesSearch && matchesCategory && matchesLevel && matchesDuration;
    });

    // ─── العرض ───────────────────────────────────────────────────────────────
    return (
        <div className="Save-page">
            <div className="Save-container">

                {/* مسار التنقل (Breadcrumbs) */}
                <nav className="breadcrumbs-nav">
                    <Link to="/Home" className="Breadcrumbs">
                        {t("setting.home", "Home")}
                    </Link>
                    {pathname.map((value, index) => {
                        const to = "/" + pathname.slice(0, index + 1).join("/");
                        const isLast = index === pathname.length - 1;
                        const translationKey = value.toLowerCase().replace("%20", "_").replace(" ", "_");
                        const fallbackText = decodeURIComponent(value).replace(/[_-]/g, " ");
                        if (value.toLowerCase() === "home") return null;
                        return (
                            <span key={to} style={{ display: "flex", alignItems: "center" }}>
                                <span className="breadcrumb-separator">
                                    <ChevronRight size={14} />
                                </span>
                                {isLast ? (
                                    <span className="current-page">
                                        {t(`setting.${translationKey}`, fallbackText)}
                                    </span>
                                ) : (
                                    <Link to={to} className="Breadcrumbs">
                                        {t(`setting.${translationKey}`, fallbackText)}
                                    </Link>
                                )}
                            </span>
                        );
                    })}
                </nav>

                {/* رأس الصفحة: الأيقونة والعنوان والوصف */}
                <div className="Save-main">
                    <div className="save-header-container">
                        <div className="save-icon-wrapper">
                            <Bookmark size={28} className="bookmark-icon" />
                        </div>
                        <div className="save-text-content">
                            <h1 className="save-title">
                                {t("setting.save_courses", "Save Courses")}
                            </h1>
                            <p className="save-subtitle">
                                {t("setting.manage_journey", "Manage your learning journey. You have ")}
                                <span className="saved-count">{savedCourses.length}</span>
                                {t("setting.items_saved", " items saved.")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* قسم البحث والفلاتر */}
                <div className="filter-section">
                    <div className="search-wrapper">
                        <Search size={18} className="search-input-icon" />
                        <input
                            type="text"
                            placeholder={t("search", "Making logos , developer python...")}
                            className="save-search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="filter-buttons">
                        {filterData.map((filter) => {
                            const isDropdownOpen = activeDropdown === filter.id;
                            const currentSelected = selectedFilters[filter.id] || [];
                            const IconComponent =
                                filter.id === "categories" ? Grid : filter.id === "level" ? BarChart : Clock;

                            return (
                                <div className="filter-dropdown-wrapper" key={filter.id}>
                                    {/* زر فتح قائمة الفلتر */}
                                    <button
                                        className={`filter-btn ${isDropdownOpen ? "active" : ""}`}
                                        onClick={() => toggleDropdown(filter.id)}
                                    >
                                        <IconComponent
                                            size={16}
                                            className={filter.id === "level" ? "rotate-icon" : ""}
                                        />
                                        <span className="text">
                                            {t(`setting.${filter.id}`, filter.label)}: {currentSelected.join(", ")}
                                        </span>
                                        <ChevronDown
                                            size={14}
                                            className={`chevron-icon ${isDropdownOpen ? "open" : ""}`}
                                        />
                                    </button>

                                    {/* القائمة المنسدلة لخيارات الفلتر */}
                                    {isDropdownOpen && (
                                        <div className="filter-dropdown-menu">
                                            <ul>
                                                {filter.options.map((option, index) => {
                                                    const isSelected = currentSelected.includes(option);
                                                    return (
                                                        <li
                                                            key={index}
                                                            onClick={() =>
                                                                handleSelectOption(
                                                                    filter.id,
                                                                    option,
                                                                    filter.multiSelect
                                                                )
                                                            }
                                                            className={isSelected ? "selected" : ""}
                                                        >
                                                            <span className="option-text">{option}</span>
                                                            {isSelected && <span className="check-mark">✓</span>}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* قائمة الكورسات المحفوظة */}
                <div className="courses-list-container">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <div className="save-course-item" key={course.id}>

                                {/* صورة الكورس مع الشارة وزر الحذف */}
                                <div className="save-card-image">
                                    <img src={course.image} alt={course.title} />
                                    <div className="save-category-badge">{course.category}</div>
                                    <button
                                        className="save-delete-btn"
                                        onClick={() => handleDelete(course.id)}
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>

                                {/* تفاصيل الكورس */}
                                <div className="save-card-info">
                                    <h3 className="save-course-title">{course.title}</h3>

                                    {/* صف: السعر / المدة / المستوى */}
                                    <div className="save-info-PRL">
                                        <div className="save-info-PRL-item">
                                            <CircleDollarSign size={16} className="save-prl-icon" />
                                            <p className="save-course-price">{course.price}</p>
                                        </div>
                                        <div className="save-info-PRL-item">
                                            <Clock size={16} className="save-prl-icon" />
                                            <p className="save-course-meta">{course.duration}</p>
                                        </div>
                                        <div className="save-info-PRL-item">
                                            <SlidersHorizontal size={16} className="save-prl-icon" />
                                            <p className="save-course-meta">{course.level}</p>
                                        </div>
                                    </div>

                                    {/* صف: المدرّب والتقييم */}
                                    <div className="save-info-IR">
                                        <div className="save-info-IR-item">
                                            <img src={course.instructorAvatar} alt="Instructor" />
                                            <p className="save-course-instructor">{course.instructorName}</p>
                                        </div>
                                        <div className="save-info-IR-item">
                                            <div className="save-rating-icon">
                                                <Star size={15} className="fill-yellow-400 text-yellow-400" />
                                            </div>
                                            <p className="save-course-rating">{course.rating}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-saved-courses">
                            {t("setting.no_saved_courses", "No saved courses found.")}
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Save;