import react from 'react'
import './Privacy.css'
import { Link, useLocation } from 'react-router-dom';
import "../config/i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
function Privacy() {
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);
    const { t, i18n } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains("dark"));
    const search = {
        white: "/photo_icons/search_white.png",
        black: "/photo_icons/search_black.png"
    }
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
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
            <div className="header_setting">
                <p>{t("setting.header", "Settings")}</p>
            </div>
            <div className="search_page_setting">
                <img src={search[isDarkMode ? "white" : "black"]} alt="search" />
                <input type="text" placeholder={t("setting.search", "Search")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setIsSearchFocused(true)} onBlur={() => setIsSearchFocused(false)} />
            </div>
        </div>
    )
}
export default Privacy