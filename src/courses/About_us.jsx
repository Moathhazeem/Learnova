// ─── استيرادات المكتبات الخارجية ──────────────────────────────────────────────
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Users, BookOpen, UserCheck, Clock, Award, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

// ─── استيرادات الأنماط المحلية ────────────────────────────────────────────────
import "./About_us.css";

// ─── المكوّن الرئيسي لصفحة "من نحن" ──────────────────────────────────────────
function AboutUs() {
    const { t } = useTranslation();
    const location = useLocation();

    // استخراج أجزاء المسار الحالي لبناء مسار التنقل (Breadcrumbs)
    const pathname = location.pathname.split("/").filter(x => x);

    // ─── بيانات قصة Learnova عبر الزمن ───────────────────────────────────────
    const StoryLearnova = [
        {
            id: 1,
            title: t("setting.about_us_story_title_1", "The Beginning"),
            descriptions: [
                t("setting.about_us_story_desc_1_p1", "Learnova was founded by a group of passionate educators and developers who wanted to make learning accessible to everyone. They started working on the platform in 2021 as a small side project while testing ideas and collecting feedback from learners."),
                t("setting.about_us_story_desc_1_p2", "The first beta version of Learnova launched in early 2022 to a small group of students eager to explore online courses.")
            ]
        },
        {
            id: 2,
            title: t("setting.about_us_story_title_2", "First Students"),
            descriptions: [
                t("setting.about_us_story_desc_2_p1", "From day one, Learnova received requests from learners around the world who wanted early access. The platform began enrolling its first students and collecting feedback to improve the experience."),
                t("setting.about_us_story_desc_2_p2", "After implementing the payment and course management system, Learnova welcomed its first paid students in March 2022, months before the public launch.")
            ]
        },
        {
            id: 3,
            title: t("setting.about_us_story_title_3", "The Launch"),
            descriptions: [
                t("setting.about_us_story_desc_3_p1", "Learnova officially launched publicly in June 2022. Within the first week, hundreds of learners joined, exploring courses in technology, design, and professional skills."),
                t("setting.about_us_story_desc_3_p2", "The platform has been growing steadily ever since, adding new courses and instructors regularly to serve learners worldwide.")
            ]
        },
        {
            id: 4,
            title: t("setting.about_us_story_title_4", "About Learnova"),
            descriptions: [
                t("setting.about_us_story_desc_4_p1", "Learnova is an all-in-one online learning platform that makes it easy for anyone to gain new skills, grow professionally, and transform their life through education."),
                t("setting.about_us_story_desc_4_p2", "It is flexible, user-friendly, and affordable, allowing learners to study at their own pace without barriers.")
            ]
        },
        {
            id: 5,
            title: t("setting.about_us_story_title_5", "The Mission"),
            descriptions: [
                t("setting.about_us_story_desc_5_p1", "Learnova's mission is to make high-quality education accessible to everyone, anywhere in the world."),
                t("setting.about_us_story_desc_5_p2", "We combine simplicity, flexibility, and expert-led courses to empower learners to achieve their personal and professional goals.")
            ]
        },
        {
            id: 6,
            title: t("setting.about_us_story_title_6", "The Name of Learnova"),
            descriptions: [
                t("setting.about_us_story_desc_6_p1", "The name Learnova comes from combining \u201cLearn\u201d + \u201cNova\u201d (meaning \u201cnew\u201d or \u201cstar\u201d), symbolizing new learning opportunities and growth for everyone.")
            ]
        }
    ];

    // ─── بيانات شهادات الطلاب الموثوقين ──────────────────────────────────────
    const TrustStudent = [
        {
            id: 1,
            name: "Ali Moath",
            description: "Learnova made the learning experience fun and easy for me. I loved the way the courses were organized, with interactive content and short videos that helped me understand quickly.",
            image: "/Photo/man_1.jpg"
        },
        {
            id: 2,
            name: "Sarah Ahmed",
            description: "The courses on Learnova are excellent and reliable, and I understood many concepts that I struggled with on other platforms. I loved the practical exercises and real-life examples that help to apply what I learned directly.",
            image: "Photo/women_1.jfif"
        },
        {
            id: 3,
            name: "Mohammed Ali",
            description: "The best thing about Learnova is that I can learn at my own pace without pressure. The platform allows me to return to the material and review it many times, and this has made me more confident while learning new skills.",
            image: "/Photo/man_2.jpg"
        },
        {
            id: 4,
            name: "Aisha Mohamed",
            description: "The trainers are professional and the content is wonderfully organized, with practical examples that make learning fun and realistic. I advise anyone who wants to develop their skills to start with Learnova immediately.",
            image: "Photo/women_2.jfif"
        },
        {
            id: 5,
            name: "Mohammed Salah",
            description: "I learned new skills on Learnova that are useful in my work and have boosted my self-confidence. The wide variety of courses and different ways of presenting content make learning more engaging and enjoyable..",
            image: "/Photo/man_3.jpg"
        },
        {
            id: 6,
            name: "Aya Mohamed",
            description: "The Learnova platform is flexible and easy to use. I loved the learning experience on it because it combines quality and flexibility. The videos, additional resources, and practical lessons helped me fully understand.",
            image: "Photo/women_3.jfif"
        },
    ];

    // ─── بيانات إنجازات المنصة (أرقام + أيقونات) ─────────────────────────────
    const Achievements = [
        { id: 1, icon: <Users size={32} />, number: "5000+", description: "The number of students currently registered on the platform." },
        { id: 2, icon: <BookOpen size={32} />, number: "120+", description: "Total number of courses available in all fields." },
        { id: 3, icon: <UserCheck size={32} />, number: "50+", description: "The number of trainers and experts who offer the courses." },
        { id: 4, icon: <Clock size={32} />, number: "10000+", description: "Total educational hours available to students." },
        { id: 5, icon: <Award size={32} />, number: "1500+", description: "Number of certificates awarded to students after completing the courses." }
    ];

    // ─── بيانات فريق العمل ────────────────────────────────────────────────────
    const Team = [
        { id: 1, name: "Mohammed Ali", role: "CEO", image: "/Photo/man_suites.jpg" },
        { id: 2, name: "George Smith", role: "CTO", image: "/Photo/man_suites_2.jpg" },
        { id: 3, name: "Adam Smith", role: "COO", image: "/Photo/man_suites_3.jpg" },
        { id: 4, name: "Alex Johnson", role: "CFO", image: "/Photo/man_suites_4.jpg" },
        { id: 5, name: "Mohammed Salah", role: "Senior Developer", image: "/Photo/man_suites_5.jpg" },
        { id: 6, name: "Emnaoui Hajar", role: "Junior Developer", image: "/Photo/women_suites_1.jpg" },
        { id: 7, name: "Mohammed Ali", role: "Marketing Manager", image: "/Photo/man_suites_6.jpg" },
        { id: 8, name: "George Smith", role: "CTO", image: "/Photo/man_suites_7.jpg" },
        { id: 9, name: "Mohammed Ali", role: "Marketing Manager", image: "/Photo/man_suites_8.jpg" },
        { id: 10, name: "Emnaoui Hajar", role: "Junior Developer", image: "/Photo/women_suites_2.jpg" },
    ];

    // عدد أعضاء الفريق المرئيين في وقت واحد داخل الكاروسيل
    const VISIBLE = 4;

    // ─── حالة الكاروسيل: تتبع موضع بداية الشريحة الحالية ────────────────────
    const [teamIndex, setTeamIndex] = useState(0);
    const canPrev = teamIndex > 0;
    const canNext = teamIndex + VISIBLE < Team.length;
    const visibleTeam = Team.slice(teamIndex, teamIndex + VISIBLE);

    return (
        <div className="about-us-container">

            {/* ── مسار التنقل (Breadcrumbs) ── */}
            <nav className="breadcrumbs-nav">
                <Link to="/Home" className="Breadcrumbs">
                    {t("setting.home", "Home")}
                </Link>

                {/* بناء مسار التنقل ديناميكياً من أجزاء الـ URL */}
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
                                <span className="current-page" style={{ textDecoration: 'none' }}>
                                    {t(`setting.${translationKey}`, decodeURIComponent(value).replace("_", " "))}
                                </span>
                            ) : (
                                <Link to={to} className="Breadcrumbs">
                                    {t(`setting.${translationKey}`, decodeURIComponent(value).replace("_", " "))}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </nav>

            {/* ── محتوى الصفحة الرئيسي ── */}
            <div className="about-us-content">

                {/* الشعار الترحيبي */}
                <h2 className="about-us-description">
                    {t("setting.about_us_description", "Empowering learners everywhere with simple, accessible, and high-quality courses.")}
                </h2>

                {/* ── قسم قصة Learnova ── */}
                <div className="about_us_Story">
                    <h2 className="Story_title">{t("setting.about_us_story_title", "The Story of Learnova")}</h2>
                    <div className="story-grid-container">
                        {StoryLearnova.map((story) => (
                            <div key={story.id} className="story-card">
                                <h3 className="story-title">{story.title}</h3>
                                <div className="story-description-box">
                                    {story.descriptions.map((desc, index) => (
                                        <p key={index} className="story-text">{desc}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── قسم شهادات الطلاب ── */}
                <div className="Trust_student">
                    <h1 className="Trust_title">{t("setting.about_us_trust_title", "Our trusted Students")}</h1>
                    <div className="Trust_student_container">
                        {TrustStudent.map((student) => (
                            <div className="student_card" key={student.id}>
                                <p className="student_description">{student.description}</p>
                                <div className="student_container">
                                    <img src={student.image} alt={student.name} className="student_image" />
                                    <p className="student_name">{student.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── قسم الإنجازات ── */}
                <div className="our-achievements">
                    <h1 className="Achievements_title">{t("setting.about_us_achievements_title", "Our Achievements")}</h1>
                    <div className="Achievements_container">
                        {Achievements.map((achievement) => (
                            <div className="achievement-card" key={achievement.id}>
                                <div className="achievement-IcNu-container">
                                    <div className="achievement-icon">{achievement.icon}</div>
                                    <h3 className="achievement-number">{achievement.number}</h3>
                                </div>
                                <p className="achievement-description">{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── قسم فريق العمل مع كاروسيل التنقل ── */}
                <div className="Team_learnova">
                    <h1 className="Team_title">{t("setting.about_us_team_title", "Our Team")}</h1>
                    <div className="team-carousel-wrapper">

                        {/* زر الرجوع للشريحة السابقة */}
                        <button
                            className={`team-arrow team-arrow-left ${!canPrev ? 'disabled' : ''}`}
                            onClick={() => canPrev && setTeamIndex(i => i - 1)}
                            aria-label="Previous"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* عرض أعضاء الفريق المرئيين حالياً */}
                        <div className="team-cards-track">
                            {visibleTeam.map((member) => (
                                <div className="team-card" key={member.id}>
                                    <div className="team-image-wrapper">
                                        <img src={member.image} alt={member.name} className="team-image" />
                                    </div>
                                    <h3 className="team-name">{member.name}</h3>
                                    <p className="team-role">{member.role}</p>
                                </div>
                            ))}
                        </div>

                        {/* زر التقدم للشريحة التالية */}
                        <button
                            className={`team-arrow team-arrow-right ${!canNext ? 'disabled' : ''}`}
                            onClick={() => canNext && setTeamIndex(i => i + 1)}
                            aria-label="Next"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* ── قسم الدعوة للعمل (CTA) ── */}
                <div className="about-cta-section">
                    <h2 className="about-cta-title">
                        {t("setting.about_cta_prefix", "Start Learning with")}{" "}
                        <span className="about-cta-brand">Learnova</span>{" "}
                        {t("setting.about_cta_suffix", "Today")}
                    </h2>
                    <p className="about-cta-subtitle">
                        {t("setting.about_cta_desc", "Discover high-quality courses taught by expert instructors and learn at your own pace, anytime and anywhere.")}
                    </p>
                    <Link to="/Explore" className="about-cta-btn">
                        <LayoutGrid size={18} />
                        <span>{t("setting.about_cta_btn", "Browse Courses")}</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default AboutUs;