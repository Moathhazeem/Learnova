import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import './Security.css';
import "../config/i18n";
import { useTranslation } from "react-i18next";

function Security() {
    const { t } = useTranslation();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [confirmPasswordSuccess, setConfirmPasswordSuccess] = useState("");
    const [newPasswordError, setNewPasswordError] = useState([]);
    const [newPasswordSuccess, setNewPasswordSuccess] = useState([]);
    const [passwordMatchError, setPasswordMatchError] = useState("");
    const [passwordMatchSuccess, setPasswordMatchSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [authenticator, setAuthenticator] = useState(false);
    const [IsOpenAuthenticator, setIsOpenAuthenticator] = useState(false);
    const [smsRecovery, setSmsRecovery] = useState(false);
    const [IsOpenSmsRecovery, setIsOpenSmsRecovery] = useState(false);
    const [smsPhoneInput, setSmsPhoneInput] = useState("");
    const [smsPhoneError, setSmsPhoneError] = useState("");
    const [isSwitchOn, setIsSwitchOn] = useState(false); // حالة الـ Switch
    const [showPopup, setShowPopup] = useState(false);   // حالة ظهور النافذة
    const [isFirstOpen, setIsFirstOpen] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(false);
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState("Security");
    const [hovered, setHovered] = useState(null);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isPhoneOpen, setIsPhoneOpen] = useState(false);
    const [isCodePopupOpen, setIsCodePopupOpen] = useState(false);
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    // دوال فتح/اغلاق
    const openCodePopup = () => {
        if (!smsPhoneInput || smsPhoneInput.trim() === "") {
            setSmsPhoneError("Please enter your phone number");
            return;
        }
        setSmsPhoneError("");
        setIsCodePopupOpen(true);
    };
    const closeCodePopup = () => setIsCodePopupOpen(false);

    const [codeError, setCodeError] = useState("");
    const [codeSuccess, setCodesuccess] = useState("");
    const handleSubmit = (e) => {
        setCodeError("");
        setCodesuccess("");
        e.preventDefault();
        // Check if all code fields are filled (optional but recommended)
        const fullcode = code.join("");
        if (code.some(digit => digit === "")) {
            setCodeError("Please fill in all fields");
        }
        else if (fullcode !== "123456") {
            setCodeError("Code is incorrect");
        }
        else if (fullcode === "123456") {
            setCodesuccess("Code is correct");
            setTimeout(() => {
                closeCodePopup();
                closePop('smsRecovery');
                setSmsRecovery(true);
            }, 1000);
        }
    };


    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const char = value.slice(-1);
        const newCode = [...code];
        newCode[index] = char;
        setCode(newCode);

        if (char !== "" && e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
        if (value && index < code.length - 1) {
            e.target.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
    };

    const openPop = (type) => {
        if (type === 'email') {
            setTempEmail(email);
            setIsEmailOpen(true);
            setEmailError("");
        } else if (type === 'phone') {
            setTempPhone(phone);
            setIsPhoneOpen(true);
            setPhoneError("");
        }
        else if (type === 'authenticator') {
            setIsOpenAuthenticator(true);
        }
        else if (type === 'smsRecovery') {
            setIsOpenSmsRecovery(true);
        }

    }
    const closePop = () => {
        setIsEmailOpen(false);
        setIsPhoneOpen(false);
        setEmailError("");
        setPhoneError("");
        setIsOpenAuthenticator(false);
        setIsOpenSmsRecovery(false);
    }
    const search = {
        white: "/photo_icons/For_setting/White_Search.png",
        black: "/photo_icons/For_setting/Gray_Search.png"
    }
    const [email, setEmail] = useState("user@gmail.com");
    const [tempEmail, setTempEmail] = useState("");
    const [phone, setPhone] = useState("+20 100 000 0000");
    const [tempPhone, setTempPhone] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const handleEmailSave = () => {
        if (tempEmail.trim() === "") {
            setEmailError("Please enter your email");
            return;
        }
        if (!tempEmail.includes("@gmail.com")) {
            setEmailError("Please enter a valid email");
            return;
        }
        setEmail(tempEmail);
        setEmailError("");
        // Here you would normally update the email on the server
        closePop();
    }
    const handlePhoneSave = () => {
        if (tempPhone.trim() === "") {
            setPhoneError("Please enter your phone");
            return;
        }
        // Basic check: Allow +, spaces, and digits
        if (!/^[\d\s+]+$/.test(tempPhone)) {
            setPhoneError("Please enter a valid phone number");
            return;
        }
        if (tempPhone.replace(/\D/g, '').length < 8) {
            setPhoneError("Phone number is too short");
            return;
        }
        setPhone(tempPhone);
        setPhoneError("");
        closePop();
    };
    const handleAuthenticatorSave = () => {
        setIsOpenAuthenticator(false);
    }
    const handleSmsRecoverySave = () => {
        setIsOpenSmsRecovery(false);
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    }
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleUpdatePassword = () => {
        setPasswordError("");
        setPasswordSuccess("");
        setNewPasswordError("");
        setNewPasswordSuccess("");
        setConfirmPasswordError("");
        setConfirmPasswordSuccess("");

        let isValid = true;

        if (password.trim() === "") {
            setPasswordError("Please fill the field");
            isValid = false;
        } else if (password !== "123456") {
            setPasswordError("Please enter a correct password");
            isValid = false;
        } else {
            setPasswordSuccess("Password is correct");
        }
        if (!isValid) {
            return;
        }
        const newPasswordError = [];
        const newPasswordSuccess = [];
        if (newPassword.trim() === "") {
            setNewPasswordError("Please fill the field");
            isValid = false;
        }
        else {
            if (newPassword === password) {
                setNewPasswordError("New password cannot be the same as the old password");
                isValid = false;
            }
            else if (newPassword !== password) {

                if (newPassword.length < 8) {
                    newPasswordError.push("New password must be at least 8 characters long");
                    setNewPasswordError(newPasswordError);
                    isValid = false;
                }
                else if (newPassword.length >= 8) {
                    newPasswordSuccess.push("New password is more than 8 characters long");
                    setNewPasswordSuccess(newPasswordSuccess);
                }
                if (!/[a-z]/.test(newPassword)) {
                    newPasswordError.push("New password must contain at least one lowercase letter");
                    setNewPasswordError(newPasswordError);
                    isValid = false;
                }
                else if (/[a-z]/.test(newPassword)) {
                    newPasswordSuccess.push("New password contain at least one lowercase letter")
                    setNewPasswordSuccess(newPasswordSuccess);
                }
                if (!/[A-Z]/.test(newPassword)) {
                    newPasswordError.push("New password must contain at least one uppercase letter");
                    setNewPasswordError(newPasswordError);
                    isValid = false;
                }
                else if (/[A-Z]/.test(newPassword)) {
                    newPasswordSuccess.push("New password contain at least one uppercase letter")
                    setNewPasswordSuccess(newPasswordSuccess);
                }
                if (!/[0-9]/.test(newPassword)) {
                    newPasswordError.push("New password must contain at least one number");
                    setNewPasswordError(newPasswordError);
                    isValid = false;
                }
                else if (/[0-9]/.test(newPassword)) {
                    newPasswordSuccess.push("New password contain at least one number")
                    setNewPasswordSuccess(newPasswordSuccess);
                }
                if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
                    newPasswordError.push("New password must contain at least one special character");
                    setNewPasswordError(newPasswordError);
                    isValid = false;
                }
                else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
                    newPasswordSuccess.push("New password contain at least one special character")
                    setNewPasswordSuccess(newPasswordSuccess);
                }
            }
            else {
                setNewPasswordSuccess("New password is correct");
            }
        }
        if (!isValid) {
            return;
        }

        if (confirmPassword.trim() === "") {
            setConfirmPasswordError("Please fill the field");
            isValid = false;
        } else if (confirmPassword !== newPassword) {
            setConfirmPasswordError("Confirm password does not match");
            isValid = false;
        } else {
            setConfirmPasswordSuccess("Confirm password is correct");
        }

        if (isValid) {
            alert("Password updated successfully!");
        }
    };
    const handleFirstOpen = () => {
        setIsFirstOpen(true);
    }
    const handleSecondOpen = () => {
        if (!smsPhoneInput || smsPhoneInput.trim() === "") {
            setSmsPhoneError("Please enter your phone number");
            return;
        }
        setSmsPhoneError("");
        setIsSecondOpen(true);
    }
    const handleClosePopup = () => {
        setIsFirstOpen(false);
        setIsSecondOpen(false);
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
                                <Link to={to} className="Breadcrumbs">{t(`setting.${translationKey}`, value.replace("_", " "))}</Link>
                            )}
                        </span>
                    );
                })}
            </nav>

            <div className="Setting">
                <div className="header_setting">
                    <p>{t('setting.header', 'Settings')}</p>
                    <div className="search_page_setting">
                        <img src={search.black}
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
                                    {t(`setting.${category.name.toLowerCase()}`, category.name)}
                                </p>
                            </Link>
                        );
                    })}
                </div>
                <div className="Secrity_content">
                    <div className="Security_password">
                        <div className="Security_password_header">
                            <h3>Password</h3>
                            <p className="password_p">Enter your current password to can change to new password</p>
                        </div>
                        <div className="Security_password_content">
                            <h4>Enter your current password</h4>
                            <div className="password-input-wrapper">
                                <input type={showPassword ? "text" : "password"} placeholder="Enter your current password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <span onClick={toggleShowPassword}>
                                    <img src={showPassword ? "/photo_icons/For_setting/not_see_pas_black.png" : "/photo_icons/For_setting/see_pas_black.png"} alt="toggle" />
                                </span>
                            </div>
                            {(passwordError || passwordSuccess) && (
                                <div className="password_messages">
                                    {passwordError && <p className="error_password"><img src="/photo_icons/Incorrect.png" alt="error" />{passwordError}</p>}
                                    {passwordSuccess && <p className="success_password"><img src="/photo_icons/Correct.png" alt="success" />{passwordSuccess}</p>}
                                </div>
                            )}

                            <h4 style={{ marginTop: "15px" }}>Enter your new password</h4>
                            <div className="password-input-wrapper">
                                <input type={showNewPassword ? "text" : "password"} placeholder="Enter your new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                <span onClick={toggleShowNewPassword}>
                                    <img src={showNewPassword ? "/photo_icons/For_setting/not_see_pas_black.png" : "/photo_icons/For_setting/see_pas_black.png"} alt="toggle" />
                                </span>
                            </div>
                            {((Array.isArray(newPasswordError) && newPasswordError.length > 0) || (typeof newPasswordError === 'string' && newPasswordError) || (Array.isArray(newPasswordSuccess) && newPasswordSuccess.length > 0) || (typeof newPasswordSuccess === 'string' && newPasswordSuccess)) && (
                                <div className="password_messages">
                                    {Array.isArray(newPasswordError) ? newPasswordError.map((err, i) => (
                                        <p key={i} className="error_password"><img src="/photo_icons/Incorrect.png" alt="error" />{err}</p>
                                    )) : newPasswordError && (
                                        <p className="error_password"><img src="/photo_icons/Incorrect.png" alt="error" />{newPasswordError}</p>
                                    )}
                                    {Array.isArray(newPasswordSuccess) ? newPasswordSuccess.map((succ, i) => (
                                        <p key={i} className="success_password"><img src="/photo_icons/Correct.png" alt="success" />{succ}</p>
                                    )) : newPasswordSuccess && (
                                        <p className="success_password"><img src="/photo_icons/Correct.png" alt="success" />{newPasswordSuccess}</p>
                                    )}
                                </div>
                            )}

                            <h4 style={{ marginTop: "15px" }}>Confirm your new password</h4>
                            <div className="password-input-wrapper">
                                <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                <span onClick={toggleShowConfirmPassword}>
                                    <img src={showConfirmPassword ? "/photo_icons/For_setting/not_see_pas_black.png" : "/photo_icons/For_setting/see_pas_black.png"} alt="toggle" />
                                </span>
                            </div>
                            {(confirmPasswordError || confirmPasswordSuccess) && (
                                <div className="password_messages">
                                    {confirmPasswordError && <p className="error_password"><img src="/photo_icons/Incorrect.png" alt="error" />{confirmPasswordError}</p>}
                                    {confirmPasswordSuccess && <p className="success_password"><img src="/photo_icons/Correct.png" alt="success" />{confirmPasswordSuccess}</p>}
                                </div>
                            )}
                        </div>
                        <button onClick={handleUpdatePassword}>Update Password</button>
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
                                <input type="checkbox" checked={authenticator} onChange={(e) => {
                                    setAuthenticator(e.target.checked);
                                    if (e.target.checked) openPop('authenticator');
                                }} />
                                <span className="slider"></span>
                            </label>
                            {IsOpenAuthenticator && (
                                <div className="popup-overlay_authenticator">
                                    <div className="popup_authenticator">
                                        <div className="popup-header_authenticator">
                                            <h3>Setup Authenticator App</h3>
                                            <button onClick={() => closePop('authenticator')}><img src="/photo_icons/For_setting/false.png" alt="close" /></button>
                                        </div>
                                        <div className="popup-content-header_authenticator">
                                            <h4>Scan this QR code</h4>
                                            <p>Use an app like Google Authenticator or Authy to generate verification codes.</p>
                                        </div>
                                        <div className="popup-content_authenticator">
                                            <img src="/photo_icons/For_setting/QR_code.png" alt="QR code" />
                                        </div>
                                        <div className="popup-content-footer_authenticator">
                                            <p>Can't scan? Use this code: 123 456 789</p>
                                        </div>
                                        {/*<div className="popup-content-footer_authenticator">
                                            <button onClick={() => closePop('authenticator')}>Close</button>
                                        </div>*/}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="Secrity_2FA_content">
                            <div className="Secrity_2FA_content_header">
                                <h4>SMS Recovery</h4>
                                <p>Allow receiving recovery codes via SMS if you lose access to your authenticator app</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={smsRecovery} onChange={(e) => {
                                    setSmsRecovery(e.target.checked);
                                    if (e.target.checked) handleFirstOpen();
                                }} />
                                <span className="slider"></span>
                            </label>
                            {isFirstOpen && (
                                <div className="popup-overlay_smsRecovery">
                                    <div className="popup_smsRecovery">
                                        <div className="popup-header_smsRecovery">
                                            <h3>Enter your phone number</h3>
                                            <button onClick={() => handleClosePopup()}><img src="/photo_icons/For_setting/false.png" alt="close" /></button>
                                        </div>
                                        <div className="popup-content-header_smsRecovery">
                                            <h4>Enter your phone number to receive recovery codes</h4>
                                            <p>We'll send a 6-digit code to this number to verify your account.</p>
                                        </div>
                                        <div className="popup-content_smsRecovery">
                                            <h4>Phone Number</h4>
                                            <input type="phone" onChange={(e) => setSmsPhoneInput(e.target.value)} placeholder="Enter your phone number" />
                                            {smsPhoneError && <p className="error_password" style={{ color: "red", marginTop: "5px" }}>{smsPhoneError}</p>}
                                            <p>We'll never share your phone number.</p>
                                        </div>
                                        <div className='popup-content-footer_smsRecovery'>
                                            <button className='send-code-btn' onClick={handleSecondOpen}>Send Code</button>
                                            {isSecondOpen && (
                                                <div className="popup-overlay_code">
                                                    <div className="popup_code">
                                                        <div className="popup-header_code">
                                                            <h3>Enter your verification code</h3>
                                                            <button onClick={handleClosePopup}><img src="/photo_icons/For_setting/false.png" alt="close" /></button>
                                                        </div>
                                                        <div className="popup-content-header_code">
                                                            <h4>6-digit code sent to +970 59 123 4567</h4>
                                                        </div>
                                                        <div className="popup-content_code">
                                                            <h4>Verification Code</h4>
                                                            <div style={{ display: "flex", gap: "10px" }}>
                                                                {code.map((data, index) => (
                                                                    <input
                                                                        key={index}
                                                                        type="text"
                                                                        maxLength="1"
                                                                        placeholder={index + 1}
                                                                        required
                                                                        onChange={(e) => handleChange(e, index)}
                                                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                                                        onFocus={(e) => e.target.select()}
                                                                        style={{ textAlign: "center", width: "40px", height: "40px" }}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <p>Check your phone for the 6-digit code we just sent</p>
                                                            {codeError && <p className="error_password" style={{ color: "red" }}>{codeError}</p>}
                                                            {codeSuccess && <p className="success_password" style={{ color: "green" }}>{codeSuccess}</p>}
                                                        </div>
                                                        <div className='popup-content-footer_code'>
                                                            <button className='send-code-btn' onClick={handleSubmit}>Verify code</button>
                                                            <button className='send-code-btn' onClick={() => setCode(["", "", "", "", "", ""])}>Resend code</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                        <p>{email}</p>
                                    </div>
                                    <button className="edit" onClick={() => openPop('email')}><img src="/photo_icons/For_setting/Edit_white.png" alt="edit" />Edit</button>
                                    {isEmailOpen && (
                                        <div className="popup">
                                            <div className="popup-content">
                                                <div className="popup-header">
                                                    <h3>Edit Email</h3>
                                                    <button className="close" onClick={() => closePop()}><img src="/photo_icons/For_setting/false.png" alt="close" /></button>
                                                </div>
                                                <div className="popup-body">
                                                    <h4>Enter your new email</h4>
                                                    <input type="email" onChange={(e) => setTempEmail(e.target.value)} placeholder="Enter your email" required />
                                                    {emailError && <div className="error"><p>{emailError}</p></div>}
                                                </div>
                                                <div className="popup-footer">
                                                    <button onClick={() => closePop()}>Cancel</button>
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
                                        <p>{phone}</p>
                                    </div>
                                    <button className="edit" onClick={() => openPop('phone')}><img src="/photo_icons/For_setting/Edit_white.png" alt="edit" />Edit</button>
                                    {isPhoneOpen && (
                                        <div className="popup">
                                            <div className="popup-content">
                                                <div className="popup-header">
                                                    <h3>Edit Phone</h3>
                                                    <button className="close" onClick={() => closePop()}><img src="/photo_icons/For_setting/false.png" alt="close" /></button>
                                                </div>
                                                <div className="popup-body">
                                                    <h4>Enter your new phone</h4>
                                                    <input type="tel" onChange={(e) => setTempPhone(e.target.value)} placeholder="Enter your phone" required />
                                                    {phoneError && <div className="error"><p>{phoneError}</p></div>}
                                                </div>
                                                <div className="popup-footer">
                                                    <button onClick={() => closePop()}>Cancel</button>
                                                    <button onClick={() => handlePhoneSave()}>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
