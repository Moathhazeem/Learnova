import { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import "./Create_new_pas.css"
function CreateNewPas() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // حالات الخطأ والنجاح لكل حقل بشكل منفصل
    const [passError, setPassError] = useState([]);
    const [passSuccess, setPassSuccess] = useState([]);
    const [confError, setConfError] = useState("");
    const [confSuccess, setConfSuccess] = useState("");

    const totalPages = 4;

    const goToLogin = () => {
        navigate("/log_in");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // تصفير جميع الرسائل قبل البدء بالتحقق
        setPassError("");
        setPassSuccess("");
        setConfError("");
        setConfSuccess("");

        let isValid = true;
        const trimmedPass = password.trim();
        const trimmedConf = confirmPassword.trim();
        let passError = [];
        let passSuccess = [];
        // 1. التحقق من كلمة المرور الأولى
        if (trimmedPass === "") {
            passError.push("Please fill in this field.");
            isValid = false;
        }
        else {
            if (trimmedPass.length < 8) {
                passError.push("Password must be at least 8 characters long.");
                isValid = false;
            }
            else {
                passSuccess.push("Password has at least 8 characters.")
            }
            if (!/[a-z]/.test(trimmedPass)) {
                passError.push("Password must have at least one lowercase letter.");
                isValid = false;
            }
            else {
                passSuccess.push("Password has at least one lowercase letter.")
            }
            if (!/[A-Z]/.test(trimmedPass)) {
                passError.push("Password must have at least one uppercase letter.");
                isValid = false;
            }
            else {
                passSuccess.push("Password has at least one uppercase letter.")
            }
            if (!/[0-9]/.test(trimmedPass)) {
                passError.push("Password must have at least one number.");
                isValid = false;
            }
            else {
                passSuccess.push("Password has at least one number.")
            }
            if (!/[!@#$%^&*]/.test(trimmedPass)) {
                passError.push("Password must have at least one special character.");
                isValid = false;
            }
            else {
                passSuccess.push("Password has at least one special character.")
            }
        }
        setPassError(passError);
        setPassSuccess(passSuccess);
        // 2. التحقق من حقل التأكيد
        if (trimmedConf === "") {
            setConfError("Please confirm your password.");
            isValid = false;
        } else if (trimmedPass !== trimmedConf) {
            setConfError("Passwords do not match!");
            isValid = false;
        } else if (isValid) {
            // لا تظهر "متطابق" إلا إذا كانت كلمة المرور الأصلية صحيحة أصلاً
            setConfSuccess("Passwords match perfectly.");
        }

        // 3. الانتقال إذا كان كل شيء صحيحاً
        if (isValid && trimmedPass === trimmedConf) {
            goToLogin();
        }
    };

    return (
        <>
            <div className="Create-new-pas-page-container">
                <div className="Create-new-pas-form">
                    <div className="Create-new-pas">
                        <h1 className="title-create-new-pas">Create New Password</h1>
                        <p className="description-create-new-pas">Enter a new password for your account</p>
                    </div>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="Form-new-pas">
                            <h2>New Password</h2>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {passError.length > 0 &&
                                passError.map((err, i) => (
                                    <span key={i} className="error-message">
                                        <img src="/photo_icons/Inchorrect.png" alt="error" /> {err}
                                    </span>
                                ))}

                            {passSuccess.length > 0 &&
                                passSuccess.map((succ, i) => (
                                    <span key={i} className="success-message">
                                        <img src="/photo_icons/Chorrect.png" alt="success" /> {succ}
                                    </span>
                                ))}

                            <h2>Repeat Password</h2>
                            <input
                                type="password"
                                placeholder="Repeat new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {confError && (
                                <p className="error-message">
                                    <img className="error-photo" src="/photo_icons/Inchorrect.png" alt="error" />
                                    {confError}
                                </p>
                            )}
                            {confSuccess && (
                                <p className="correct-message">
                                    <img className="correct-photo" src="/photo_icons/Chorrect.png" alt="success" />
                                    {confSuccess}
                                </p>
                            )}
                        </div>
                        <button type="submit" className="Confirm_new_pass">Confirm</button>
                        <div className="BTLI">
                            <label onClick={goToLogin} style={{ cursor: "pointer" }}>
                                <img src="/photo_icons/Back.png" alt="Back to Login" />
                                Back to log in
                            </label>
                        </div>
                        <div className="dots-container">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === 3 ? 'active' : ""}`}
                                ></span>
                            ))}
                        </div>
                    </form >
                </div>
                <div className="photo">
                    <img src="/Photo/Create_new_password.jfif" alt="Photo related to create new password" title="Photo related to create new password" />
                </div>
            </div>
        </>
    );
}
export default CreateNewPas;
