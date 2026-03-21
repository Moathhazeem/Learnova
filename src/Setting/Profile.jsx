import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./Profile.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function Profile() {
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);
    const [hovered, setHovered] = useState(null);
    const [phone, setPhone] = useState("");
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

    return (
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
                    <div className="search_page_setting">
                        <img src={search.black}
                            alt="search" className="setting-search-icon" />
                        <input type="search" placeholder="Search settings" />

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
                                style={isActive || isHovered ? { backgroundColor: "rgba(0, 137, 234, 0.20)" } : { backgroundColor: "#FFFFFF" }}
                            >
                                <img
                                    src={isActive || isHovered ? category.blue : category.black}
                                    alt={category.name}
                                />
                                <p style={isActive || isHovered ? { color: "#0089EA" } : { color: "#000000" }}>
                                    {category.name}
                                </p>
                            </Link>
                        );
                    })}
                </div>
                <div className="Profile-setting">
                    <div className="Header-profile">
                        <p style={{ fontSize: "32px" }}>Edit User Profile</p>
                        <div className="Preview">
                            <p>Preview</p>
                            <img src="/photo_icons/For_setting/arrow-up-right.png"></img>
                        </div>
                    </div>
                    <div className="Profile-setting-content">
                        <div className="Background-container">
                            <img src="/Photo/Background_profile.jfif" alt="Background_profile" className="Background_profile" />
                            <img src="/photo_icons/For_setting/Edit.png" alt="edit" className="edit-bg-icon" />
                        </div>
                        <img src="/Photo/Profile.jfif" alt="Profile" className="Profile" />
                        <div className="Profile-content">
                            <p className="Your-photo">Your Photo</p>
                            <p className="This-will-display">this will displayed on your profile</p>
                            <div className="Profile-content-buttons">
                                <button className="Upload-new-button">Upload New</button>
                                <button className="Save-photo-button">Save</button>
                            </div>
                        </div>
                    </div>
                    <div className="Profile-setting-content">
                        <div className="Personal-information">
                            <p style={{ marginLeft: "5%", marginTop: "8%", fontSize: "26px" }}>Personal Information</p>
                            <div className="Personal-information-content">
                                <div className="Full_Name">
                                    <p>Full Name</p>
                                    <div className="input-wrapper">
                                        <input type="text" placeholder="Full Name" />
                                        <img src="/photo_icons/For_setting/account.png" alt="Account photo" className="edit-icon" />
                                    </div>
                                </div>
                                <div className="Email">
                                    <p>Email address</p>
                                    <div className="input-wrapper">
                                        <input type="email" placeholder="[EMAIL_ADDRESS]" />
                                        <img src="/photo_icons/For_setting/email.png" alt="email photo" className="edit-icon" />
                                    </div>
                                </div>
                                <div className="Phone_Number">
                                    <p>Mobile Number</p>
                                    <div className="phone-input-container-wrapper">
                                        <PhoneInput
                                            country={'ps'}
                                            value={phone}
                                            onChange={setPhone}
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
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile
