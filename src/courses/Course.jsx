import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../config/i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import './Course.css';
import { PlayCircle, ShieldCheck, Monitor, Award, Heart, Share2, ChevronDown, Star, ThumbsUp, ThumbsDown, Reply, Globe, Languages } from 'lucide-react';
function Course() {
    const { t } = useTranslation();
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);
    const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains("dark"));

    useEffect(() => {
        const updateThemeState = () => {
            setIsDarkMode(document.body.classList.contains("dark"));
        };
        updateThemeState();

        const observer = new MutationObserver(updateThemeState);
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);
    const BenfiteOfCourse = [
        {
            id: 1,
            img: "/photo_icons/Done.png",
            description: "Use Illustrator confidently to design vector-based logos"
        },
        {
            id: 2,
            img: "/photo_icons/Done.png",
            description: "Develop strong logo concepts and convert them into clean visuals"
        },
        {
            id: 3,
            img: "/photo_icons/Done.png",
            description: "Apply color theory and typography effectively"
        },
        {
            id: 4,
            img: "/photo_icons/Done.png",
            description: "Create modern, simple, and professional logo styles"
        },
        {
            id: 5,
            img: "/photo_icons/Done.png",
            description: "Export logos correctly for print, web, and clients"
        },
        {
            id: 6,
            img: "/photo_icons/Done.png",
            description: "Build a mini-portfolio of your own logo designs"
        }
    ]
    const RequirementsOfCourse = [
        {
            id: 1,
            description: "A computer or laptop capable of running Adobe Illustrator.",
        },
        {
            id: 2,
            description: "An installed copy of Adobe Illustrator (preferably the latest version or CC).",
        },
        {
            id: 3,
            description: "Basic knowledge of using a computer (opening programs, using a mouse and keyboard).",
        },
        {
            id: 4,
            description: "No prior experience in design or other design software is required.",
        },
    ]
    const CourseContent = [
        {
            id: 1,
            description: "Introduction and basics of Illustrator",
        },
        {
            id: 2,
            description: "Shapes and gradients"
        },
        {
            id: 3,
            description: "Texts and typography"
        },
        {
            id: 4,
            description: "Advanced tools and design techniques"
        },
        {
            id: 5,
            description: "Designing a complete logo step by step"
        },
        {
            id: 6,
            description: "Export and share work"
        }
    ]
    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState("");
    const [showMoreSpeak, setShowMoreSpeak] = useState(false);
    const [showMoreWord, setShowMoreWord] = useState(false);
    const [showMoreBenefits, setShowMoreBenefits] = useState(false);
    const [replyToId, setReplyToId] = useState(null);
    const [showRepliesId, setShowRepliesId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [commentsList, setCommentsList] = useState([
        {
            id: 1,
            img: "/Photo/Profile.jfif",
            name: "Jamez Ramiez",
            rating: 5,
            duration: "One day ago",
            description: "Indeed, the course is excellent and explained everything to me in an easy way. I felt that I could design logos from scratch without any prior experience.",
            likes: 50,
            dislikes: 11,
            repliesCount: 10,
            replies: []
        },
        {
            id: 2,
            img: "/Photo/Profile.jfif",
            name: "Jane Doe",
            rating: 4,
            duration: "2 days ago",
            description: "The instructor is very helpful and responsive.",
            likes: 12,
            dislikes: 2,
            repliesCount: 3,
            replies: []
        },
    ]);

    const handleAddComment = () => {
        if (!comment.trim()) return;
        const newComment = {
            id: Date.now(),
            img: "/Photo/Profile.jfif",
            name: "User", // Assuming a default user name
            rating: rating,
            duration: "Just now",
            description: comment,
            likes: 0,
            dislikes: 0,
            repliesCount: 0,
            replies: []
        };
        setCommentsList([newComment, ...commentsList]);
        setComment("");
        setRating(0);
    };

    const handleAddReply = (commentId) => {
        if (!replyText.trim()) return;
        const newReply = {
            id: Date.now(),
            img: "/Photo/Profile.jfif",
            name: "User",
            duration: "Just now",
            description: replyText,
        };
        
        setCommentsList(commentsList.map(c => {
            if (c.id === commentId) {
                return {
                    ...c,
                    replies: [...c.replies, newReply],
                    repliesCount: c.repliesCount + 1
                };
            }
            return c;
        }));
        setReplyText("");
        setReplyToId(null);
    };

const language = ["English", "Spanish", "French", "German", "Italian"];

    return (    
        <div className="course-page">
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
                <div className="course-content" >
                    <div className="course-content-left">
                        <div className="course-content-left-header">
                            <h3>{t("courses.Adobe_Illustrator_Logo_Design_Course", "Adobe Illustrator Logo Design Course")}</h3>
                            <p>{t("courses.Adobe_Illustrator_Logo_Design_Course_description", "This course gives you a practical,no-nonsense path to designing professional logos using Adobe Illustrator. You will learn how to build clean, scalable, and modern logos from scratch, starting with basic vector tools and moving toward full brand-ready designs. The focus is on real skills—concept creation, shape building, typography, color theory, and exporting final files for clients.")}</p>
                        </div>
                        <div className="course-content-left-body">
                            <p className="name_teacher">Create by <Link to="/teacher" style={{ color: "#0089EA", textDecoration: "underline" }}>Dimitri Abdelhakim</Link></p>
                            <p className="date">Last updated 1 / 1 / 2025</p>
                            <p className="language_speak">
                                <Globe size={18} /> {language[0]} 
                                {showMoreSpeak && ` , ${language.slice(1).join(", ")}`} 
                                <span 
                                    onClick={() => setShowMoreSpeak(!showMoreSpeak)} 
                                    style={{ color: "#0089EA", textDecoration: "underline", cursor: "pointer", marginLeft: "5px" }}
                                >
                                    {showMoreSpeak ? t("courses.show_less", "Show less") : "26 more"}
                                </span>
                            </p>
                            <p className="language_word">
                                <Languages size={18} /> {language[0]} 
                                {showMoreWord && ` , ${language.slice(1).join(", ")}`} 
                                <span 
                                    onClick={() => setShowMoreWord(!showMoreWord)} 
                                    style={{ color: "#0089EA", textDecoration: "underline", cursor: "pointer", marginLeft: "5px" }}
                                >
                                    {showMoreWord ? t("courses.show_less", "Show less") : "26 more"}
                                </span>
                            </p>
                        </div>
                        <div className="course-content-left" style={{ marginTop: "100px" }}>
                            <div className="BenfiteOfCourse">
                                <h3>{t("courses.What you'II learn", "What you'II learn")}</h3>
                                <div className="BenfiteOfCourse-body" style={{ marginTop: "20px" }}>
                                    {(showMoreBenefits ? BenfiteOfCourse : BenfiteOfCourse.slice(0, 4)).map((item) => (
                                        <div key={item.id} className="BenfiteOfCourse-item">
                                            <img src={item.img} alt="" />
                                            <p>{item.description}</p>
                                        </div>

                                    ))}
                                    <div className="show_more" onClick={() => setShowMoreBenefits(!showMoreBenefits)}>
                                        <img 
                                            src="/photo_icons/arrow-down.png" 
                                            alt="" 
                                            style={{ transform: showMoreBenefits ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} 
                                        />
                                        <p>{showMoreBenefits ? t("courses.show_less", "Show less") : t("courses.show_more", "Show more")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="course-content-left" style={{ marginTop: "20px" }}>
                            <div className="RequirementsOfCourse">
                                <h3>{t("courses.Requirements", "Requirements")}</h3>
                                <ul className="RequirementOfCourse-list">
                                    {RequirementsOfCourse.map((item) => (
                                        <li key={item.id}>{item.description}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="course-content-left" style={{ marginTop: "20px" }}>
                            <div className="Course_content">
                                <h3>{t("courses.Course_content", "Course content")}</h3>
                                <div className="Course_content-list">
                                    {CourseContent.map((item) => (
                                        <div key={item.id} className="CourseContent-item">
                                            <ChevronDown size={20} className="CourseContent-icon" />
                                            <p>{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="course-content-left" style={{ marginTop: "20px" }}>
                            <div className="Comments-section">
                                <h3>{t("courses.Comments", "Comments")}</h3>
                                <div className="Add-comment">
                                    <img src="/Photo/Profile.jfif" alt="" />
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder={t("courses.add_comment", "Add a comment")}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <div className="rating">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    onClick={() => setRating(star)}
                                                    style={{
                                                        fontSize: "20px",
                                                        cursor: "pointer",
                                                        color: rating >= star ? "#FFD700" : "#999",
                                                    }}>
                                                    <Star size={20} fill={rating >= star ? "#FFD700" : "transparent"} />
                                                </span>
                                            ))}
                                        </div>
                                        <button className="send-btn" onClick={handleAddComment}>{t("courses.send", "Send")}</button>
                                    </div>
                                </div>
                                <div className="Comments-list">
                                    {commentsList.map((item) => (
                                        <div key={item.id} className="Comment-item">
                                            <div className="comment-header">
                                                <img src={item.img} alt="" className="user-avatar" />
                                                <div className="user-info">
                                                    <p className="comment-name">{item.name}</p>
                                                    <div className="rating-duration">
                                                        <div className="stars">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Star 
                                                                    key={star} 
                                                                    size={16} 
                                                                    fill={item.rating >= star ? "#FFD700" : "transparent"} 
                                                                    color={item.rating >= star ? "#FFD700" : "#999"} 
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="comment-duration">{item.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="comment-body">
                                                <p className="comment-description">{item.description}</p>
                                            </div>
                                            <div className="comment-footer">
                                                <div className="actions">
                                                    <div className="action-item">
                                                        <span>{item.likes}</span>
                                                        <ThumbsUp size={20} className="action-icon like-icon" fill="#0089EA" />
                                                    </div>
                                                    <div className="action-item">
                                                        <span>{item.dislikes}</span>
                                                        <ThumbsDown size={20} className="action-icon" />
                                                    </div>
                                                    <div className="action-item reply-btn" onClick={() => setReplyToId(replyToId === item.id ? null : item.id)}>
                                                        <Reply size={20} className="action-icon" />
                                                        <span>{t("courses.reply", "Reply")}</span>
                                                    </div>
                                                </div>
                                                <div className="see-replies" onClick={() => setShowRepliesId(showRepliesId === item.id ? null : item.id)}>
                                                    <ChevronDown size={18} style={{ transform: showRepliesId === item.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />
                                                    <span>{t("courses.see_replies", `See ${item.repliesCount} Replies`, { count: item.repliesCount })}</span>
                                                </div>
                                            </div>

                                            {/* Reply Input */}
                                            {replyToId === item.id && (
                                                <div className="reply-input-section">
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            placeholder={t("courses.add_reply", "Add a reply...")}
                                                            value={replyText}
                                                            onChange={(e) => setReplyText(e.target.value)}
                                                            autoFocus
                                                        />
                                                        <button className="send-btn" onClick={() => handleAddReply(item.id)}>{t("courses.reply_send", "Reply")}</button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Replies List */}
                                            {showRepliesId === item.id && item.replies && item.replies.length > 0 && (
                                                <div className="replies-list">
                                                    {item.replies.map((reply) => (
                                                        <div key={reply.id} className="reply-item">
                                                            <div className="comment-header">
                                                                 <img src={reply.img} alt="" className="user-avatar reply-avatar" />
                                                                 <div className="user-info">
                                                                     <p className="comment-name reply-name">{reply.name}</p>
                                                                     <span className="comment-duration reply-duration">{reply.duration}</span>
                                                                 </div>
                                                             </div>
                                                             <p className="comment-description reply-description">{reply.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="course-content-right">
                        <div className="course-card-sticky">
                            <div className="card-course">
                                <div className="card-image-container">
                                    <img src="/Photo/Adobe Illustrator logo design.png" alt="Course logo design by Illustrator" />
                                    <div className="overlay-play">
                                        <PlayCircle size={48} color="white" strokeWidth={1.5} />
                                        <span>{t("courses.preview_course", "Preview this course")}</span>
                                    </div>
                                </div>
                                <div className="card_body">
                                    <div className="price-section">
                                        <span className="current-price">50$</span>
                                        <span className="original-price">100$</span>
                                        <span className="discount-badge">50% OFF</span>
                                    </div>

                                    <div className="card_body_buttons">
                                        <button className="Add_to_cart">{t("courses.add_to_cart", "Add to Cart")}</button>
                                        <button className="love-btn">
                                            <Heart size={24} />
                                        </button>
                                    </div>
                                    <button className="buy_now">{t("courses.buy_now", "Buy Now")}</button>

                                    <p className="guarantee">
                                        <ShieldCheck size={16} />
                                        {t("courses.guarantee", "30-Day Money-Back Guarantee")}
                                    </p>

                                    <div className="include-course">
                                        <h4>{t("courses.include_course", "This course includes:")}</h4>
                                        <ul className="include-list">
                                            <li>
                                                <PlayCircle size={18} className="icon" />
                                                <span>{t("courses.houres", "1 hour on-demand video")}</span>
                                            </li>
                                            <li>
                                                <ShieldCheck size={18} className="icon" />
                                                <span>{t("courses.lifetime", "Complete lifetime access")}</span>
                                            </li>
                                            <li>
                                                <Monitor size={18} className="icon" />
                                                <span>{t("courses.access", "Access on mobile and TV")}</span>
                                            </li>
                                            <li>
                                                <Award size={18} className="icon" />
                                                <span>{t("courses.certificate", "Certificate of completion")}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="share-section">
                                        <button className="share-btn">{t("courses.share", "Share")}</button>
                                        <button className="coupon-btn">{t("courses.apply_coupon", "Apply Coupon")}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
export default Course;
