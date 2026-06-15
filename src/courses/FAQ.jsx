import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Search, ChevronDown, MessageSquare } from "lucide-react";
import './FAQ.css';

const FAQ_DATA = {
    General: [
        { q: "What is Learnova and how does it work?",           a: "Learnova is an all-in-one online learning platform that connects learners with expert instructors. Browse courses, enroll, and study at your own pace from any device." },
        { q: "Who can use Learnova?",                            a: "Anyone can use Learnova — students, professionals, and lifelong learners. Whether you're starting from scratch or advancing your skills, there's something for you." },
        { q: "Is Learnova accessible on all devices?",           a: "Yes! Learnova is fully responsive and works on desktops, tablets, and mobile phones. You can also use our mobile app for offline access." },
        { q: "Do I need to install any software?",               a: "No installation required. Learnova runs entirely in your browser. Just create an account and start learning right away." },
        { q: "Can I learn at my own pace?",                      a: "Absolutely. All courses are self-paced. You can pause, rewind, and revisit any lesson as many times as you need." },
        { q: "Are Learnova courses free?",                       a: "We offer both free and paid courses. Many courses have a free preview so you can try before you buy." },
    ],
    "Account & Registration": [
        { q: "How do I create an account?",                      a: "Click 'Sign Up' on the homepage, fill in your details, and verify your email. You'll be ready to learn in minutes." },
        { q: "Can I change my email address?",                   a: "Yes. Go to Settings → Profile and update your email. A verification link will be sent to your new address." },
        { q: "How do I reset my password?",                      a: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to your inbox." },
    ],
    Courses: [
        { q: "How do I enroll in a course?",                     a: "Find a course you like, click 'Enroll Now', complete the payment if required, and you'll have instant access." },
        { q: "Can I get a refund?",                              a: "Yes, we offer a 30-day money-back guarantee. Contact support if you're unsatisfied within 30 days of purchase." },
        { q: "How long do I have access to a course?",           a: "Once enrolled, you have lifetime access to the course content, including any future updates the instructor makes." },
    ],
    "Learning Experience": [
        { q: "Can I download course videos?",                    a: "Video downloads are available on our mobile app for offline viewing. Desktop streaming requires an internet connection." },
        { q: "Are there quizzes or assignments?",                a: "Many courses include quizzes, coding exercises, and projects to reinforce your learning and track your progress." },
    ],
    Certificates: [
        { q: "Do I get a certificate after completing a course?", a: "Yes! Upon completing all course requirements, you'll receive a verified certificate you can share on LinkedIn or your resume." },
        { q: "Are certificates recognized by employers?",        a: "Our certificates are widely recognized. Many of our courses are developed in partnership with industry-leading companies." },
    ],
    "Payments & Pricing": [
        { q: "What payment methods are accepted?",               a: "We accept credit/debit cards, PayPal, and Apple Pay. All transactions are secured with SSL encryption." },
        { q: "Are there subscription plans?",                    a: "Yes. Our Learnova Pro subscription gives you unlimited access to all courses for a flat monthly or annual fee." },
    ],
    "Technical Support": [
        { q: "The video isn't playing. What should I do?",       a: "Try refreshing the page, clearing your browser cache, or switching browsers. If the issue persists, contact our support team." },
        { q: "How do I contact support?",                        a: "Visit our Contact Us page or email us at Learnovasupport@gmail.com. We respond within 24 hours on business days." },
    ],
    Instructors: [
        { q: "How can I become an instructor?",                  a: "Apply through our 'Teach on Learnova' page. Submit a sample lesson, and our team will review your application within 5 business days." },
        { q: "How do instructors get paid?",                     a: "Instructors earn a revenue share on every enrollment. Payments are processed monthly via bank transfer or PayPal." },
    ],
};

const CATEGORIES = Object.keys(FAQ_DATA);

function AccordionItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`faq-accordion-item ${open ? 'open' : ''}`}>
            <button className="faq-accordion-header" onClick={() => setOpen(o => !o)}>
                <span>{question}</span>
                <ChevronDown size={20} className="faq-chevron" />
            </button>
            {open && <div className="faq-accordion-body">{answer}</div>}
        </div>
    );
}

function FAQ() {
    const { t } = useTranslation();
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);

    const [activeCategory, setActiveCategory] = useState("General");
    const [search, setSearch] = useState("");

    const questions = FAQ_DATA[activeCategory] || [];
    const filtered = search.trim()
        ? questions.filter(item =>
            item.q.toLowerCase().includes(search.toLowerCase()) ||
            item.a.toLowerCase().includes(search.toLowerCase())
          )
        : questions;

    return (
        <div className="FAQ-container">
            {/* Breadcrumbs */}
            <nav className="breadcrumbs-nav">
                <Link to="/Home" className="Breadcrumbs">{t("setting.home", "Home")}</Link>
                {pathname.map((value, index) => {
                    const to = "/" + pathname.slice(0, index + 1).join("/").toLowerCase();
                    const isLast = index === pathname.length - 1;
                    const translationKey = value.toLowerCase().replace("%20", "_").replace(" ", "_");
                    const fallbackText = decodeURIComponent(value).replace(/[_-]/g, " ");
                    if (value.toLowerCase() === 'home') return null;
                    return (
                        <span key={to} style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="breadcrumb-separator">{t("setting.breadcrumb_separator", ">")}</span>
                            {isLast
                                ? <span className="current-page">{t(`setting.${translationKey}`, fallbackText)}</span>
                                : <Link to={to} className="Breadcrumbs">{t(`setting.${translationKey}`, fallbackText)}</Link>
                            }
                        </span>
                    );
                })}
            </nav>

            {/* Hero */}
            <div className="faq-hero">
                <h1 className="faq-hero-title">{t("setting.faq", "Frequently Asked Questions")}</h1>
                <p className="faq-hero-subtitle">
                    {t("setting.faq_content", "Find quick answers to the most common questions about Learnova, including courses, accounts, certificates, and technical support.")}
                </p>
            </div>

            {/* Main Layout */}
            <div className="faq-layout">

                {/* Sidebar */}
                <aside className="faq-sidebar">
                    <p className="faq-sidebar-label">{t("setting.faq_categories", "Categories")}</p>
                    <ul className="faq-category-list">
                        {CATEGORIES.map(cat => (
                            <li key={cat}>
                                <button
                                    className={`faq-category-btn ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => { setActiveCategory(cat); setSearch(""); }}
                                >
                                    {cat}
                                    {activeCategory === cat && <span className="faq-check">✓</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Content */}
                <div className="faq-content-area">

                    {/* Search */}
                    <div className="faq-search-wrapper">
                        <Search size={18} className="faq-search-icon" />
                        <input
                            className="faq-search-input"
                            type="search"
                            placeholder={t("setting.search_faq", "Search")}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Accordion */}
                    <div className="faq-accordion-list">
                        {filtered.length > 0
                            ? filtered.map((item, i) => (
                                <AccordionItem key={i} question={item.q} answer={item.a} />
                              ))
                            : <p className="faq-no-results">No results found for "{search}"</p>
                        }
                    </div>

                    {/* Didn't find banner */}
                    <div className="faq-cta-banner">
                        <div className="faq-cta-left">
                            <MessageSquare size={22} className="faq-cta-icon" />
                            <div>
                                <p className="faq-cta-title">{t("setting.faq_cta_title", "Didn't find your answer?")}</p>
                                <p className="faq-cta-subtitle">{t("setting.faq_cta_subtitle", "If you don't find your answer Contact our support team here")}</p>
                            </div>
                        </div>
                        <Link to="/Contact_us" className="faq-cta-btn">
                            <MessageSquare size={16} />
                            <span>{t("setting.faq_cta_btn", "Contact us")}</span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default FAQ;
