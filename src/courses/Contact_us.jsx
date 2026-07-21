import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import './Contact_us.css';
import 'react-phone-number-input/style.css';

import {
    Mail,
    Phone,
    User,
    MapPin,
    Send
} from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import Select from 'react-select';
import countryList from 'react-select-country-list';

function Contact_us() {
    const { t } = useTranslation();
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);

    // Get country list for the location selector
    const options = useMemo(() => countryList().getData(), []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: null,
        message: '',
        subjects: []
    });

    // Format country option to show flag + name
    const formatOptionLabel = ({ label, value }, { context }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
                src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}
                alt={label}
                style={{ borderRadius: '2px', width: '20px' }}
            />
            <span style={{ fontSize: context === 'menu' ? '14px' : '15px' }}>{label}</span>
        </div>
    );

    const subjects = [
        "Question about the course",
        "Technical support",
        "General complaint",
        "Comments",
        "Payment problems",
        "Other"
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubjectChange = (subject) => {
        setFormData(prev => {
            const newSubjects = prev.subjects.includes(subject)
                ? prev.subjects.filter(s => s !== subject)
                : [...prev.subjects, subject];
            return { ...prev, subjects: newSubjects };
        });
    };

    return (
        <div className="contact-page-wrapper">
            <div className="contact-page-container">
                {/* Breadcrumbs */}
                <nav className="contact-page-breadcrumbs-nav">
                    <Link to="/Home" className="contact-page-breadcrumb-item">
                        {t("setting.home", "Home")}
                    </Link>
                    {pathname.map((value, index) => {
                        const to = "/" + pathname.slice(0, index + 1).join("/");
                        const isLast = index === pathname.length - 1;
                        const translationKey = value.toLowerCase().replace("%20", "_").replace(" ", "_");

                        return (
                            <span key={to} style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="contact-page-breadcrumb-separator">
                                    {t("setting.breadcrumb_separator", ">")}
                                </span>
                                {isLast ? (
                                    <span className="contact-page-current-page" style={{ textDecoration: 'none' }}>
                                        {t(`setting.${translationKey}`, decodeURIComponent(value).replace("_", " "))}
                                    </span>
                                ) : (
                                    <Link to={to} className="contact-page-breadcrumb-item">
                                        {t(`setting.${translationKey}`, decodeURIComponent(value).replace("_", " "))}
                                    </Link>
                                )}
                            </span>
                        );
                    })}
                </nav>

                <div className="contact-page-header">
                    <h1 className="contact-page-title">{t("contact.title", "Contact us")}</h1>
                    <p className="contact-page-description">
                        {t("contact.description", "We care about your experience and strive to provide the best possible support. Whether you have a question about the courses, a suggestion for improving the platform, or any problem you are facing, you can easily contact us here. Fill out the form below or use other means of communication, and we will get back to you as soon as possible to ensure you get the help you need.")}
                    </p>
                </div>

                <div className="contact-page-main-layout">
                    {/* Left Column: Form */}
                    <div className="contact-page-form-container">
                        <div className="contact-page-form-card">
                            <form className="contact-page-form">
                                <div className="contact-page-form-row">
                                    <div className="contact-page-form-group">
                                        <label>{t("contact.first_name", "First name")}</label>
                                        <div className="contact-page-input-with-icon">
                                            <User size={18} className="contact-page-input-icon" />
                                            <input 
                                                type="text" 
                                                name="firstName"
                                                placeholder="Moath" 
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="contact-page-form-group">
                                        <label>{t("contact.last_name", "Last name")}</label>
                                        <div className="contact-page-input-with-icon">
                                            <User size={18} className="contact-page-input-icon" />
                                            <input 
                                                type="text" 
                                                name="lastName"
                                                placeholder="Hazeem" 
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-page-form-group">
                                    <label>{t("contact.email", "Email")}</label>
                                    <div className="contact-page-input-with-icon">
                                        <Mail size={18} className="contact-page-input-icon" />
                                        <input 
                                            type="email" 
                                            name="email"
                                            placeholder="Moathhazeem661@gmail.com" 
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="contact-page-form-group">
                                    <label>{t("contact.phone", "Phone number")}</label>
                                    <div className="contact-page-phone-input-wrapper-container">
                                        <PhoneInput 
                                            placeholder="+970 59 286 4889 (optional)" 
                                            value={formData.phone}
                                            onChange={(val) => setFormData(prev => ({ ...prev, phone: val }))}
                                            defaultCountry="PS"
                                            className="contact-page-custom-phone-input"
                                        />
                                        <div className="contact-page-phone-icon-right">
                                            <Phone size={18} />
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-page-form-group">
                                    <label>{t("contact.location", "Location")}</label>
                                    <div className="contact-page-location-input-wrapper">
                                        <MapPin size={18} className="contact-page-input-icon" />
                                        <Select
                                            value={formData.location}
                                            onChange={(opt) => setFormData(prev => ({ ...prev, location: opt }))}
                                            options={options}
                                            formatOptionLabel={formatOptionLabel}
                                            className="contact-page-location-select-container"
                                            classNamePrefix="contact-page-location-select"
                                            placeholder={t("contact.select_country", "Select country")}
                                            isSearchable={true}
                                            menuPortalTarget={document.body}
                                            styles={{
                                                menuPortal: base => ({ ...base, zIndex: 9999 }),
                                                control: (base) => ({
                                                    ...base,
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                    minHeight: '52px',
                                                    cursor: 'pointer',
                                                    zIndex: 5
                                                }),
                                                container: (base) => ({
                                                    ...base,
                                                    width: '100%',
                                                    flex: 1
                                                })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="contact-page-form-group">
                                    <label>{t("contact.message", "Message")}</label>
                                    <div className="contact-page-textarea-wrapper">
                                        <textarea 
                                            name="message"
                                            placeholder="Leave us a message" 
                                            value={formData.message}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="contact-page-subjects-section">
                                    <label className="contact-page-section-label">{t("contact.how_can_we_help", "How can we help?")}</label>
                                    <div className="contact-page-subjects-grid">
                                        {subjects.map(subject => (
                                            <label key={subject} className={`contact-page-subject-chip ${formData.subjects.includes(subject) ? 'contact-page-active' : ''}`}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={formData.subjects.includes(subject)}
                                                    onChange={() => handleSubjectChange(subject)}
                                                />
                                                <span className="contact-page-subject-label">{t(`contact.subject_${subject.toLowerCase().replace(/ /g, '_')}`, subject)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button type="submit" className="contact-page-send-message-btn">
                                    <span>{t("contact.send_message", "Send message")}</span>
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Info */}
                    <div className="contact-page-info-container">
                        <div className="contact-page-info-section">
                            <h3 className="contact-page-info-title">{t("contact.email_support_title", "Email support")}</h3>
                            <p className="contact-page-info-text">{t("contact.email_support_desc", "Email us and we'll get back to you within 24 hours")}</p>
                            <a href="mailto:Learnovasupport@gmail.com" className="contact-page-info-link">Learnovasupport@gmail.com</a>
                        </div>

                        <div className="contact-page-info-section">
                            <h3 className="contact-page-info-title">{t("contact.call_us_title", "Call us")}</h3>
                            <p className="contact-page-info-text">{t("contact.call_us_desc", "If you prefer to speak directly with us, you can call the number below. Our support team is ready to answer your questions and help you with any problem you encounter while using the platform.")}</p>
                            <a href="tel:0592994880" className="contact-page-info-link">0592994880</a>
                        </div>

                        <div className="contact-page-info-section">
                            <h3 className="contact-page-info-title">{t("contact.working_hours_title", "Working hours")}</h3>
                            <p className="contact-page-info-text">{t("contact.working_hours_desc", "Our team is available to answer your questions during working hours: Sunday – Thursday, 9:00 AM – 5:00 PM")}</p>
                        </div>

                        <div className="contact-page-info-section">
                            <h3 className="contact-page-info-title">{t("contact.faq_title", "FAQ")}</h3>
                            <p className="contact-page-info-text">
                                {t("contact.faq_desc_prefix", "For more information, you can visit the Frequently Asked Questions (")}
                                <Link to="/faq" className="contact-page-inline-link">FAQ</Link>
                                {t("contact.faq_desc_suffix", ") section where you will find answers to the most common questions without having to send a message.")}
                            </p>
                        </div>

                        <div className="contact-page-info-section">
                            <h3 className="contact-page-info-title">{t("contact.social_media_title", "Social media")}</h3>
                            <div className="contact-page-social-links">
                                <div className="contact-page-social-item">
                                    <div className="contact-page-social-icon-wrapper contact-page-fb">
                                        <img src="/photo_icons/facebook.png" alt="Facebook" style={{ width: '20px', height: '20px' }} />
                                    </div>
                                    <p className="contact-page-social-text">{t("contact.fb_desc", "Follow us on Facebook for the latest updates.")}</p>
                                </div>
                                <div className="contact-page-social-item">
                                    <div className="contact-page-social-icon-wrapper contact-page-ig">
                                        <img src="/photo_icons/instagram.png" alt="Instagram" style={{ width: '20px', height: '20px' }} />
                                    </div>
                                    <p className="contact-page-social-text">{t("contact.ig_desc", "Check out the course content and tips on Instagram.")}</p>
                                </div>
                                <div className="contact-page-social-item">
                                    <div className="contact-page-social-icon-wrapper contact-page-li">
                                        <img src="/photo_icons/linkedin.png" alt="LinkedIn" style={{ width: '20px', height: '20px' }} />
                                    </div>
                                    <p className="contact-page-social-text">{t("contact.li_desc", "Connect with us on LinkedIn for company news and opportunities.")}</p>
                                </div>
                                <div className="contact-page-social-item">
                                    <div className="contact-page-social-icon-wrapper contact-page-yt">
                                        <img src="/photo_icons/youtube.png" alt="YouTube" style={{ width: '20px', height: '20px' }} />
                                    </div>
                                    <p className="contact-page-social-text">{t("contact.yt_desc", "Subscribe to our YouTube channel to watch course explanations and educational videos.")}</p>
                                </div>
                                <div className="contact-page-social-item">
                                    <div className="contact-page-social-icon-wrapper contact-page-tw">
                                        <img src="/photo_icons/twitter.png" alt="Twitter" style={{ width: '20px', height: '20px' }} />
                                    </div>
                                    <p className="contact-page-social-text">{t("contact.tw_desc", "Follow us on X for the latest news, updates, and quick content.")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact_us;
