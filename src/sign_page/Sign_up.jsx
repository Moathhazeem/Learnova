import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Sign_up.css"

/**
 * مكون صفحة إنشاء حساب جديد (SignUp)
 * يوفر واجهة للمستخدم لتدخيل بياناته والتحقق من صحتها قبل إرسالها إلى الـ API.
 */
function SignUp() {
    const navigate = useNavigate();

    /**
     * وظيفة للانتقال إلى صفحة تسجيل الدخول
     */
    const goToLogIn = () => {
        navigate("/log_in")
    }

    // حالات التخزين لبيانات المدخلات
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [agree, setAgree] = useState(false);

    // حالات رسائل الخطأ لكل حقل
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [agreeError, setAgreeError] = useState("");
    const [serverError, setServerError] = useState("");   // ← خطأ من الـ API
    const [isLoading, setIsLoading] = useState(false);    // ← حالة التحميل

    // حالات رسائل النجاح لكل حقل
    const [firstNameSuccess, setFirstNameSuccess] = useState("");
    const [lastNameSuccess, setLastNameSuccess] = useState("");
    const [emailSuccess, setEmailSuccess] = useState([]);
    const [passwordSuccess, setPasswordSuccess] = useState([]);
    const [confirmPasswordSuccess, setConfirmPasswordSuccess] = useState("");
    const [phoneSuccess, setPhoneSuccess] = useState("");

    /**
     * التحقق المحلي من الحقول
     * @returns {boolean} isValid
     */
    const validateLocally = () => {
        // إعادة تعيين جميع الرسائل
        setFirstNameError(""); setLastNameError("");
        setEmailError([]); setPasswordError([]);
        setConfirmPasswordError(""); setPhoneError("");
        setAgreeError(""); setServerError("");
        setFirstNameSuccess(""); setLastNameSuccess("");
        setEmailSuccess([]); setPasswordSuccess([]);
        setConfirmPasswordSuccess(""); setPhoneSuccess("");

        let isValid = true;
        const trimmedFirstName      = firstName.trim();
        const trimmedLastName       = lastName.trim();
        const trimmedEmail          = email.trim();
        const trimmedPassword       = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();
        const trimmedPhone          = phone.trim();

        // 1. الاسم الأول
        if (!trimmedFirstName) {
            setFirstNameError("Please fill in this field."); isValid = false;
        } else if (trimmedFirstName.length < 5) {
            setFirstNameError("First name must be at least 5 characters long."); isValid = false;
        } else if (!/[A-Za-z]/.test(trimmedFirstName)) {
            setFirstNameError("First name must contain only letters."); isValid = false;
        } else {
            setFirstNameSuccess("First name is valid.");
        }

        // 2. اسم العائلة
        if (!trimmedLastName) {
            setLastNameError("Please fill in this field."); isValid = false;
        } else if (trimmedLastName.length < 2) {
            setLastNameError("Last name must be at least 2 characters long."); isValid = false;
        } else if (!/[A-Za-z]/.test(trimmedLastName)) {
            setLastNameError("Last name must contain only letters."); isValid = false;
        } else {
            setLastNameSuccess("Last name is valid.");
        }

        // 3. البريد الإلكتروني
        let emailErrors = [], emailSuccesses = [];
        if (!trimmedEmail) {
            emailErrors.push("Please fill in this field."); isValid = false;
        } else {
            if (trimmedEmail.length < 8) {
                emailErrors.push("Email must be at least 8 characters long."); isValid = false;
            } else {
                emailSuccesses.push("Email has at least 8 characters.");
            }
            if (!trimmedEmail.includes("@gmail.com")) {
                emailErrors.push("Please enter a valid email address (must include @gmail.com)."); isValid = false;
            } else {
                emailSuccesses.push("Email contains @gmail.com.");
            }
        }
        setEmailError(emailErrors);
        setEmailSuccess(emailSuccesses);

        // 4. كلمة المرور
        let passErrors = [], passSuccesses = [];
        if (!trimmedPassword) {
            passErrors.push("Please fill in this field."); isValid = false;
        } else {
            if (trimmedPassword.length < 8) { passErrors.push("Password must be at least 8 characters long."); isValid = false; }
            else { passSuccesses.push("Password has at least 8 characters."); }
            if (!/[0-9]/.test(trimmedPassword))      { passErrors.push("Password must contain at least one number."); isValid = false; }
            else { passSuccesses.push("Password has at least one number."); }
            if (!/[A-Z]/.test(trimmedPassword))      { passErrors.push("Password must contain at least one uppercase letter."); isValid = false; }
            else { passSuccesses.push("Password has at least one uppercase letter."); }
            if (!/[a-z]/.test(trimmedPassword))      { passErrors.push("Password must contain at least one lowercase letter."); isValid = false; }
            else { passSuccesses.push("Password has at least one lowercase letter."); }
            if (!/[!@#$%^&*]/.test(trimmedPassword)) { passErrors.push("Password must contain at least one special character."); isValid = false; }
            else { passSuccesses.push("Password has at least one special character."); }
        }
        setPasswordError(passErrors);
        setPasswordSuccess(passSuccesses);

        // 5. تأكيد كلمة المرور
        if (!trimmedConfirmPassword) {
            setConfirmPasswordError("Please confirm your password."); isValid = false;
        } else if (trimmedConfirmPassword !== trimmedPassword) {
            setConfirmPasswordError("Passwords do not match!"); isValid = false;
        } else {
            setConfirmPasswordSuccess("Passwords match.");
        }

        // 6. رقم الهاتف
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!trimmedPhone) {
            setPhoneError("Please fill in this field."); isValid = false;
        } else if (!phoneRegex.test(trimmedPhone)) {
            setPhoneError("Please enter a valid phone number (10-15 digits)."); isValid = false;
        } else {
            setPhoneSuccess("Phone number is valid.");
        }

        // 7. الموافقة على الشروط
        if (!agree) {
            setAgreeError("You must agree to the terms and conditions."); isValid = false;
        }

        return isValid && passErrors.length === 0;
    };

    /**
     * وظيفة معالجة إرسال النموذج → تستدعي Express API
     * @param {Event} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateLocally()) return;

        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    password: password.trim(),
                    confirmPassword: confirmPassword.trim(),
                    phone: phone.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // 409 = email already in use, else generic error
                setServerError(data.errors?.[0] || "Registration failed. Please try again.");
                setIsLoading(false);
                return;
            }

            // ✅ Success: store token & user, navigate home
            localStorage.setItem("learnova_token", data.token);
            localStorage.setItem("learnova_user", JSON.stringify(data.user));
            navigate("/home");
        } catch (err) {
            setServerError("Cannot connect to server. Make sure the backend is running.");
            setIsLoading(false);
        }
    };


    return (
        <>
            <div className="sign-up-page-container">
                <div className="sign-up-form">
                    <h1 className="title-sign-up">Sign up to <label style={{ color: "#0089EA" }}>Learnova</label></h1>

                    {/* ── Server-level error banner ── */}
                    {serverError && (
                        <div className="server-error-banner">
                            <img src="/photo_icons/Inchorrect.png" alt="error" />
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="fullName" style={{ marginBottom: "20px" }}>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    placeholder="example Moath"
                                />
                                {firstNameError && <span className="error-message"><img src="/photo_icons/Inchorrect.png" alt="error" />{firstNameError}</span>}
                                {firstNameSuccess && <span className="success-message"><img src="/photo_icons/Chorrect.png" alt="success" />{firstNameSuccess}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name" >Last Name</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    placeholder="example Hazeem"
                                />
                                {lastNameError && <span className="error-message"><img src="/photo_icons/Inchorrect.png" alt="error" />{lastNameError}</span>}
                                {lastNameSuccess && <span className="success-message"><img src="/photo_icons/Chorrect.png" alt="success" />{lastNameSuccess}</span>}
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: "-20px" }}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="example Moath_hazeem665@gmail.com"
                            />
                            {emailError.length > 0 &&
                                emailError.map((err, i) => (
                                    <span key={i} className="error-message" style={{ marginTop: i === 0 ? "-30px" : "10px" }}>
                                        <img src="/photo_icons/Inchorrect.png" alt="error" />
                                        {err}
                                    </span>
                                ))}

                            {emailSuccess.length > 0 &&
                                emailSuccess.map((succ, i) => (
                                    <span key={i} className="success-message" style={{ marginTop: i === 0 ? "-30px" : "10px" }}>
                                        <img src="/photo_icons/Chorrect.png" alt="success" />
                                        {succ}
                                    </span>
                                ))}

                        </div>

                        <div className="form-group" style={{ marginBottom: "20px" }}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="example 4645456qwwe#$"
                            />
                            {passwordError.length > 0 &&
                                passwordError.map((err, i) => (
                                    <span key={i} className="error-message">
                                        <img src="/photo_icons/Inchorrect.png" alt="error" /> {err}
                                    </span>
                                ))}

                            {passwordSuccess.length > 0 &&
                                passwordSuccess.map((succ, i) => (
                                    <span key={i} className="success-message">
                                        <img src="/photo_icons/Chorrect.png" alt="success" /> {succ}
                                    </span>
                                ))}

                        </div>

                        <div className="form-group" style={{ marginBottom: "20px" }}>
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="example 4645456qwwe#$"
                            />
                            {confirmPasswordError && <span className="error-message"><img src="/photo_icons/Inchorrect.png" alt="error" />{confirmPasswordError}</span>}
                            {confirmPasswordSuccess && <span className="success-message"><img src="/photo_icons/Chorrect.png" alt="success" />{confirmPasswordSuccess}</span>}
                        </div>

                        <div className="form-group" style={{ marginBottom: "40px" }}>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder="example 0528885023"
                            />
                            {phoneError && <span className="error-message"><img src="/photo_icons/Inchorrect.png" alt="error" />{phoneError}</span>}
                            {phoneSuccess && <span className="success-message"><img src="/photo_icons/Chorrect.png" alt="success" />{phoneSuccess}</span>}
                        </div>

                        <div className="form-options" style={{ marginBottom: "20px" }}>
                            <div className="form-group_remember">
                                <input
                                    type="checkbox"
                                    id="confirmation"
                                    name="confirmation"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    required
                                />
                                <label htmlFor="confirmation">I agree to the <span style={{ color: "#0089EA", cursor: "pointer" }}>Terms & Condition</span></label>
                            </div>
                            {agreeError && <span className="error-message"><img src="/photo_icons/Inchorrect.png" alt="error" />{agreeError}</span>}
                        </div>

                        <button type="submit" className="sign-in-button" disabled={isLoading}>
                            {isLoading ? (
                                <span className="btn-loading">
                                    <span className="spinner" /> Creating account...
                                </span>
                            ) : "Sign Up"}
                        </button>

                        <div className="or">
                            <span>Or register with</span>
                        </div>

                        <div className="social-media-container">
                            <div className="social-button">
                                <img src="/photo_icons/Google.png" alt="logo_Google" />
                                <span>Google</span>
                            </div>
                            <div className="social-button">
                                <img src="/photo_icons/Facebook_Logo.png" alt="logo_Facebook" />
                                <span>Facebook</span>
                            </div>
                        </div>

                        <div className='DHAA'>
                            <p style={{ color: "#514C4Ca5" }}>Already have an account? <a onClick={goToLogIn} style={{ color: "#0089EA", fontWeight: "bold", cursor: "pointer" }}>Log In</a></p>
                        </div>
                    </form>
                </div>
                <div className="Photo">
                    <img src="/Photo/Photo_Sign_up.jpg" alt="Photo related to sign up" title="Photo related to sign up" />
                </div>
            </div>
        </>
    )
}

export default SignUp;
