import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import './Security.css';

function Security() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [authenticator, setAuthenticator] = useState(false);
    const [smsRecovery, setSmsRecovery] = useState(false);
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState("Security");
    const [hovered, setHovered] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
        setIsOpen(true);
        setEmailError("");
        setPhoneError("");
    }
    const closePopup = () => {
        setIsOpen(false);
        setEmailError("");
        setPhoneError("");
    }
    const search = {
        white: "/photo_icons/For_setting/White_Search.png",
        black: "/photo_icons/For_setting/Gray_Search.png"
    }
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) setEmailError("");
    }
    
    const handleEmailSave = () => {
        if (email.trim() === "") {
            setEmailError("Please enter your email");
            return;
        }
        setEmailError("");
        // Here you would normally update the email on the server
        closePopup();
    }
    
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        if (phoneError) setPhoneError("");
    }
    
    const handlePhoneSave = () => {
        if (phone.trim() === "") {
            setPhoneError("Please enter your phone");
            return;
        }
        setPhoneError("");
        // Handle phone save logic here
    }

    const pathname = location.pathname.split("/").filter(x => x);
    const categories = [
        { name: "Profile", path: "/Setting/Profile", black: "/photo_icons/For_setting/UserMaleBlack.png", blue: "/photo_icons/For_setting/UserMaleBlue.png" },
        { name: "Security", path: "/Setting/Security", black: "/photo_icons/For_setting/SecrityBlack.png", blue: "/photo_icons/For_setting/SecrityBlue.png" },
        { name: "Preferences", path: "/Setting/Preferences", black: "/photo_icons/For_setting/PreferencesBlack.png", blue: "/photo_icons/For_setting/PreferencesBlue.png" },
        { name: "Privacy", path: "/Setting/Privacy", black: "/photo_icons/For_setting/PrivacyBlack.png", blue: "/photo_icons/For_setting/PrivacyBlue.png" },
        { name: "Notification", path: "/Setting/Notification", black: "/photo_icons/For_setting/NotificationBlack.png", blue: "/photo_icons/For_setting/NotificationBlue.png" },
        { name: "Payment", path: "/Setting/Payment", black: "/photo_icons/For_setting/PaymentBlack.png", blue: "/photo_icons/For_setting/PaymentBlue.png" },
    ];
    const devicesData = [
        {
            id: 1,
            name: "MacBook Pro 16",
            version: "Mac OS X",
            location: "San Francisco, US",
            lastActive: "2026-03-26 17:06:49",
            ipAddress: "[IP_ADDRESS]",
            status: "Active",
            isCurrent: true,
            photo: "/photo_icons/For_setting/macbook_black.png"
        },
        {
            id: 2,
            name: "Windows Laptop",
            version: "Windows 10",
            location: "London, UK",
            lastActive: "2026-03-26 17:06:49",
            ipAddress: "[IP_ADDRESS]",
            status: "Active",
            photo: "/photo_icons/For_setting/laptop_black.png"
        },
        {
            id: 3,
            name: "iPhone 14 Pro",
            version: "IOS 15",
            location: "New York, US",
            lastActive: "2026-03-26 17:06:49",
            ipAddress: "[IP_ADDRESS]",
            status: "Active",
            photo: "/photo_icons/For_setting/iphone.png"
        }
    ]
    const [devices, setDevices] = useState(devicesData);
    const handleLogout = (id) => {
        setDevices(devices.filter(devices => devices.id !== id));
    }

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
                <div className="Secrity_content">
                    <div className="Security_password">
                        <div className="Security_password_header">
                            <h3>Password</h3>
                            <p>Enter your current password to can change to new password</p>
                        </div>
                        <div className="Security_password_content">
                            <h4>Enter your current password</h4>
                            <input type="password" placeholder="Enter your current password" required></input>
                            <h4>Enter your new password</h4>
                            <input type="password" placeholder="Enter your new password" required></input>
                            <h4>Confirm your new password</h4>
                            <input type="password" placeholder="Confirm your new password" required></input>
                        </div>
                        <button>Update Password</button>
                    </div>
                    <div className="Secrity_2FA">
                        <h3>Two Factor Authentication</h3>
                        <p>Enhance your account security by enabling 2FA.</p>
                        <div className="Secrity_2FA_content">
                            <div className="Secrity_2FA_content_header">
                                <h4>Authenticator App</h4>
                                <p>Use an app like Google Authenticator or Authy to generate verification codes.</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={authenticator} onChange={() => setAuthenticator(!authenticator)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="Secrity_2FA_content">
                            <div className="Secrity_2FA_content_header">
                                <h4>SMS Recovery</h4>
                                <p>Allow receiving recovery codes via SMS if you lose access to your authenticator app</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={smsRecovery} onChange={() => setSmsRecovery(!smsRecovery)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                    <div className="Active_session">
                        <div className="Active_session_header">
                            <h3>Active Sessions</h3>
                            <p>Manage devices where you are currently logged in.</p>
                        </div>

                        <div className="session-item">
                            {devices.map((device) => (
                                <div key={device.id} className="session-item-header">
                                    <img src={device.photo} alt={device.name} className="device-icon" />
                                    <div className="session-info">
                                        <div className="session-details">
                                            <div className="device-name-row">
                                                <h4>{device.name}</h4>
                                                {device.isCurrent && <span className="this-device-badge">This Device</span>}
                                            </div>
                                            <p className="device-location">{device.location}</p>
                                            {device.isCurrent && <p className="active-now-text">Active now</p>}
                                        </div>
                                        {!device.isCurrent && (
                                            <button className="remove-session-btn" onClick={() => handleLogout(device.id)}>
                                                <img src="/photo_icons/For_setting/remove_white.png" alt="remove" />
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="Acount-recovery">
                        <div className="Acount-recovery_header">
                            <h3>Account Recovery</h3>
                            <p>Set up recovery options in case you lose access to your account</p>
                        </div>
                        <div className="recovery-item">
                            <div className="recovery-item-header">
                                <img src="/photo_icons/For_setting/email_black.png" alt="recovery" />
                                <div className="recovery-info">
                                    <div className="recovery-info-header">
                                        <h4>Email</h4>
                                        <p>moathhazeem@gmail.com</p>
                                    </div>
                                    <button onClick={() => openPopup()}><img src="/photo_icons/For_setting/Edit_white.png" alt="edit" />Edit</button>
                                    {isOpen && (
                                        <div className="popup">
                                            <div className="popup-content">
                                                <div className="popup-header">
                                                    <h3>Edit Email</h3>
                                                    <button onClick={() => closePopup()}><img src="/photo_icons/For_setting/false.png" alt="close" /></button>
                                                </div>
                                                <div className="popup-body">
                                                    <h4>Enter your new email</h4>
                                                    <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" required />
                                                    {emailError && <div className="error"><p>{emailError}</p></div>}
                                                </div>
                                                <div className="popup-footer">
                                                    <button onClick={() => closePopup()}>Cancel</button>
                                                    <button onClick={() => handleEmailSave()}>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="recovery-item">
                            <div className="recovery-item-header">
                                <img src="/photo_icons/For_setting/phone.png" alt="recovery" />
                                <div className="recovery-info">
                                    <div className="recovery-info-header">
                                        <h4>Phone</h4>
                                        <p>+20 100 000 0000</p>
                                    </div>
                                    <button><img src="/photo_icons/For_setting/Edit_white.png" alt="edit" />Edit</button>
                                </div>
                            </div>
                        </div>
                        <div className="Save-Reset-Cancel">
                            <button><p>Save</p></button>
                            <button><p>Reset</p></button>
                            <button><p>Cancel</p></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Security;