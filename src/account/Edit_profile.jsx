import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./Edit_profile.css";

function EditProfile() {
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);
    const [image, setImage] = useState(null)
    const categories = [
        { name: "Profile", black: "/photo_icons/For_setting/UserMaleBlack.png", blue: "/photo_icons/For_setting/UserMaleBlue.png" },
        { name: "Security", black: "/photo_icons/For_setting/SecrityBlack.png", blue: "/photo_icons/For_setting/SecrityBlue.png" },
        { name: "Preferences", black: "/photo_icons/For_setting/PreferencesBlack.png", blue: "/photo_icons/For_setting/PreferencesBlue.png" },
        { name: "Privacy", black: "/photo_icons/For_setting/PrivacyBlack.png", blue: "/photo_icons/For_setting/PrivacyBlue.png" },
        { name: "Notification", black: "/photo_icons/For_setting/NotificationBlack.png", blue: "/photo_icons/For_setting/NotificationBlue.png" },
        { name: "Payment", black: "/photo_icons/For_setting/PaymentBlack.png", blue: "/photo_icons/For_setting/PaymentBlue.png" },
    ];
    return (
        <>
            <div className="edit-profile-container">
                <nav className="breadcrumbs-nav">
                    <Link to="/Home" className="Breadcrumbs">Home</Link>
                    {pathname.map((value, index) => {
                        const to = "/" + pathname.slice(0, index + 1).join("/");
                        const isLast = index === pathname.length - 1;
                        return (
                            <span key={to}>
                                <span className="breadcrumb-separator"> {">"} </span>
                                {isLast ? (
                                    <span className="current-page">{value.replace("_", " ")}</span>
                                ) : (
                                    <Link to={to} className="Breadcrumbs">{value.replace("_", " ")}</Link>
                                )}
                            </span>
                        );
                    })}
                </nav>
                <div className="Setting">
                    <div className="header_setting">
                        <p>Settings</p>
                    </div>
                    <div className="Setting_option">
                        {categories.map((category, index) => (
                            <button key={index} className="category-tag" onMouseEnter={() => setImage(index)}
                                onMouseLeave={() => setImage(null)}>
                                <img src={image === index ? category.black : category.blue}
                                    style={{ cursor: "pointer" }}
                                    alt={category.name} />
                                <p style={image === index ? { color: "#000000" } : { color: "#0089EA" }}>{category.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile
