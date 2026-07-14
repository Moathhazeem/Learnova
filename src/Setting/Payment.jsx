import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../config/i18n";
import { useTranslation } from "react-i18next";
import "./Payment.css";

/* ─────────────────────────────────────────────
   Utility: detect card brand from number
   ───────────────────────────────────────────── */
function detectBrand(number) {
    const n = number.replace(/\s/g, '');
    if (/^4/.test(n)) return 'visa';
    if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'mastercard';
    if (/^3[47]/.test(n)) return 'amex';
    if (/^6(?:011|5)/.test(n)) return 'discover';
    return 'generic';
}

/* ─────────────────────────────────────────────
   Sub-component: CardBrandIcon
   ───────────────────────────────────────────── */
function CardBrandIcon({ brand, size = 36 }) {
    if (brand === 'visa') return (
        <svg width={size} height={size * 0.63} viewBox="0 0 60 38" aria-label="Visa" role="img">
            <rect width="60" height="38" rx="6" fill="#1A1F71" />
            <text x="10" y="27" fontFamily="Arial" fontWeight="bold" fontSize="16" fill="#FFFFFF" letterSpacing="1">VISA</text>
        </svg>
    );
    if (brand === 'mastercard') return (
        <svg width={size} height={size * 0.63} viewBox="0 0 60 38" aria-label="Mastercard" role="img">
            <rect width="60" height="38" rx="6" fill="#252525" />
            <circle cx="22" cy="19" r="12" fill="#EB001B" />
            <circle cx="38" cy="19" r="12" fill="#F79E1B" />
            <path d="M30 9.5a12 12 0 010 19A12 12 0 0130 9.5z" fill="#FF5F00" />
        </svg>
    );
    if (brand === 'amex') return (
        <svg width={size} height={size * 0.63} viewBox="0 0 60 38" aria-label="American Express" role="img">
            <rect width="60" height="38" rx="6" fill="#2557D6" />
            <text x="8" y="25" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="#FFFFFF">AMEX</text>
        </svg>
    );
    if (brand === 'discover') return (
        <svg width={size} height={size * 0.63} viewBox="0 0 60 38" aria-label="Discover" role="img">
            <rect width="60" height="38" rx="6" fill="#F76F20" />
            <text x="6" y="25" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#FFFFFF">DISCOVER</text>
        </svg>
    );
    /* generic chip */
    return (
        <svg width={size} height={size * 0.75} viewBox="0 0 48 36" aria-hidden="true">
            <rect width="48" height="36" rx="5" fill="#FFD166" opacity="0.9" />
            <rect x="4" y="10" width="40" height="16" rx="3" fill="#FFB703" opacity="0.7" />
            <rect x="16" y="10" width="2" height="16" fill="#FFD166" opacity="0.8" />
            <rect x="30" y="10" width="2" height="16" fill="#FFD166" opacity="0.8" />
            <rect x="4" y="16" width="40" height="3" fill="#FFD166" opacity="0.6" />
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Utility: sort default card to top
   ───────────────────────────────────────────── */
function sortByDefault(methods) {
    return [...methods].sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
}

/* ─────────────────────────────────────────────
   Sub-component: PaymentCard
   ───────────────────────────────────────────── */
function PaymentCard({ last4, expiry, isDefault, brand, id, onMakeDefault, onDelete, canDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const cardBrand = brand || 'generic';

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`pc-card ${isDefault ? 'pc-card--default' : ''}`}>
            {isDefault && <span className="pc-card__accent" aria-hidden="true" />}

            <div className="pc-card__icon-wrap">
                <CardBrandIcon brand={cardBrand} size={48} />
            </div>

            <div className="pc-card__info">
                <div className="pc-card__row">
                    <span className="pc-card__number">•••• •••• •••• {last4}</span>
                    {isDefault ? (
                        <span className="pc-card__badge" aria-label="Default payment method">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: '4px' }}>
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            Default
                        </span>
                    ) : (
                        <button
                            type="button"
                            className="pc-card__make-default"
                            onClick={() => onMakeDefault(id)}
                            aria-label={`Make card ending in ${last4} the default`}
                        >
                            Make Default
                        </button>
                    )}
                </div>
                <div className="pc-card__meta-row">
                    <span className="pc-card__expiry">Expires {expiry}</span>
                    <span className="pc-card__brand-label">{cardBrand.charAt(0).toUpperCase() + cardBrand.slice(1)}</span>
                </div>
            </div>

            <div className="pc-card__menu-wrap" ref={menuRef}>
                <button
                    className="pc-card__menu-btn"
                    aria-label="Card actions"
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                    </svg>
                </button>

                {menuOpen && (
                    <div className="pc-card__dropdown" role="menu">
                        <button
                            className="pc-card__dropdown-item pc-card__dropdown-item--danger"
                            role="menuitem"
                            onClick={() => { onDelete(id); setMenuOpen(false); }}
                            disabled={!canDelete}
                            title={!canDelete ? 'Cannot delete the only card' : ''}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14H6L5 6" />
                                <path d="M10 11v6M14 11v6" />
                                <path d="M9 6V4h6v2" />
                            </svg>
                            Remove Card
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Sub-component: HistoryTable
   ───────────────────────────────────────────── */
function HistoryTable({ purchaseHistory, onDownload }) {
    const totalSpent = purchaseHistory
        .filter(i => i.status === 'Completed')
        .reduce((acc, i) => acc + parseFloat(i.price.replace('$', '')), 0);

    return (
        <div className="ph-section">
            <div className="ph-header">
                <div className="ph-header__text">
                    <h2 className="ph-header__title">Purchase History</h2>
                    <p className="ph-header__sub">View and download your course purchases</p>
                </div>
            </div>

            {/* Summary strip */}
            <div className="ph-summary-strip">
                <div className="ph-summary-item">
                    <span className="ph-summary-item__val">{purchaseHistory.length}</span>
                    <span className="ph-summary-item__label">Total Orders</span>
                </div>
                <div className="ph-summary-divider" />
                <div className="ph-summary-item">
                    <span className="ph-summary-item__val ph-summary-item__val--green">
                        {purchaseHistory.filter(i => i.status === 'Completed').length}
                    </span>
                    <span className="ph-summary-item__label">Completed</span>
                </div>
                <div className="ph-summary-divider" />
                <div className="ph-summary-item">
                    <span className="ph-summary-item__val ph-summary-item__val--money">${totalSpent.toFixed(2)}</span>
                    <span className="ph-summary-item__label">Total Spent</span>
                </div>
            </div>

            {/* Desktop table */}
            <div className="ph-table" role="table" aria-label="Purchase history">
                <div className="ph-table__head" role="row">
                    <span role="columnheader">Course</span>
                    <span role="columnheader">Date</span>
                    <span role="columnheader">Amount</span>
                    <span role="columnheader">Status</span>
                    <span role="columnheader">Payment Method</span>
                </div>
                {purchaseHistory.map((item, idx) => (
                    <div
                        key={item.id}
                        className={`ph-table__row ${idx % 2 === 1 ? 'ph-table__row--alt' : ''}`}
                        role="row"
                    >
                        <span className="ph-table__cell ph-table__cell--course" role="cell">
                            <span className="ph-table__course-dot" />
                            {item.course}
                        </span>
                        <span className="ph-table__cell ph-table__cell--date" role="cell">{item.date}</span>
                        <span className="ph-table__cell ph-table__cell--price" role="cell">{item.price}</span>
                        <span className="ph-table__cell" role="cell">
                            <span className={`ph-badge ph-badge--${item.status.toLowerCase()}`}>
                                <span className="ph-badge__dot" />
                                {item.status}
                            </span>
                        </span>
                        <span className="ph-table__cell ph-table__cell--method" role="cell">{item.method}</span>
                    </div>
                ))}
            </div>

            {/* Mobile card-stack view */}
            <div className="ph-mobile-stack" aria-label="Purchase history (mobile)">
                {purchaseHistory.map((item) => (
                    <div key={item.id} className="ph-mobile-card">
                        <div className="ph-mobile-card__top">
                            <span className="ph-mobile-card__course">{item.course}</span>
                            <span className={`ph-badge ph-badge--${item.status.toLowerCase()}`}>
                                <span className="ph-badge__dot" />
                                {item.status}
                            </span>
                        </div>
                        <div className="ph-mobile-card__row">
                            <span className="ph-mobile-card__label">Date</span>
                            <span className="ph-mobile-card__val">{item.date}</span>
                        </div>
                        <div className="ph-mobile-card__row">
                            <span className="ph-mobile-card__label">Amount</span>
                            <span className="ph-mobile-card__val ph-mobile-card__val--price">{item.price}</span>
                        </div>
                        <div className="ph-mobile-card__row">
                            <span className="ph-mobile-card__label">Method</span>
                            <span className="ph-mobile-card__val ph-mobile-card__val--method">{item.method}</span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="ph-download-btn" onClick={onDownload} aria-label="Download purchase history as CSV">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CSV
            </button>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Sub-component: SecurityBadge
   ───────────────────────────────────────────── */
function SecurityBadge() {
    return (
        <div className="security-badge" role="note" aria-label="Security information">
            <div className="security-badge__shield">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                </svg>
            </div>
            <span className="security-badge__text">
                Your transactions are secured with <strong>256-bit SSL encryption</strong>. We never store your full card details.
            </span>
            <div className="security-badge__icons">
                <span className="security-badge__pill">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: '4px' }}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    PCI DSS
                </span>
                <span className="security-badge__pill">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" style={{ marginRight: '4px' }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    256-bit SSL
                </span>
                <span className="security-badge__pill">✓ Verified</span>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main Component: Payment
   ───────────────────────────────────────────── */
function Payment() {
    const [hovered, setHovered] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );
    const search = {
        white: "/photo_icons/search_white.png",
        black: "/photo_icons/search_black.png"
    };

    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);
    const { t } = useTranslation();

    const categories = [
        { name: "Profile", path: "/Setting/Profile", black: "/photo_icons/For_setting/UserMaleBlack.png", white: "/photo_icons/For_setting/UserMaleWhite.png", blue: "/photo_icons/For_setting/UserMaleBlue.png" },
        { name: "Security", path: "/Setting/Security", black: "/photo_icons/For_setting/SecrityBlack.png", white: "/photo_icons/For_setting/SecrityWhite.png", blue: "/photo_icons/For_setting/SecrityBlue.png" },
        { name: "Preferences", path: "/Setting/Preferences", black: "/photo_icons/For_setting/PreferencesBlack.png", blue: "/photo_icons/For_setting/PreferencesBlue.png" },
        { name: "Privacy", path: "/Setting/Privacy", black: "/photo_icons/For_setting/PrivacyBlack.png", white: "/photo_icons/For_setting/PrivacyWhite.png", blue: "/photo_icons/For_setting/PrivacyBlue.png" },
        { name: "Notification", path: "/Setting/Notification", black: "/photo_icons/For_setting/NotificationBlack.png", white: "/photo_icons/For_setting/NotificationWhite.png", blue: "/photo_icons/For_setting/NotificationBlue.png" },
        { name: "Payment", path: "/Setting/Payment", black: "/photo_icons/For_setting/PaymentBlack.png", white: "/photo_icons/For_setting/PaymentWhite.png", blue: "/photo_icons/For_setting/PaymentBlue.png" },
    ];

    // Initialize payment methods from localStorage with fallback default data
    const [paymentMethods, setPaymentMethods] = useState(() => {
        const saved = localStorage.getItem('paymentMethods');
        return saved ? JSON.parse(saved) : [
            { id: 1, last4: "4242", expires: "12/26", isDefault: true, brand: 'visa' },
            { id: 2, last4: "1234", expires: "01/26", isDefault: false, brand: 'mastercard' },
        ];
    });
    const [cards, setCards] = useState([
        {
            id: 1,
            cardNumber: "•••• •••• •••• 4242",
            cardExpiry: "12/26",
            cardName: "Visa",
            brand: "visa",
            isDefault: true
        }
    ]);
    const [purchaseHistory] = useState([
        { id: 1, course: "Logo Design", date: "12 / 12 / 2025", price: "$80.00", status: "Completed", method: "**** **** **** 4242" },
        { id: 2, course: "Video Editing", date: "12 / 03 / 2024", price: "$100.00", status: "Completed", method: "**** **** **** 4122" },
        { id: 3, course: "JavaScript Mastery", date: "03 / 03 / 2023", price: "$100.00", status: "Completed", method: "**** **** **** 3332" },
        { id: 4, course: "React Native", date: "03 / 09 / 2024", price: "$50.00", status: "Refunded", method: "**** **** **** 1234" },
    ]);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [setAsDefault, setSetAsDefault] = useState(true);
    const [showCVV, setShowCVV] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const updateThemeState = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };
        updateThemeState();
        const observer = new MutationObserver(updateThemeState);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    // Save payment methods to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
    }, [paymentMethods]);

    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [showModal]);

    /* Format card number with spaces */
    const formatCardNumber = (val) => {
        const digits = val.replace(/\D/g, '').substring(0, 16);
        return digits.replace(/(.{4})/g, '$1 ').trim();
    };

    /* Format expiry MM/YY */
    const formatExpiry = (val) => {
        const digits = val.replace(/\D/g, '').substring(0, 4);
        if (digits.length >= 3) return digits.substring(0, 2) + '/' + digits.substring(2);
        return digits;
    };

    const showToastNotification = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3200);
    };

    const validateCardForm = () => {
        const errors = {};
        if (cardNumber.replace(/\s/g, '').length < 16) {
            errors.cardNumber = 'Card number must be 16 digits';
        }
        if (cardName.trim().length < 2) {
            errors.cardName = 'Enter the cardholder name';
        }
        if (cardExpiry.length < 5) {
            errors.cardExpiry = 'Enter a valid expiry (MM/YY)';
        }
        if (cardCVV.length < 3) {
            errors.cardCVV = 'Enter a valid CVC';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddMethod = async (e) => {
        e.preventDefault();
        if (!validateCardForm()) return;

        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 650));

            const brand = detectBrand(cardNumber);
            const newCard = {
                id: Date.now(),
                last4: cardNumber.replace(/\s/g, '').slice(-4),
                expires: cardExpiry,
                isDefault: setAsDefault,
                brand,
            };

            setPaymentMethods(prev => {
                const cleared = setAsDefault
                    ? prev.map(method => ({ ...method, isDefault: false }))
                    : prev;
                return sortByDefault([...cleared, newCard]);
            });

            closeModal();
            showToastNotification('Payment method added successfully');
            setCardNumber("");
            setCardExpiry("");
            setCardCVV("");
            setCardName("");
            setSetAsDefault(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSetDefault = (cardId) => {
        setPaymentMethods(prev =>
            sortByDefault(prev.map(method => ({ ...method, isDefault: method.id === cardId })))
        );
        showToastNotification('Default payment method updated');
    };

    const handleDelete = (id) => {
        if (paymentMethods.length <= 1) return;
        let updated = paymentMethods.filter(method => method.id !== id);
        if (!updated.some(method => method.isDefault) && updated.length > 0) {
            updated = updated.map((method, index) =>
                index === 0 ? { ...method, isDefault: true } : method
            );
        }
        setPaymentMethods(sortByDefault(updated));
        showToastNotification('Payment method removed');
    };

    const handleDownload = () => {
        const headers = ["Course", "Date", "Price", "Status", "Payment Method"];
        const csvContent = [
            headers.join(","),
            ...purchaseHistory.map(row =>
                `"${row.course}","${row.date}","${row.price}","${row.status}","${row.method}"`
            )
        ].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "purchase_history.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const openModal = () => { setShowModal(true); setFormErrors({}); setSetAsDefault(true); };
    const closeModal = () => {
        setShowModal(false);
        setFormErrors({});
        setCardNumber("");
        setCardName("");
        setCardExpiry("");
        setCardCVV("");
        setSetAsDefault(true);
        setShowCVV(false);
    };

    const sortedPaymentMethods = useMemo(() => {
        return sortByDefault(paymentMethods);
    }, [paymentMethods]);

    return (
        <div className="edit-profile-container">
            {/* Breadcrumbs */}
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
                                <Link to={to} className="Breadcrumbs">
                                    {t(`setting.${translationKey}`, value.replace("_", " "))}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </nav>

            {/* Settings sidebar */}
            <div className="Setting">
                <div className="header_setting">
                    <p>{t('setting.header', 'Settings')}</p>
                    <div className="search_page_setting">
                        <img src={isDarkMode ? search.white : search.black} alt="search" className="setting-search-icon" />
                        <input type="search" placeholder={t('setting.search', 'Search settings')} />
                    </div>
                </div>
                <div className="Setting_option">
                    {categories.map((category, index) => {
                        const isActive = location.pathname === category.path;
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
            </div>

            {/* ── Payment & Billing Dashboard ── */}
            <div className="payment-container billing-dashboard">

                <section className="pc-section">
                    <header className="pc-section__header">
                        <div className="pc-section__title-group">
                            <h1 className="pc-section__title">Payment Cards</h1>
                            <p className="pc-section__subtitle">Manage your payment methods and default billing card.</p>
                        </div>
                    </header>

                    <div className="pc-cards-grid">
                        {sortedPaymentMethods.map(method => (
                            <PaymentCard
                                key={method.id}
                                id={method.id}
                                last4={method.last4}
                                expiry={method.expires}
                                isDefault={method.isDefault}
                                brand={method.brand}
                                onMakeDefault={handleSetDefault}
                                onDelete={handleDelete}
                                canDelete={paymentMethods.length > 1}
                            />
                        ))}
                    </div>

                    <SecurityBadge />

                    <button className="pc-add-btn" onClick={openModal} aria-label="Add new payment card">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add New Card
                    </button>
                </section>

                <HistoryTable purchaseHistory={purchaseHistory} onDownload={handleDownload} />
            </div>

            {/* Toast feedback */}
            <div className={`pay-toast ${showToast ? 'pay-toast--show' : ''}`} role="status" aria-live="polite">
                <div className="pay-toast__content">
                    <svg viewBox="0 0 24 24" width="18" height="18" className="pay-toast__icon" aria-hidden="true">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>{toastMessage}</span>
                </div>
            </div>

            {/* ── Add Payment Method Modal ── */}
            {showModal && (
                <div
                    className="modal"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className="modal-content modal-content--card" onClick={e => e.stopPropagation()}>
                        <div className="modal-header modal-header--stacked">
                            <div className="modal-header__text">
                                <h2 id="modal-title">Add New Payment Method</h2>
                                <p className="modal-header__subtitle">Your card details are encrypted and secure.</p>
                            </div>
                            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <form className="modal-body" onSubmit={handleAddMethod} noValidate>
                            <div className="form-group">
                                <label htmlFor="card-number">Card Number</label>
                                <div className="form-input-wrap">
                                    <span className="form-input-icon" aria-hidden="true">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                            <line x1="1" y1="10" x2="23" y2="10" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        id="card-number"
                                        placeholder="1234 5678 9012 3456"
                                        inputMode="numeric"
                                        maxLength="19"
                                        value={cardNumber}
                                        onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                                        autoComplete="cc-number"
                                    />
                                    <span className="form-input-brand">
                                        <CardBrandIcon brand={detectBrand(cardNumber)} size={28} />
                                    </span>
                                </div>
                                {formErrors.cardNumber && <p className="error">{formErrors.cardNumber}</p>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="card-expiry">Expiry</label>
                                    <div className="form-input-wrap">
                                        <span className="form-input-icon" aria-hidden="true">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            id="card-expiry"
                                            placeholder="MM/YY"
                                            inputMode="numeric"
                                            maxLength="5"
                                            value={cardExpiry}
                                            onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                                            autoComplete="cc-exp"
                                        />
                                    </div>
                                    {formErrors.cardExpiry && <p className="error">{formErrors.cardExpiry}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="card-cvv">CVC</label>
                                    <div className="form-input-wrap">
                                        <span className="form-input-icon" aria-hidden="true">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                <path d="M7 11V7a5 5 0 0110 0v4" />
                                            </svg>
                                        </span>
                                        <input
                                            type={showCVV ? "text" : "password"}
                                            id="card-cvv"
                                            placeholder="•••"
                                            inputMode="numeric"
                                            maxLength="4"
                                            value={cardCVV}
                                            onChange={e => setCardCVV(e.target.value.replace(/\D/g, ''))}
                                            autoComplete="cc-csc"
                                        />
                                        <button
                                            type="button"
                                            className="form-cvv-toggle"
                                            onClick={() => setShowCVV(v => !v)}
                                            aria-label={showCVV ? "Hide CVC" : "Show CVC"}
                                        >
                                            {showCVV ? (
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                                                    <line x1="1" y1="1" x2="23" y2="23" />
                                                </svg>
                                            ) : (
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {formErrors.cardCVV && <p className="error">{formErrors.cardCVV}</p>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="card-name">Cardholder Name</label>
                                <div className="form-input-wrap">
                                    <span className="form-input-icon" aria-hidden="true">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        id="card-name"
                                        placeholder="John Doe"
                                        value={cardName}
                                        onChange={e => setCardName(e.target.value)}
                                        autoComplete="cc-name"
                                    />
                                </div>
                                {formErrors.cardName && <p className="error">{formErrors.cardName}</p>}
                            </div>

                            <label className="form-checkbox">
                                <input
                                    type="checkbox"
                                    checked={setAsDefault}
                                    onChange={e => setSetAsDefault(e.target.checked)}
                                />
                                <span className="form-checkbox__box" aria-hidden="true" />
                                <span className="form-checkbox__label">Set as my default payment method</span>
                            </label>

                            <div className="modal-footer modal-footer--stacked">
                                <button type="submit" className="add-card-btn" disabled={isSubmitting}>
                                    {isSubmitting ? 'Adding Card…' : 'Add Card'}
                                </button>
                                <button type="button" className="modal-cancel-btn" onClick={closeModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payment;