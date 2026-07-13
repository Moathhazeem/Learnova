import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../config/i18n";
import { useTranslation } from "react-i18next";
import "./Payment.css";

/* ─────────────────────────────────────────────
   Sub-component: PaymentCard
   ───────────────────────────────────────────── */
function PaymentCard({ card, cards, onSetDefault, onDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
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
        <div className={`pc-card ${card.isDefault ? 'pc-card--default' : ''}`}>
            {/* Left accent bar for default card */}
            {card.isDefault && <span className="pc-card__accent" aria-hidden="true" />}

            {/* Card brand icon */}
            <div className="pc-card__icon-wrap">
                <svg className="pc-card__chip" viewBox="0 0 40 30" fill="none" aria-hidden="true">
                    <rect width="40" height="30" rx="4" fill="#FFD166" opacity="0.9"/>
                    <rect x="4" y="9" width="32" height="12" rx="2" fill="#FFB703" opacity="0.7"/>
                    <rect x="14" y="9" width="2" height="12" fill="#FFD166" opacity="0.8"/>
                    <rect x="24" y="9" width="2" height="12" fill="#FFD166" opacity="0.8"/>
                    <rect x="4" y="13" width="32" height="2" fill="#FFD166" opacity="0.6"/>
                </svg>
            </div>

            {/* Card info */}
            <div className="pc-card__info">
                <div className="pc-card__row">
                    <span className="pc-card__number">•••• •••• •••• {card.last4}</span>
                    {card.isDefault && (
                        <span className="pc-card__badge" aria-label="Default card">Default</span>
                    )}
                </div>
                <span className="pc-card__expiry">Expires {card.expires}</span>
            </div>

            {/* Contextual action menu (three-dot) */}
            <div className="pc-card__menu-wrap" ref={menuRef}>
                <button
                    className="pc-card__menu-btn"
                    aria-label="Card actions"
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <circle cx="12" cy="5" r="2"/>
                        <circle cx="12" cy="12" r="2"/>
                        <circle cx="12" cy="19" r="2"/>
                    </svg>
                </button>

                {menuOpen && (
                    <div className="pc-card__dropdown" role="menu">
                        {!card.isDefault && (
                            <button
                                className="pc-card__dropdown-item pc-card__dropdown-item--primary"
                                role="menuitem"
                                onClick={() => { onSetDefault(card.id); setMenuOpen(false); }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                Set as Default
                            </button>
                        )}
                        <button
                            className="pc-card__dropdown-item pc-card__dropdown-item--danger"
                            role="menuitem"
                            onClick={() => { onDelete(card.id); setMenuOpen(false); }}
                            disabled={cards.length <= 1}
                            title={cards.length <= 1 ? 'Cannot delete the only card' : ''}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6l-1 14H6L5 6"/>
                                <path d="M10 11v6M14 11v6"/>
                                <path d="M9 6V4h6v2"/>
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
    return (
        <div className="ph-section">
            {/* Section header */}
            <div className="ph-header">
                <div className="ph-header__text">
                    <h2 className="ph-header__title">Purchase History</h2>
                    <p className="ph-header__sub">View and download your course purchases</p>
                </div>
                <button className="ph-download-btn" onClick={onDownload} aria-label="Download purchase history as CSV">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download CSV
                </button>
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
                        <span className="ph-table__cell ph-table__cell--course" role="cell">{item.course}</span>
                        <span className="ph-table__cell ph-table__cell--date" role="cell">{item.date}</span>
                        <span className="ph-table__cell ph-table__cell--price" role="cell">{item.price}</span>
                        <span className="ph-table__cell" role="cell">
                            <span className={`ph-badge ph-badge--${item.status.toLowerCase()}`}>{item.status}</span>
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
                            <span className={`ph-badge ph-badge--${item.status.toLowerCase()}`}>{item.status}</span>
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
        </div>
    );
}

/* ─────────────────────────────────────────────
   Sub-component: SecurityBadge
   ───────────────────────────────────────────── */
function SecurityBadge() {
    return (
        <div className="security-badge" role="note" aria-label="Security information">
            <svg className="security-badge__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span className="security-badge__text">
                Your transactions are secured with <strong>256-bit SSL encryption</strong>. We never store your full card details.
            </span>
            <div className="security-badge__icons">
                <span className="security-badge__pill">PCI DSS</span>
                <span className="security-badge__pill">256-bit SSL</span>
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

    const [cards, setCards] = useState([
        { id: 1, last4: "4242", expires: "27/12/2026", isDefault: true },
        { id: 2, last4: "1234", expires: "27/1/2026", isDefault: false }
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
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);

    useEffect(() => {
        const updateThemeState = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };
        updateThemeState();
        const observer = new MutationObserver(updateThemeState);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [showModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = [];
        let newSuccess = [];

        if (cardNumber.replace(/\s/g, '').length < 16) {
            newErrors.push("Card number must be 16 digits");
        } else {
            newSuccess.push("Card number is valid");
        }
        if (cardName.length < 2) {
            newErrors.push("Card name must be at least 2 characters");
        } else {
            newSuccess.push("Card name is valid");
        }
        if (cardExpiry.length < 5) {
            newErrors.push("Card expiry must be at least 5 characters");
        } else {
            newSuccess.push("Card expiry is valid");
        }
        if (cardCVV.length < 3) {
            newErrors.push("Card CVV must be at least 3 characters");
        } else {
            newSuccess.push("Card CVV is valid");
        }

        if (newErrors.length > 0) {
            setError(newErrors);
            setSuccess(newSuccess);
            return;
        }

        const newCard = {
            id: Date.now(),
            last4: cardNumber.replace(/\s/g, '').slice(-4) || "****",
            expires: cardExpiry,
            isDefault: cards.length === 0,
        };
        setCards([...cards, newCard]);
        setShowModal(false);
        setCardNumber(""); setCardName(""); setCardExpiry(""); setCardCVV("");
        setSuccess(["Card added successfully"]);
        setError([]);
    };

    const handleSetDefault = (id) => {
        setCards(cards.map(c => ({ ...c, isDefault: c.id === id })));
    };

    const handleDelete = (id) => {
        if (cards.length <= 1) return;
        const updated = cards.filter(c => c.id !== id);
        if (!updated.some(c => c.isDefault) && updated.length > 0) {
            updated[0].isDefault = true;
        }
        setCards(updated);
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

    const openModal = () => { setShowModal(true); setError([]); setSuccess([]); };
    const closeModal = () => { setShowModal(false); setError([]); setSuccess([]); };

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

            {/* ── Payment Content ── */}
            <div className="payment-container">

                {/* Section: Payment Cards */}
                <div className="pc-section">
                    <div className="pc-section__header">
                        <div className="pc-section__title-group">
                            <h1 className="pc-section__title">Payment Cards</h1>
                            <p className="pc-section__subtitle">Manage your payment methods and default billing card.</p>
                        </div>
                        <button className="pc-add-btn" onClick={openModal} aria-label="Add new payment card">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                            Add New Card
                        </button>
                    </div>

                    {/* Cards grid */}
                    <div className="pc-cards-grid">
                        {cards.map(card => (
                            <PaymentCard
                                key={card.id}
                                card={card}
                                cards={cards}
                                onSetDefault={handleSetDefault}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                    {/* Security Footer */}
                    <SecurityBadge />
                </div>

                {/* Section: Purchase History */}
                <HistoryTable purchaseHistory={purchaseHistory} onDownload={handleDownload} />
            </div>

            {/* ── Add Card Modal ── */}
            {showModal && (
                <div
                    className="modal"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        className="modal-content"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <div className="modal-header__icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                                    <line x1="1" y1="10" x2="23" y2="10"/>
                                </svg>
                            </div>
                            <h2 id="modal-title">Add New Card</h2>
                            <button
                                className="modal-close-btn"
                                onClick={closeModal}
                                aria-label="Close modal"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-group">
                                    <label htmlFor="card-number">Card Number</label>
                                    <input
                                        type="text"
                                        id="card-number"
                                        placeholder="1234 5678 9012 3456"
                                        inputMode="numeric"
                                        maxLength="19"
                                        value={cardNumber}
                                        onChange={e => setCardNumber(e.target.value)}
                                        autoComplete="cc-number"
                                    />
                                    {error.find(m => m.toLowerCase().includes("card number")) && (
                                        <p className="error">{error.find(m => m.toLowerCase().includes("card number"))}</p>
                                    )}
                                    {success.find(m => m.toLowerCase().includes("card number")) && (
                                        <p className="success">{success.find(m => m.toLowerCase().includes("card number"))}</p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="card-name">Cardholder Name</label>
                                    <input
                                        type="text"
                                        id="card-name"
                                        placeholder="John Doe"
                                        value={cardName}
                                        onChange={e => setCardName(e.target.value)}
                                        autoComplete="cc-name"
                                    />
                                    {error.find(m => m.toLowerCase().includes("card name")) && (
                                        <p className="error">{error.find(m => m.toLowerCase().includes("card name"))}</p>
                                    )}
                                    {success.find(m => m.toLowerCase().includes("card name")) && (
                                        <p className="success">{success.find(m => m.toLowerCase().includes("card name"))}</p>
                                    )}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="card-expiry">Expiry Date</label>
                                        <input
                                            type="text"
                                            id="card-expiry"
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            value={cardExpiry}
                                            onChange={e => setCardExpiry(e.target.value)}
                                            autoComplete="cc-exp"
                                        />
                                        {error.find(m => m.toLowerCase().includes("card expiry")) && (
                                            <p className="error">{error.find(m => m.toLowerCase().includes("card expiry"))}</p>
                                        )}
                                        {success.find(m => m.toLowerCase().includes("card expiry")) && (
                                            <p className="success">{success.find(m => m.toLowerCase().includes("card expiry"))}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="card-cvv">CVV</label>
                                        <input
                                            type="text"
                                            id="card-cvv"
                                            placeholder="123"
                                            maxLength="3"
                                            value={cardCVV}
                                            onChange={e => setCardCVV(e.target.value)}
                                            autoComplete="cc-csc"
                                        />
                                        {error.find(m => m.toLowerCase().includes("card cvv")) && (
                                            <p className="error">{error.find(m => m.toLowerCase().includes("card cvv"))}</p>
                                        )}
                                        {success.find(m => m.toLowerCase().includes("card cvv")) && (
                                            <p className="success">{success.find(m => m.toLowerCase().includes("card cvv"))}</p>
                                        )}
                                    </div>
                                </div>

                                <button type="submit" className="add-card-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                        <line x1="12" y1="5" x2="12" y2="19"/>
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                    </svg>
                                    Add Card
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payment;