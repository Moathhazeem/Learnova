import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import './Security.css';

function Security() {
    const location = useLocation();
    const [hovered, setHovered] = useState(null);
    const search = {
        white: "/photo_icons/For_setting/White_Search.png",
        black: "/photo_icons/For_setting/Gray_Search.png"
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
    const [activeCategory, setActiveCategory] = useState("Security");
    const [authenticator, setAuthenticator] = useState(false);
    const [smsRecovery, setSmsRecovery] = useState(false);

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
                            <p>Change your password</p>
                        </div>
                        <div className="Security_password_content">
                            <h4>Current password</h4>
                            <input type="password" placeholder="Enter your current password" required></input>
                            <h4>New password</h4>
                            <input type="password" placeholder="Enter your New password" required></input>
                            <h4>Confirm new password</h4>
                            <input type="password" placeholder="Confirm your New password" required></input>
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
                        <h3>Active Sessions</h3>
                        <p>Manage your active sessions and devices.</p>
                        <div className="session-item">
                            <img src="/photo_icons/For_setting/Macbook.png" alt="session" />
                            <div className="session-info">
                                <h4>Macbook Pro</h4>
                                <p>San Francisco, CA</p>
                                <p>Active Now</p>
                            </div>
                            <div className="session-info">
                                <img src="/photo_icons/For_setting/laptop.png" alt="location" />
                                <p>Windows Laptop</p>
                                <p>London, Uk</p>
                            </div>
                            <div className="session-info">
                                <img src="/photo_icons/For_setting/Iphone.png" alt="location" />
                                <p>Iphone</p>
                                <p>New York, Usa</p>
                            </div>
                        </div>
                    </div>
                    <div className="Acount-recovery">
                        <h3>Account Recovery</h3>
                        <p>Set up recovery options in case you lose access to your account</p>
                        <div className="recovery-item">
                            <img src="/photo_icons/For_setting/Email.png" alt="recovery" />
                            <div className="recovery-info">
                                <h4>Email</h4>
                                <p>[EMAIL_ADDRESS]</p>
                                <button><img src="/photo_icons/For_setting/Edit.png" alt="edit" />Edit</button>
                            </div>
                        </div>
                        <div className="recovery-item">
                            <img src="/photo_icons/For_setting/Phone.png" alt="recovery" />
                            <div className="recovery-info">
                                <h4>Phone</h4>
                                <p>+20 100 000 0000</p>
                                <button><img src="/photo_icons/For_setting/Edit.png" alt="edit" />Edit</button>
                            </div>
                        </div>
                    </div>
                    <div className="Save-Reset-Cancel">
                        <button>Save Changes</button>
                        <button>Reset Changes</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Security;