import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./Profile.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "../config/i18n";
import { FaPlusSquare } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
function Profile() {
    const { t } = useTranslation();
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [hovered, setHovered] = useState(null);
    const [phone, setPhone] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showModalInterset, setShowModalInterset] = useState(false);
    const [showModalProfile, setShowModalProfile] = useState(false);
    const [showModalBackground, setShowModalBackground] = useState(false);
    const [profileImage, setProfileImage] = useState("/Photo/Profile.jfif");
    const [backgroundImage, setBackgroundImage] = useState("/Photo/Background_profile.jfif");
    const [expandedCourseIds, setExpandedCourseIds] = useState([]);
    const [interests, setInterests] = useState([
        "UI Design", "UX Design", "Mobile developer",
        "Web developer", "Data analysis", "Graphic designer",
        "Electronics marketing"
    ]);

    const add_more_color = {
        white: "/photo_icons/For_setting/add_more_white.png",
        black: "/photo_icons/For_setting/add_more.png",
    }
    const [newInterest, setNewInterest] = useState("");
    const courses = [
        {
            id: 1,
            title: "IBM Courses",
            logo: "/photo_icons/IBM.png",
            subtitle: "Getting Started with Git and GitHub",
            skills: [
                "Cloud Computing",
                "Agile Methodologies",
                "DevOps Practices",
                "Project Management",
            ],
            extraSkills: [
                "Collaboration",
                "Leadership and Management",
                "Software Engineering Tools",
                "Software Engineering",
            ]
        },
        {
            id: 2,
            title: "Microsoft Courses",
            logo: "/photo_icons/microsoft.png",
            subtitle: "Introduction to Excel",
            skills: [
                "Data Analysis Basics",
                "Essential Excel Skill",
                "Beginner Data Handling",
                "Office Applications",
            ],
            extraSkills: [
                "Pivot Tables & Charts",
                "Power Query",
                "Excel Formulas & Functions",
                "Power BI Integration",
            ]
        },
    ];
    const handleImageProfile = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(URL.createObjectURL(file));
        }
    };
    const handleImageBackground = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setBackgroundImage(URL.createObjectURL(file));
        }
    };
    const search = {
        white: "/photo_icons/For_setting/White_Search.png",
        black: "/photo_icons/For_setting/Gray_Search.png"
    }
    const [searchHovered, setSearchHovered] = useState(false);
    const categories = [
        { name: "Profile", path: "/Setting/Profile", black: "/photo_icons/For_setting/UserMaleBlack.png", blue: "/photo_icons/For_setting/UserMaleBlue.png" },
        { name: "Security", path: "/Setting/Security", black: "/photo_icons/For_setting/SecrityBlack.png", blue: "/photo_icons/For_setting/SecrityBlue.png" },
        { name: "Preferences", path: "/Setting/Preferences", black: "/photo_icons/For_setting/PreferencesBlack.png", blue: "/photo_icons/For_setting/PreferencesBlue.png" },
        { name: "Privacy", path: "/Setting/Privacy", black: "/photo_icons/For_setting/PrivacyBlack.png", blue: "/photo_icons/For_setting/PrivacyBlue.png" },
        { name: "Notification", path: "/Setting/Notification", black: "/photo_icons/For_setting/NotificationBlack.png", blue: "/photo_icons/For_setting/NotificationBlue.png" },
        { name: "Payment", path: "/Setting/Payment", black: "/photo_icons/For_setting/PaymentBlack.png", blue: "/photo_icons/For_setting/PaymentBlue.png" },
    ];

    // --- Search visibility helpers ---
    const q = searchQuery.trim().toLowerCase();
    const sectionVisible = (keywords) =>
        q === '' || keywords.some((kw) => kw.toLowerCase().includes(q));

    const showPhotoCard   = sectionVisible(['photo', 'profile', 'background', 'picture', 'image', 'upload']);
    const showInterests   = sectionVisible(['interest', 'industry', 'skill', 'ux', 'ui', 'design', 'web', 'data']);
    const showPersonalInfo = sectionVisible(['personal', 'name', 'email', 'phone', 'mobile', 'number', 'address', 'information']);
    const showCourses     = sectionVisible(['course', 'training', 'ibm', 'microsoft', 'excel', 'git']);
    const showDescription = sectionVisible(['description', 'about', 'bio', 'text']);
    const noResults       = !showPhotoCard && !showInterests && !showPersonalInfo && !showCourses && !showDescription;

    const renderProfileContent = (isPreview = false) => {
        return (
            <div className={`Profile-setting-layout ${isPreview ? 'preview-mode' : ''}`}>
                <div className={`row-setting${!isPreview && !showPhotoCard ? ' section-hidden' : ''}`}>
                    <div className="Profile-setting-content">                    
                        <div className="Background-container">
                            <img src={backgroundImage} alt="Background_profile" className="Background_profile_image" />
                            {!isPreview && (
                                <img src="/photo_icons/For_setting/Edit.png" alt="edit" className="edit-bg-icon" onClick={() => setShowModalBackground(true)} />
                            )}
                        </div>
                        <img src={profileImage} alt="Profile" className="Profile" />
                        
                        {!isPreview ? (
                            <div className="Profile-content">
                                <p className="Your-photo">Your Photo</p>
                                <p className="This-will-display">this will displayed on your profile</p>
                                <div className="Profile-content-buttons">
                                    <button className="Upload-new-button" onClick={() => setShowModalProfile(true)}>Upload New</button>
                                    <button className="Save-photo-button">Save</button>
                                </div>
                            </div>
                        ) : (
                            <div className="Profile-content-preview-spacer"></div>
                        )}

                        {showModalProfile && (
                            <div className="modal-overlay animate-fade-in" onClick={() => setShowModalProfile(false)}>
                                <div className="modal-content profile-upload-modal" onClick={(e) => e.stopPropagation()}>
                                    <div className="modal-header">
                                        <p className="modal-title">Update Profile Picture</p>
                                        <button className="modal-close-btn" onClick={() => setShowModalProfile(false)} aria-label="Close">
                                            <IoMdClose size={18} />
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="profile-preview-container">
                                            <img src={profileImage} alt="Profile Preview" className="profile-preview-large" />
                                        </div>
                                        <p className="upload-instruction">Choose a new photo to personalize your profile</p>
                                    </div>
                                    <div className="modal-footer">
                                        <input
                                            type="file"
                                            id="profile-upload-input"
                                            hidden
                                            onChange={(e) => {
                                                handleImageProfile(e);
                                            }}
                                            accept="image/*"
                                        />
                                        <button className="modal-cancel-btn" onClick={() => setShowModalProfile(false)}>Cancel</button>
                                        <button className="modal-save-btn" onClick={() => document.getElementById('profile-upload-input').click()}>
                                            Choose Photo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showModalBackground && (
                            <div className="modal-overlay animate-fade-in" onClick={() => setShowModalBackground(false)}>
                                <div className="modal-content background-upload-modal" onClick={(e) => e.stopPropagation()}>
                                    <div className="modal-header">
                                        <p className="modal-title">Update Background Picture</p>
                                        <button className="modal-close-btn" onClick={() => setShowModalBackground(false)} aria-label="Close">
                                            <IoMdClose size={18} />
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="background-preview-container clickable" onClick={() => document.getElementById('background-upload-input').click()}>
                                            <img src={backgroundImage} alt="Background Preview" className="background-preview-large" />
                                            <div className="upload-overlay">
                                                <img src="/photo_icons/For_setting/Edit.png" alt="upload" className="upload-icon-blue" />
                                                <p>Change Image</p>
                                            </div>
                                        </div>
                                        <div className="quick-selection-gallery">
                                            <p className="gallery-title">Quick Selection</p>
                                            <div className="gallery-items">
                                                {["/Photo/Background_profile.jfif", "/Photo/Free Online Courses to Future-Proof Your Career _.jfif", "/Photo/istockphoto-1956169795-1024x1024.jpg"].map((src, i) => (
                                                    <img
                                                        key={i}
                                                        src={src}
                                                        alt={`default-${i}`}
                                                        className={`gallery-item ${backgroundImage === src ? 'active' : ''}`}
                                                        onClick={() => setBackgroundImage(src)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <input type="file" id="background-upload-input" hidden onChange={(e) => {
                                            handleImageBackground(e);
                                        }} accept="image/*" />
                                        <button className="modal-cancel-btn" onClick={() => setShowModalBackground(false)}>Cancel</button>
                                        <button className="modal-save-btn" onClick={() => document.getElementById('background-upload-input').click()}>
                                            Upload New
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                    <div className={`Interset-setting${!isPreview && !showInterests ? ' section-hidden' : ''}`}>
                        <p className="interests-title">Industry / Interest</p>
                        {interests.map((interest, index) => (
                            <div className="Interset-setting-content" key={index}>
                                <p>{interest}</p>
                                {!isPreview && (
                                    <button className="close-btn" onClick={() => setInterests(interests.filter((_, i) => i !== index))}>
                                        <AiOutlineClose className="x-icon" />
                                    </button>
                                )}
                            </div>
                        ))}
                        {!isPreview && (
                            <div className="Add-more" onClick={() => setShowModalInterset(true)}>
                                <FaPlusSquare className="btn-icon" size={24} />
                                <span>Add more</span>
                                {showModalInterset && (
                                    <div className="modal-overlay" onClick={() => setShowModalInterset(false)}>
                                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                            <h2>Add New Interest</h2>
                                            <p style={{ color: '#6B7280', fontSize: '14px' }}>Enter a new interest or industry to add to your profile.</p>
                                            <input
                                                type="text"
                                                placeholder="e.g. Project Management"
                                                autoFocus
                                                value={newInterest}
                                                onChange={(e) => setNewInterest(e.target.value)}
                                            />
                                            <div className="modal-buttons">
                                                <button className="modal-cancel-btn" onClick={() => setShowModalInterset(false)}>Cancel</button>
                                                <button className="modal-save-btn" onClick={() => {
                                                    if (newInterest.trim()) {
                                                        setInterests([...interests, newInterest]);
                                                        setNewInterest("");
                                                        setShowModalInterset(false);
                                                    }
                                                }}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
                <div className={`row-setting${!isPreview && !showPersonalInfo && !showCourses ? ' section-hidden' : ''}`}>
                    <div className="Profile-setting-content">
                        <div className="Personal-information">
                            <p>Personal Information</p>
                            <div className="Personal-information-content">
                                <div className={`Full_Name${!isPreview && !showPersonalInfo ? ' section-hidden' : ''}`}>
                                    <p>Full Name</p>
                                    <div className={`input-wrapper${isPreview ? ' preview-field' : ''}`}>
                                        <input type="text" placeholder="Moath Hazeem" readOnly={isPreview} />
                                        {!isPreview && <img src="/photo_icons/For_setting/account.png" alt="Account photo" className="edit-icon" />}
                                    </div>
                                </div>
                                <div className={`Email${!isPreview && !showPersonalInfo ? ' section-hidden' : ''}`}>
                                    <p>Email address</p>
                                    <div className={`input-wrapper${isPreview ? ' preview-field' : ''}`}>
                                        <input type="email" placeholder="Moathhazeem@gmail.com" readOnly={isPreview} />
                                        {!isPreview && <img src="/photo_icons/For_setting/email.png" alt="email photo" className="edit-icon" />}
                                    </div>
                                </div>
                                <div className={`Phone_Number${!isPreview && !showPersonalInfo ? ' section-hidden' : ''}`}>
                                    <p>Mobile Number</p>
                                    <div className={`phone-field-wrapper${isPreview ? ' phone-field-wrapper--preview' : ''}`}>
                                        <PhoneInput
                                            country={'ps'}
                                            value={phone}
                                            onChange={setPhone}
                                            disabled={isPreview}
                                            inputClass="custom-phone-input"
                                            containerClass="custom-phone-container"
                                            buttonClass="custom-phone-button"
                                            dropdownClass="custom-phone-dropdown"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        {!isPreview && (
                            <div className="Personal-information-buttons">
                                <button className="cancel-button">Cancel</button>
                                <button className="save-button">Save</button>
                            </div>
                        )}
                    </div>
                    <div className={`Training-courses-setting${!isPreview && !showCourses ? ' section-hidden' : ''}`}>
                        <p className="Training-courses-title">Training courses</p>
                        {courses.map((course) => (
                            <div className="Training-courses-content" key={course.id}>
                                <div className="Course-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%', marginBottom: '15px' }}>
                                    <img src={course.logo} alt={course.title} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                                    <div className="Name-course">
                                        <h3 style={{ margin: 0, fontSize: '20px' }}>{course.title}</h3>
                                        <p style={{ margin: 0, fontSize: '22px', color: '#000000' }}>{course.subtitle}</p>
                                    </div>
                                </div>
                                <div className="Skills" style={{ width: '100%' }}>
                                    {course.skills.map((skill, idx) => (
                                        <p key={idx}>{skill}</p>
                                    ))}
                                    {expandedCourseIds.includes(course.id) && course.extraSkills.map((skill, idx) => (
                                        <p key={idx}>{skill}</p>
                                    ))}
                                    <p
                                        className="see more"
                                        onClick={() => {
                                            if (expandedCourseIds.includes(course.id)) {
                                                setExpandedCourseIds(expandedCourseIds.filter(id => id !== course.id));
                                            } else {
                                                setExpandedCourseIds([...expandedCourseIds, course.id]);
                                            }
                                        }}
                                    >
                                        {expandedCourseIds.includes(course.id) ? "see less" : "see more"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`Description-setting${!isPreview && !showDescription ? ' section-hidden' : ''}`}>
                    <p className="Description-title">Description</p>
                    <div className="Description-content">
                        <textarea placeholder="I am interested in studying UX/UI design, data analysis, and web development. I have completed the first ten hours of the UI/UX course." readOnly={isPreview}></textarea>
                    </div>
                    {!isPreview && (
                        <div className="Description-buttons">
                            <button className="cancel-button">Cancel</button>
                            <button className="save-button">Save</button>
                        </div>
                    )}
                </div>
                {noResults && !isPreview && (
                    <div className="no-results-message">
                        <span className="no-results-icon">🔍</span>
                        <p>No settings found for &ldquo;<strong>{searchQuery}</strong>&rdquo;</p>
                        <p className="no-results-sub">Try a different keyword like "Email", "Photo", or "Interest"</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="edit-profile-container">
            <nav className="breadcrumbs-nav">
                <Link to="/Home" className="Breadcrumbs">{t("setting.home", "Home")}</Link>

                {pathname.map((value, index) => {
                    const to = "/" + pathname.slice(0, index + 1).join("/");
                    const isLast = index === pathname.length - 1;
                    const translationKey = value.toLowerCase() === "setting" ? "header" : value.toLowerCase();

                    return (
                        <span key={to}>
                            <span className="breadcrumb-separator"> {t("setting.breadcrumb_separator", ">")} </span>
                            {isLast ? (
                                <span className="current-page">{t(`setting.${translationKey}`, value.replace("_", " "))}</span>
                            ) : (
                                <Link to={to} className="Breadcrumbs">{t(`setting.${translationKey}`, value.replace("_", " "))}</Link>
                            )}
                        </span>
                    );
                })}
            </nav>

            <div className="Setting">
                <div className="header_setting">
                    <p>{t('setting.header', 'Settings')}</p>
                    <div className="search_page_setting">
                        <img src={search.black}
                            alt="search" className="setting-search-icon" />
                        <input
                            type="search"
                            placeholder={t('setting.search', 'Search settings')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="Setting_option">
                    {categories.map((category, index) => {
                        const isActive = location.pathname === category.path || location.pathname === `/${category.name}`;
                        const isHovered = hovered === index;
                        return (
                            <Link
                                to={category.path}
                                key={index}
                                className="category-tag"
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                                style={isActive || isHovered ? { backgroundColor: "#0089EA" } : { backgroundColor: "#FFFFFF" }}
                            >
                                <img
                                    src={isActive || isHovered ? category.blue : category.black}
                                    alt={category.name}
                                    style={isActive || isHovered ? { filter: "brightness(0) invert(1)" } : { filter: "none" }}
                                />
                                <p style={isActive || isHovered ? { color: "#FFFFFF" } : { color: "#000000" }}>
                                    {t(`setting.${category.name.toLowerCase()}`, category.name)}
                                </p>
                            </Link>
                        );
                    })}
                </div>
                <div className="Profile-setting">

                    <div className="Header-profile">
                        <div className="title-preview-container">
                            <p style={{ fontSize: "32px", margin: 0 }}>Edit User Profile</p>
                            <div className="Preview" onClick={() => setIsPreviewOpen(true)}>
                                <span className="preview-text">Preview</span>
                                <img src="/photo_icons/For_setting/arrow-up-right.png" alt="preview-arrow" className="preview-arrow-icon" />
                            </div>
                        </div>
                    </div>

                    {renderProfileContent(false)}

                </div>
            </div>

            {isPreviewOpen && (
                <div className="preview-modal-overlay" onClick={() => setIsPreviewOpen(false)}>
                    <div className="preview-modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
                        <div className="preview-modal-header">
                            <p className="preview-modal-title">Public Profile Preview</p>
                            <button className="preview-modal-close-btn" onClick={() => setIsPreviewOpen(false)} aria-label="Close">
                                <IoMdClose size={20} />
                            </button>
                        </div>
                        <div className="preview-modal-body">
                            {renderProfileContent(true)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Profile
