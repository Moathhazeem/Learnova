import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../config/i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import "./Payment.css";

function Payment() {
    const [hovered, setHovered] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains("dark"));
    const search = {
        white: "/photo_icons/search_white.png",
        black: "/photo_icons/search_black.png"
    }
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

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
    useEffect(() => {
        const updateThemeState = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };
        updateThemeState();

        const observer = new MutationObserver(updateThemeState);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault();
        /*(if (!cardNumber || !cardExpiry) return;*/
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
            last4: cardNumber.slice(-4) || "****",
            expires: cardExpiry,
            isDefault: cards.length === 0,
        };

        setCards([...cards, newCard]);
        setShowModal(false);
        setCardNumber("");
        setCardName("");
        setCardExpiry("");
        setCardCVV("");
        setSuccess(["Card added successfully"]);
        setError([]);
    }
    const handleSetDefault = (id) => {
        const updatedCards = cards.map(card => ({ ...card, isDefault: card.id === id }));
        setCards(updatedCards);


    }
    const handleDelete = (id) => {
        if (cards.length <= 1) return; // Prevent deleting the last remaining card

        const updatedCards = cards.filter(card => card.id !== id);
        if (!updatedCards.some(card => card.isDefault) && updatedCards.length > 0) {
            updatedCards[0].isDefault = true;
        }
        setCards(updatedCards);

    }
    const [purchaseHistory, setPurchaseHistory] = useState([
        { id: 1, course: "Logo design", date: "12 / 12 / 2025", price: "$ 80", status: "Completed", method: "**** **** **** 4242" },
        { id: 2, course: "Video edit", date: "12 / 3 / 2024", price: "$ 100", status: "Completed", method: "**** **** **** 4122" },
        { id: 3, course: "Java Script", date: "3 / 3 / 2023", price: "$ 100", status: "Completed", method: "**** **** **** 3332" },
        { id: 4, course: "React native", date: "3 / 9 / 2024", price: "$ 50", status: "Refunded", method: "**** **** **** 1234" },
    ]);

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
        URL.revokeObjectURL(url); // Clean up the URL to free up memory
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
                                <Link to={to} className="Breadcrumbs">
                                    {t(`setting.${translationKey}`, value.replace("_", " "))}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </nav>

            <div className="Setting">
                <div className="header_setting">
                    <p>{t('setting.header', 'Settings')}</p>
                    <div className="search_page_setting">
                        <img src={isDarkMode ? search.white : search.black}
                            alt="search" className="setting-search-icon" />
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
                                className={`category-tag ${isActive ? 'active' : ''}`}
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                                style={isActive || isHovered ? { backgroundColor: isDarkMode ? "rgba(0, 137, 234, 0.35)" : "rgba(0, 137, 234, 0.20)" } : { backgroundColor: isDarkMode ? "#141414" : "#FFFFFF" }}
                            >
                                <img
                                    src={isActive || isHovered ? category.blue : (isDarkMode ? (category.white || category.black) : category.black)}
                                    alt={category.name}
                                    style={(!isActive && !isHovered && isDarkMode && !category.white) ? { filter: "brightness(0) invert(1)" } : {}}
                                />
                                <span
                                    className="category-name"
                                    style={{
                                        color: isActive || isHovered ? "#0089EA" : (isDarkMode ? "#FFFFFF" : "#000000"),
                                        fontWeight: isActive || isHovered ? "600" : "500"
                                    }}
                                >
                                    {t(`setting.${category.name.toLowerCase()}`, category.name)}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="payment-container">
                <div className="payment-content_header">
                    <div className="payment-header">
                        <h1>Payment Cards</h1>
                        <p>Manage your payment methods and default billing card.</p>
                    </div>
                    <div className="button-payment" onClick={() => { setShowModal(true); setError([]); setSuccess([]); }}>
                        <img src="/photo_icons/For_setting/add.png" alt="add" />
                        <button>Add New Card</button>
                    </div>
                    {showModal && (
                        <div className="modal" onClick={() => setShowModal(false)}>

                            <div
                                className="modal-content"
                                onClick={(e) => e.stopPropagation()}
                            >

                                <div className="modal-header">
                                    <h2>Add New Card</h2>
                                    <button onClick={() => { setShowModal(false); setError([]); setSuccess([]); }}>✕</button>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="card-number">Card Number</label>
                                            <input
                                                type="text"
                                                id="card-number"
                                                placeholder="1234 5678 9012 3456"
                                                inputMode="numeric"
                                                maxLength="19"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                            />
                                            {error.find(m => m.toLowerCase().includes("card number")) && <p className="error">{error.find(m => m.toLowerCase().includes("card number"))}</p>}
                                            {success.find(m => m.toLowerCase().includes("card number")) && <p className="success">{success.find(m => m.toLowerCase().includes("card number"))}</p>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="card-name">Card Name</label>
                                            <input
                                                type="text"
                                                id="card-name"
                                                placeholder="John Doe"
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                            />
                                            {error.find(m => m.toLowerCase().includes("card name")) && <p className="error">{error.find(m => m.toLowerCase().includes("card name"))}</p>}
                                            {success.find(m => m.toLowerCase().includes("card name")) && <p className="success">{success.find(m => m.toLowerCase().includes("card name"))}</p>}
                                        </div>

                                        {/* صف مشترك */}
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="card-expiry">Expiry</label>
                                                <input
                                                    type="text"
                                                    id="card-expiry"
                                                    placeholder="MM/YY"
                                                    maxLength="5"
                                                    value={cardExpiry}
                                                    onChange={(e) => setCardExpiry(e.target.value)}
                                                />
                                                {error.find(m => m.toLowerCase().includes("card expiry")) && <p className="error">{error.find(m => m.toLowerCase().includes("card expiry"))}</p>}
                                                {success.find(m => m.toLowerCase().includes("card expiry")) && <p className="success">{success.find(m => m.toLowerCase().includes("card expiry"))}</p>}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="card-cvv">CVV</label>
                                                <input
                                                    type="text"
                                                    id="card-cvv"
                                                    placeholder="123"
                                                    maxLength="3"
                                                    value={cardCVV}
                                                    onChange={(e) => setCardCVV(e.target.value)}
                                                />
                                                {error.find(m => m.toLowerCase().includes("card cvv")) && <p className="error">{error.find(m => m.toLowerCase().includes("card cvv"))}</p>}
                                                {success.find(m => m.toLowerCase().includes("card cvv")) && <p className="success">{success.find(m => m.toLowerCase().includes("card cvv"))}</p>}
                                            </div>
                                        </div>

                                        <button type="submit" className="add-card-btn">
                                            Add Card
                                        </button>

                                    </form>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
                <div className="payment-content_body">
                    {cards.map(card => (
                        <div key={card.id} className="payment-card">
                            <div className="payment-card_body">
                                <img src="/photo_icons/For_setting/card.png" alt="card" className="card-brand-icon" />
                                <div className="payment-card_body_text">
                                    <div className="payment-card_body_text_default">
                                        <p style={{ fontSize: "18px", fontWeight: "500", color: "#000000", letterSpacing: "1px" }}>
                                            **** **** **** {card.last4}
                                        </p>
                                        {card.isDefault && (
                                            <div className="payment-card_body_default">
                                                <p>Default</p>
                                            </div>
                                        )}
                                    </div>
                                    <p style={{ fontSize: "14px", fontWeight: "500", color: "#666363" }}>Expires   {card.expires}</p>
                                </div>

                                <div className="payment-card_body_actions">
                                    {!card.isDefault && (
                                        <button className="set-default-btn" onClick={() => handleSetDefault(card.id)}>
                                            Set as Default
                                            <img src="/photo_icons/For_setting/card_blue.png" alt="" onError={(e) => e.target.style.display = 'none'} />
                                        </button>
                                    )}
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(card.id)}
                                        style={{ opacity: cards.length <= 1 ? 0.5 : 1, cursor: cards.length <= 1 ? 'not-allowed' : 'pointer' }}
                                        disabled={cards.length <= 1}
                                    >
                                        Delete
                                        <img src="/photo_icons/For_setting/delete.png" alt="delete" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="Purchase_History_header">
                        <div className="Purchase_History_header_text">
                            <h1>Purchase History</h1>
                            <p>View and download your course purchases</p>
                        </div>
                        <div className="Purchase_History_header_button" onClick={handleDownload}>
                            <img src="/photo_icons/For_setting/download_black.png" alt="download" />
                            <button>Download</button>
                        </div>
                    </div>
                    <div className="Purchase_History_body">
                        <div className="Purchase_History_table_row header">
                            <p>Course</p>
                            <p>Date</p>
                            <p>Price</p>
                            <p>Status</p>
                            <p>Payment Method</p>
                        </div>
                        {purchaseHistory.map(item => (
                            <div key={item.id} className="Purchase_History_table_row">
                                <p className="course">{item.course}</p>
                                <p className="date">{item.date}</p>
                                <p className="price">{item.price}</p>
                                <div className="status">
                                    <span className={`status-${item.status.toLowerCase()}`}>
                                        {item.status}
                                    </span>
                                </div>
                                <p className="payment-method">{item.method}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;