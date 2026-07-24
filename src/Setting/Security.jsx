import { useState, useCallback } from 'react';
import { Link, useLocation } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';
import './Security.css';
import "../config/i18n";
import { useTranslation } from "react-i18next";

/* ── Tiny TOTP-secret generator (client-side mock) ──────────────────── */
function generateTOTPSecret(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let result = '';
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    array.forEach(byte => (result += chars[byte % chars.length]));
    return result;
}

/* ── iOS-style toggle component ─────────────────────────────────────── */
function IOSToggle({ checked, onChange, id }) {
    return (
        <label htmlFor={id} className="ios-toggle-label" aria-label="toggle">
            <input
                id={id}
                type="checkbox"
                className="ios-toggle-input"
                checked={checked}
                onChange={onChange}
            />
            <span className={`ios-toggle-track ${checked ? 'ios-on' : 'ios-off'}`}>
                <span className="ios-toggle-thumb" />
            </span>
        </label>
    );
}

function Security() {
    const { t } = useTranslation();

    /* ── Password state ───────────────────────────────────────────── */
    const [password,              setPassword]              = useState("");
    const [newPassword,           setNewPassword]           = useState("");
    const [confirmPassword,       setConfirmPassword]       = useState("");
    const [passwordError,         setPasswordError]         = useState("");
    const [passwordSuccess,       setPasswordSuccess]       = useState("");
    const [confirmPasswordError,  setConfirmPasswordError]  = useState("");
    const [confirmPasswordSuccess,setConfirmPasswordSuccess]= useState("");
    const [newPasswordError,      setNewPasswordError]      = useState([]);
    const [newPasswordSuccess,    setNewPasswordSuccess]    = useState([]);
    const [passwordMatchError,    setPasswordMatchError]    = useState(""); // eslint-disable-line
    const [passwordMatchSuccess,  setPasswordMatchSuccess]  = useState(""); // eslint-disable-line
    const [showPassword,          setShowPassword]          = useState(false);
    const [showNewPassword,       setShowNewPassword]       = useState(false);
    const [showConfirmPassword,   setShowConfirmPassword]   = useState(false);

    /* ── 2FA toggle state — both start OFF ───────────────────────── */
    const [isAuthenticatorOn,    setIsAuthenticatorOn]    = useState(false);
    const [isSmsRecoveryOn,      setIsSmsRecoveryOn]      = useState(false);

    /* ── Authenticator modal ─────────────────────────────────────── */
    const [isAuthModalOpen,      setIsAuthModalOpen]      = useState(false);
    const [totpSecret]                                     = useState(() => generateTOTPSecret());
    const totpUri = `otpauth://totp/Learnova:user@learnova.app?secret=${totpSecret}&issuer=Learnova`;
    const [authCode,             setAuthCode]             = useState(['', '', '', '', '', '']);
    const [authCodeError,        setAuthCodeError]        = useState('');
    const [authCodeSuccess,      setAuthCodeSuccess]      = useState('');

    /* ── SMS Recovery modals ─────────────────────────────────────── */
    const [isSmsStep1Open,       setIsSmsStep1Open]       = useState(false);
    const [isSmsStep2Open,       setIsSmsStep2Open]       = useState(false);
    const [smsPhoneInput,        setSmsPhoneInput]        = useState('');
    const [smsPhoneError,        setSmsPhoneError]        = useState('');
    const [code,                 setCode]                 = useState(['', '', '', '', '', '']);
    const [codeError,            setCodeError]            = useState('');
    const [codeSuccess,          setCodeSuccess]          = useState('');

    /* ── Account Recovery state ───────────────────────────────────── */
    const [email,         setEmail]        = useState("user@gmail.com");
    const [tempEmail,     setTempEmail]    = useState("");
    const [phone,         setPhone]        = useState("+20 100 000 0000");
    const [tempPhone,     setTempPhone]    = useState("");
    const [emailError,    setEmailError]   = useState("");
    const [phoneError,    setPhoneError]   = useState("");
    const [isEmailOpen,   setIsEmailOpen]  = useState(false);
    const [isPhoneOpen,   setIsPhoneOpen]  = useState(false);

    /* ── Nav / misc ───────────────────────────────────────────────── */
    const location    = useLocation();
    const [hovered, setHovered] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const checkMatch = (title, keywords) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return title.toLowerCase().includes(q) || keywords.some(k => k.toLowerCase().includes(q));
    };

    const showPasswordCard = checkMatch("Password", ["current password", "new password", "update password", "change password"]);
    const show2faCard = checkMatch("Two-Factor Authentication", ["2fa", "authenticator", "google authenticator", "sms recovery", "otp", "code"]);
    const showSessionsCard = checkMatch("Active Sessions", ["devices", "logged in", "macbook", "iphone", "windows", "logout", "remove session"]);
    const showRecoveryCard = checkMatch("Account Recovery", ["recovery", "email address", "phone number", "recovery options"]);

    const hasAnyMatch = showPasswordCard || show2faCard || showSessionsCard || showRecoveryCard;

    /* ── Devices ─────────────────────────────────────────────────── */
    const devicesData = [
        { id: 1, name: "MacBook Pro 16",  version: "Mac OS X",   location: "San Francisco, US", lastActive: "2026-03-26 17:06:49", status: "Active", isCurrent: true,  photo: "/photo_icons/For_setting/macbook_black.png" },
        { id: 2, name: "Windows Laptop",  version: "Windows 10", location: "London, UK",        lastActive: "2026-03-26 17:06:49", status: "Active", isCurrent: false, photo: "/photo_icons/For_setting/laptop_black.png" },
        { id: 3, name: "iPhone 14 Pro",   version: "IOS 15",     location: "New York, US",      lastActive: "2026-03-26 17:06:49", status: "Active", isCurrent: false, photo: "/photo_icons/For_setting/iphone.png" },
    ];
    const [devices, setDevices] = useState(devicesData);
    const handleLogout = (id) => setDevices(devices.filter(d => d.id !== id));

    const search = {
        white: "/photo_icons/For_setting/White_Search.png",
        black: "/photo_icons/For_setting/Gray_Search.png"
    };
    const categories = [
        { name: "Profile",      path: "/Setting/Profile",      black: "/photo_icons/For_setting/UserMaleBlack.png",      blue: "/photo_icons/For_setting/UserMaleBlue.png" },
        { name: "Security",     path: "/Setting/Security",     black: "/photo_icons/For_setting/SecrityBlack.png",       blue: "/photo_icons/For_setting/SecrityBlue.png" },
        { name: "Preferences",  path: "/Setting/Preferences",  black: "/photo_icons/For_setting/PreferencesBlack.png",   blue: "/photo_icons/For_setting/PreferencesBlue.png" },
        { name: "Privacy",      path: "/Setting/Privacy",      black: "/photo_icons/For_setting/PrivacyBlack.png",       blue: "/photo_icons/For_setting/PrivacyBlue.png" },
        { name: "Notification", path: "/Setting/Notification", black: "/photo_icons/For_setting/NotificationBlack.png",  blue: "/photo_icons/For_setting/NotificationBlue.png" },
        { name: "Payment",      path: "/Setting/Payment",      black: "/photo_icons/For_setting/PaymentBlack.png",       blue: "/photo_icons/For_setting/PaymentBlue.png" },
    ];
    const pathname = location.pathname.split("/").filter(x => x);

    /* ════════════════════════════════════════════════════════════════
       PASSWORD HANDLERS
       ════════════════════════════════════════════════════════════════ */
    const toggleShowPassword        = () => setShowPassword(p => !p);
    const toggleShowNewPassword     = () => setShowNewPassword(p => !p);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(p => !p);

    const handleUpdatePassword = () => {
        setPasswordError(""); setPasswordSuccess("");
        setNewPasswordError([]); setNewPasswordSuccess([]);
        setConfirmPasswordError(""); setConfirmPasswordSuccess("");
        let isValid = true;

        if (password.trim() === "") { setPasswordError("Please fill the field"); isValid = false; }
        else if (password !== "123456") { setPasswordError("Please enter a correct password"); isValid = false; }
        else { setPasswordSuccess("Password is correct"); }
        if (!isValid) return;

        const npErrors = [], npSuccess = [];
        if (newPassword.trim() === "") { setNewPasswordError("Please fill the field"); isValid = false; }
        else {
            if (newPassword === password) { setNewPasswordError("New password cannot be the same as the old password"); isValid = false; }
            else {
                if (newPassword.length < 8)  { npErrors.push("New password must be at least 8 characters long"); isValid = false; }
                else                          { npSuccess.push("New password is more than 8 characters long"); }
                if (!/[a-z]/.test(newPassword)) { npErrors.push("New password must contain at least one lowercase letter"); isValid = false; }
                else                             { npSuccess.push("New password contains at least one lowercase letter"); }
                if (!/[A-Z]/.test(newPassword)) { npErrors.push("New password must contain at least one uppercase letter"); isValid = false; }
                else                             { npSuccess.push("New password contains at least one uppercase letter"); }
                if (!/[0-9]/.test(newPassword)) { npErrors.push("New password must contain at least one number"); isValid = false; }
                else                             { npSuccess.push("New password contains at least one number"); }
                if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(newPassword)) { npErrors.push("New password must contain at least one special character"); isValid = false; }
                else { npSuccess.push("New password contains at least one special character"); }
                setNewPasswordError(npErrors);
                setNewPasswordSuccess(npSuccess);
            }
        }
        if (!isValid) return;

        if (confirmPassword.trim() === "") { setConfirmPasswordError("Please fill the field"); isValid = false; }
        else if (confirmPassword !== newPassword) { setConfirmPasswordError("Confirm password does not match"); isValid = false; }
        else { setConfirmPasswordSuccess("Confirm password is correct"); }

        if (isValid) { alert("Password updated successfully!"); }
    };

    /* ════════════════════════════════════════════════════════════════
       AUTHENTICATOR TOGGLE & MODAL HANDLERS
       ════════════════════════════════════════════════════════════════ */
    const handleAuthenticatorToggle = useCallback(() => {
        if (!isAuthenticatorOn) {
            // Turning ON — open modal first; toggle stays OFF until confirmed
            setAuthCode(['', '', '', '', '', '']);
            setAuthCodeError('');
            setAuthCodeSuccess('');
            setIsAuthModalOpen(true);
        } else {
            // Turning OFF immediately
            setIsAuthenticatorOn(false);
        }
    }, [isAuthenticatorOn]);

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
        setAuthCode(['', '', '', '', '', '']);
        setAuthCodeError('');
        setAuthCodeSuccess('');
    };

    const handleAuthCodeChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;
        const char = value.slice(-1);
        const newArr = [...authCode];
        newArr[index] = char;
        setAuthCode(newArr);
        if (char !== "" && e.target.nextSibling) e.target.nextSibling.focus();
    };

    const handleAuthCodeKeyDown = (e, index) => {
        if (e.key === "Backspace" && !authCode[index] && e.target.previousSibling)
            e.target.previousSibling.focus();
    };

    const handleAuthConfirm = (e) => {
        e.preventDefault();
        setAuthCodeError('');
        setAuthCodeSuccess('');
        const full = authCode.join('');
        if (authCode.some(d => d === '')) { setAuthCodeError("Please fill in all 6 digits"); return; }
        // Mock: accept "123456" as valid test code
        if (full !== "123456") { setAuthCodeError("Incorrect code — try 123456 for demo"); return; }
        setAuthCodeSuccess("Verified! Authenticator App is now enabled.");
        setTimeout(() => {
            closeAuthModal();
            setIsAuthenticatorOn(true); // ← toggle flips ON only after confirmation
        }, 900);
    };

    /* ════════════════════════════════════════════════════════════════
       SMS RECOVERY TOGGLE & MODAL HANDLERS
       ════════════════════════════════════════════════════════════════ */
    const handleSmsToggle = useCallback(() => {
        if (!isSmsRecoveryOn) {
            setSmsPhoneInput('');
            setSmsPhoneError('');
            setCode(['', '', '', '', '', '']);
            setCodeError('');
            setCodeSuccess('');
            setIsSmsStep1Open(true);
        } else {
            setIsSmsRecoveryOn(false);
        }
    }, [isSmsRecoveryOn]);

    const closeSmsModals = () => {
        setIsSmsStep1Open(false);
        setIsSmsStep2Open(false);
        setSmsPhoneError('');
        setCode(['', '', '', '', '', '']);
        setCodeError('');
        setCodeSuccess('');
    };

    const handleSmsStep1Next = () => {
        if (!smsPhoneInput || smsPhoneInput.trim() === '') { setSmsPhoneError("Please enter your phone number"); return; }
        setSmsPhoneError('');
        setIsSmsStep2Open(true);
    };

    const handleSmsCodeChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;
        const char = value.slice(-1);
        const newCode = [...code];
        newCode[index] = char;
        setCode(newCode);
        if (char !== "" && e.target.nextSibling) e.target.nextSibling.focus();
    };

    const handleSmsCodeKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && e.target.previousSibling)
            e.target.previousSibling.focus();
    };

    const handleSmsVerify = (e) => {
        e.preventDefault();
        setCodeError('');
        setCodeSuccess('');
        const full = code.join('');
        if (code.some(d => d === '')) { setCodeError("Please fill in all fields"); return; }
        if (full !== "123456") { setCodeError("Code is incorrect — use 123456 for demo"); return; }
        setCodeSuccess("Phone verified!");
        setTimeout(() => {
            closeSmsModals();
            setIsSmsRecoveryOn(true); // ← toggle flips ON only after confirmation
        }, 900);
    };

    /* ════════════════════════════════════════════════════════════════
       ACCOUNT RECOVERY HANDLERS
       ════════════════════════════════════════════════════════════════ */
    const openEmailPop = () => { setTempEmail(email); setEmailError(""); setIsEmailOpen(true); };
    const openPhonePop = () => { setTempPhone(phone); setPhoneError(""); setIsPhoneOpen(true); };
    const closeAllPops = () => { setIsEmailOpen(false); setIsPhoneOpen(false); setEmailError(""); setPhoneError(""); };

    const handleEmailSave = () => {
        if (tempEmail.trim() === "") { setEmailError("Please enter your email"); return; }
        if (!tempEmail.includes("@gmail.com")) { setEmailError("Please enter a valid email"); return; }
        setEmail(tempEmail); setEmailError(""); closeAllPops();
    };
    const handlePhoneSave = () => {
        if (tempPhone.trim() === "") { setPhoneError("Please enter your phone"); return; }
        if (!/^[\d\s+]+$/.test(tempPhone)) { setPhoneError("Please enter a valid phone number"); return; }
        if (tempPhone.replace(/\D/g, '').length < 8) { setPhoneError("Phone number is too short"); return; }
        setPhone(tempPhone); setPhoneError(""); closeAllPops();
    };

    /* ════════════════════════════════════════════════════════════════
       RENDER
       ════════════════════════════════════════════════════════════════ */
    return (
        <div className="edit-profile-container">
            {/* ── Breadcrumbs ───────────────────────────────────────── */}
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
                {/* ── Header ────────────────────────────────────────── */}
                <div className="header_setting">
                    <p>{t('setting.header', 'Settings')}</p>
                    <div className="search_page_setting">
                        <img src={search.black} alt="search" className="setting-search-icon" />
                        <input
                            type="search"
                            placeholder={t('setting.search', 'Search settings')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* ── Nav tabs ──────────────────────────────────────── */}
                <div className="Setting_option">
                    {categories.map((category, index) => {
                        const isActive  = location.pathname === category.path;
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

                {/* ── Content ───────────────────────────────────────── */}
                <div className="Secrity_content">

                    {/* ══ Password Card ══════════════════════════════ */}
                    {showPasswordCard && (
                    <div className="sec-card Security_password">
                        <div className="sec-card-header">
                            <h3>Password</h3>
                            <p>Enter your current password to change to a new one</p>
                        </div>
                        <div className="Security_password_content">

                            <p className="field-label">Current Password</p>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your current password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span onClick={toggleShowPassword}>
                                    <img src={showPassword ? "/photo_icons/For_setting/not_see_pas_black.png" : "/photo_icons/For_setting/see_pas_black.png"} alt="toggle" />
                                </span>
                            </div>
                            {(passwordError || passwordSuccess) && (
                                <div className="password_messages">
                                    {passwordError   && <p className="error_password"><img src="/photo_icons/Incorrect.png" alt="error" />{passwordError}</p>}
                                    {passwordSuccess && <p className="success_password"><img src="/photo_icons/Correct.png" alt="success" />{passwordSuccess}</p>}
                                </div>
                            )}

                            <p className="field-label">New Password</p>
                            <div className="password-input-wrapper">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter your new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <span onClick={toggleShowNewPassword}>
                                    <img src={showNewPassword ? "/photo_icons/For_setting/not_see_pas_black.png" : "/photo_icons/For_setting/see_pas_black.png"} alt="toggle" />
                                </span>
                            </div>
                            {((Array.isArray(newPasswordError) && newPasswordError.length > 0) || (typeof newPasswordError === 'string' && newPasswordError) ||
                              (Array.isArray(newPasswordSuccess) && newPasswordSuccess.length > 0) || (typeof newPasswordSuccess === 'string' && newPasswordSuccess)) && (
                                <div className="password_messages">
                                    {Array.isArray(newPasswordError)
                                        ? newPasswordError.map((err, i) => <p key={i} className="error_password"><img src="/photo_icons/Incorrect.png" alt="error" />{err}</p>)
                                        : newPasswordError && <p className="error_password"><img src="/photo_icons/Incorrect.png" alt="error" />{newPasswordError}</p>}
                                    {Array.isArray(newPasswordSuccess)
                                        ? newPasswordSuccess.map((s, i) => <p key={i} className="success_password"><img src="/photo_icons/Correct.png" alt="success" />{s}</p>)
                                        : newPasswordSuccess && <p className="success_password"><img src="/photo_icons/Correct.png" alt="success" />{newPasswordSuccess}</p>}
                                </div>
                            )}

                            <p className="field-label">Confirm New Password</p>
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span onClick={toggleShowConfirmPassword}>
                                    <img src={showConfirmPassword ? "/photo_icons/For_setting/not_see_pas_black.png" : "/photo_icons/For_setting/see_pas_black.png"} alt="toggle" />
                                </span>
                            </div>
                            {(confirmPasswordError || confirmPasswordSuccess) && (
                                <div className="password_messages">
                                    {confirmPasswordError   && <p className="error_password"><img src="/photo_icons/Incorrect.png" alt="error" />{confirmPasswordError}</p>}
                                    {confirmPasswordSuccess && <p className="success_password"><img src="/photo_icons/Correct.png" alt="success" />{confirmPasswordSuccess}</p>}
                                </div>
                            )}
                        </div>
                        <button className="btn-primary" onClick={handleUpdatePassword}>Update Password</button>
                    </div>
                    )}

                    {/* ══ 2FA Card ════════════════════════════════════ */}
                    {show2faCard && (
                    <div className="sec-card Secrity_2FA">
                        <div className="sec-card-header">
                            <h3>Two-Factor Authentication</h3>
                            <p>Enhance your account security by enabling 2FA.</p>
                        </div>

                        {/* ── Authenticator App row ───────────────── */}
                        <div className="Secrity_2FA_content">
                            <div className="Secrity_2FA_content_header">
                                <h4>Authenticator App</h4>
                                <p>Use an app like Google Authenticator or Authy to generate verification codes.</p>
                            </div>
                            <IOSToggle
                                id="authenticator-toggle"
                                checked={isAuthenticatorOn}
                                onChange={handleAuthenticatorToggle}
                            />
                        </div>

                        {/* ── SMS Recovery row ────────────────────── */}
                        <div className="Secrity_2FA_content">
                            <div className="Secrity_2FA_content_header">
                                <h4>SMS Recovery</h4>
                                <p>Allow receiving recovery codes via SMS if you lose access to your authenticator app.</p>
                            </div>
                            <IOSToggle
                                id="sms-toggle"
                                checked={isSmsRecoveryOn}
                                onChange={handleSmsToggle}
                            />
                        </div>
                    </div>
                    )}

                    {/* ══ Active Sessions Card ════════════════════════ */}
                    {showSessionsCard && (
                    <div className="sec-card Active_session">
                        <div className="sec-card-header">
                            <h3>Active Sessions</h3>
                            <p>Manage devices where you are currently logged in.</p>
                        </div>
                        <div className="session-item">
                            {devices.map((device) => (
                                <div key={device.id} className="session-item-header">
                                    <div className="device-icon-wrap">
                                        <img src={device.photo} alt={device.name} className="device-icon" />
                                    </div>
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
                    )}

                    {/* ══ Account Recovery Card ═══════════════════════ */}
                    {showRecoveryCard && (
                    <div className="sec-card Acount-recovery">
                        <div className="sec-card-header">
                            <h3>Account Recovery</h3>
                            <p>Set up recovery options in case you lose access to your account.</p>
                        </div>

                        {/* Email recovery */}
                        <div className="recovery-item">
                            <div className="recovery-item-header">
                                <div className="recovery-icon-wrap">
                                    <img src="/photo_icons/For_setting/email_black.png" alt="email" />
                                </div>
                                <div className="recovery-info">
                                    <div className="recovery-info-header">
                                        <h4>Email Address</h4>
                                        <p>{email}</p>
                                    </div>
                                    <button className="edit" onClick={openEmailPop}>
                                        <img src="/photo_icons/For_setting/Edit_white.png" alt="edit" />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Phone recovery */}
                        <div className="recovery-item">
                            <div className="recovery-item-header">
                                <div className="recovery-icon-wrap">
                                    <img src="/photo_icons/For_setting/phone.png" alt="phone" />
                                </div>
                                <div className="recovery-info">
                                    <div className="recovery-info-header">
                                        <h4>Phone Number</h4>
                                        <p>{phone}</p>
                                    </div>
                                    <button className="edit" onClick={openPhonePop}>
                                        <img src="/photo_icons/For_setting/Edit_white.png" alt="edit" />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="Save-Reset-Cancel">
                            <button><p>Save</p></button>
                            <button><p>Reset</p></button>
                            <button><p>Cancel</p></button>
                        </div>
                    </div>
                    )}

                    {!hasAnyMatch && (
                        <div className="no-results-found" style={{ textAlign: 'center', padding: '40px 20px', color: '#888', gridColumn: '1 / -1' }}>
                            <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>No settings match your search</p>
                            <p style={{ fontSize: '14px' }}>Try searching for something else on this page.</p>
                        </div>
                    )}

                </div>{/* /Secrity_content */}
            </div>{/* /Setting */}

            {/* ════════════════════════════════════════════════════════
                MODAL — Authenticator App Setup (QR Code)
                ════════════════════════════════════════════════════════ */}
            {isAuthModalOpen && (
                <div className="popup-overlay_authenticator" onClick={(e) => { if (e.target === e.currentTarget) closeAuthModal(); }}>
                    <div className="popup_authenticator">

                        {/* Header */}
                        <div className="popup-header_authenticator">
                            <h3>Setup Authenticator App</h3>
                            <button onClick={closeAuthModal}>
                                <img src="/photo_icons/For_setting/false.png" alt="close" />
                            </button>
                        </div>

                        {/* Instructions */}
                        <div className="popup-content-header_authenticator">
                            <h4>Scan this QR code</h4>
                            <p>Open <strong>Google Authenticator</strong> or <strong>Authy</strong>, tap the&nbsp;+ button, then scan the code below.</p>
                        </div>

                        {/* Real QR Code */}
                        <div className="popup-content_authenticator">
                            <div className="qr-wrapper">
                                <QRCodeSVG
                                    value={totpUri}
                                    size={180}
                                    bgColor="#ffffff"
                                    fgColor="#111827"
                                    level="M"
                                    includeMargin={true}
                                />
                            </div>
                            <p className="qr-secret-label">
                                Can't scan? Enter this key manually:
                            </p>
                            <code className="totp-secret-code">{totpSecret}</code>
                        </div>

                        {/* Verify code */}
                        <div className="popup-content_code">
                            <h4>Enter the 6-digit code from your app</h4>
                            <div className="otp-inputs">
                                {authCode.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength="1"
                                        placeholder={index + 1}
                                        value={digit}
                                        onChange={(e) => handleAuthCodeChange(e, index)}
                                        onKeyDown={(e) => handleAuthCodeKeyDown(e, index)}
                                        onFocus={(e) => e.target.select()}
                                    />
                                ))}
                            </div>
                            {authCodeError   && <p className="error_password"  style={{ color: "#dc2626", marginTop: "6px" }}>{authCodeError}</p>}
                            {authCodeSuccess && <p className="success_password" style={{ color: "#16a34a", marginTop: "6px" }}>{authCodeSuccess}</p>}
                        </div>

                        {/* Confirm button */}
                        <div className="popup-content-footer_authenticator">
                            <button className="send-code-btn" onClick={handleAuthConfirm}>
                                Confirm &amp; Enable
                            </button>
                            <button className="send-code-btn send-code-btn--ghost" onClick={closeAuthModal}>
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* ════════════════════════════════════════════════════════
                MODAL — SMS Recovery Step 1 (Enter Phone)
                ════════════════════════════════════════════════════════ */}
            {isSmsStep1Open && (
                <div className="popup-overlay_smsRecovery" onClick={(e) => { if (e.target === e.currentTarget) closeSmsModals(); }}>
                    <div className="popup_smsRecovery">
                        <div className="popup-header_smsRecovery">
                            <h3>Enter your phone number</h3>
                            <button onClick={closeSmsModals}><img src="/photo_icons/For_setting/false.png" alt="close" /></button>
                        </div>
                        <div className="popup-content-header_smsRecovery">
                            <h4>Enter your phone number to receive recovery codes</h4>
                            <p>We'll send a 6-digit code to this number to verify your account.</p>
                        </div>
                        <div className="popup-content_smsRecovery">
                            <h4>Phone Number</h4>
                            <input
                                type="tel"
                                value={smsPhoneInput}
                                onChange={(e) => setSmsPhoneInput(e.target.value)}
                                placeholder="Enter your phone number"
                            />
                            {smsPhoneError && <p className="error_password" style={{ color: "#dc2626", marginTop: "4px" }}>{smsPhoneError}</p>}
                            <p style={{ fontSize: "12px", color: "#9ca3af" }}>We'll never share your phone number.</p>
                        </div>
                        <div className="popup-content-footer_smsRecovery">
                            <button className="send-code-btn" onClick={handleSmsStep1Next}>Send Code</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ════════════════════════════════════════════════════════
                MODAL — SMS Recovery Step 2 (Verify Code)
                ════════════════════════════════════════════════════════ */}
            {isSmsStep2Open && (
                <div className="popup-overlay_code" onClick={(e) => { if (e.target === e.currentTarget) closeSmsModals(); }}>
                    <div className="popup_code">
                        <div className="popup-header_code">
                            <h3>Verify your phone</h3>
                            <button onClick={closeSmsModals}><img src="/photo_icons/For_setting/false.png" alt="close" /></button>
                        </div>
                        <div className="popup-content-header_code">
                            <h4>6-digit code sent to {smsPhoneInput}</h4>
                            <p>Check your phone for the code we just sent.</p>
                        </div>
                        <div className="popup-content_code">
                            <h4>Verification Code</h4>
                            <div className="otp-inputs">
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength="1"
                                        placeholder={index + 1}
                                        value={digit}
                                        onChange={(e) => handleSmsCodeChange(e, index)}
                                        onKeyDown={(e) => handleSmsCodeKeyDown(e, index)}
                                        onFocus={(e) => e.target.select()}
                                    />
                                ))}
                            </div>
                            {codeError   && <p className="error_password"  style={{ color: "#dc2626" }}>{codeError}</p>}
                            {codeSuccess && <p className="success_password" style={{ color: "#16a34a" }}>{codeSuccess}</p>}
                        </div>
                        <div className="popup-content-footer_code">
                            <button className="send-code-btn" onClick={handleSmsVerify}>Verify Code</button>
                            <button className="send-code-btn send-code-btn--ghost" onClick={() => setCode(['', '', '', '', '', ''])}>Resend Code</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ════════════════════════════════════════════════════════
                MODAL — Edit Email
                ════════════════════════════════════════════════════════ */}
            {isEmailOpen && (
                <div className="popup" onClick={(e) => { if (e.target === e.currentTarget) closeAllPops(); }}>
                    <div className="popup-content">
                        <div className="popup-header">
                            <h3>Edit Email</h3>
                            <button className="close" onClick={closeAllPops}><img src="/photo_icons/For_setting/false.png" alt="close" /></button>
                        </div>
                        <div className="popup-body">
                            <h4>New Email Address</h4>
                            <input type="email" value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} placeholder="Enter your new email" />
                            {emailError && <div className="error"><p>{emailError}</p></div>}
                        </div>
                        <div className="popup-footer">
                            <button onClick={closeAllPops}>Cancel</button>
                            <button onClick={handleEmailSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ════════════════════════════════════════════════════════
                MODAL — Edit Phone
                ════════════════════════════════════════════════════════ */}
            {isPhoneOpen && (
                <div className="popup" onClick={(e) => { if (e.target === e.currentTarget) closeAllPops(); }}>
                    <div className="popup-content">
                        <div className="popup-header">
                            <h3>Edit Phone</h3>
                            <button className="close" onClick={closeAllPops}><img src="/photo_icons/For_setting/false.png" alt="close" /></button>
                        </div>
                        <div className="popup-body">
                            <h4>New Phone Number</h4>
                            <input type="tel" value={tempPhone} onChange={(e) => setTempPhone(e.target.value)} placeholder="Enter your phone number" />
                            {phoneError && <div className="error"><p>{phoneError}</p></div>}
                        </div>
                        <div className="popup-footer">
                            <button onClick={closeAllPops}>Cancel</button>
                            <button onClick={handlePhoneSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Security;
