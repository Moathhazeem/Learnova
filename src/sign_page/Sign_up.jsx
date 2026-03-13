import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Sign_up.css"

/**
 * مكون صفحة إنشاء حساب جديد (SignUp)
 * يوفر واجهة للمستخدم لتدخيل بياناته والتحقق من صحتها قبل إرسالها.
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
    const [agree, setAgree] = useState(false); // الحالة الجديدة للـ checkbox

    // حالات رسائل الخطأ لكل حقل
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState([]); // مصفوفة للأخطاء المتعددة
    const [passwordError, setPasswordError] = useState([]); // مصفوفة للأخطاء المتعددة
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [agreeError, setAgreeError] = useState(""); // خطأ الموافقة

    // حالات رسائل النجاح لكل حقل
    const [firstNameSuccess, setFirstNameSuccess] = useState("");
    const [lastNameSuccess, setLastNameSuccess] = useState("");
    const [emailSuccess, setEmailSuccess] = useState([]);
    const [passwordSuccess, setPasswordSuccess] = useState([]); // مصفوفة للنجاحات المتعددة
    const [confirmPasswordSuccess, setConfirmPasswordSuccess] = useState("");
    const [phoneSuccess, setPhoneSuccess] = useState("");

    /**
     * وظيفة معالجة إرسال النموذج (Form Submission)
     * تقوم بالتحقق من جميع الحقول وعرض الأخطاء المناسبة.
     * @param {Event} e - حدث الإرسال
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // إعادة تعيين جميع الرسائل قبل البدء بالفحص الجديد
        setFirstNameError("");
        setLastNameError("");
        setEmailError([]);
        setPasswordError([]);
        setConfirmPasswordError("");
        setPhoneError("");
        setAgreeError(""); // رسالة خطأ الموافقة

        setFirstNameSuccess("");
        setLastNameSuccess("");
        setEmailSuccess([]);
        setPasswordSuccess([]);
        setConfirmPasswordSuccess("");
        setPhoneSuccess("");

        let isValid = true;

        // تنظيف القيم من الفراغات الزائدة
        const trimmedFirstName = firstName.trim();
        const trimmedLastName = lastName.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();
        const trimmedPhone = phone.trim();

        // 1. التحقق من الاسم الأول
        if (trimmedFirstName === "") {
            setFirstNameError("Please fill in this field.");
            isValid = false;
        } else if (trimmedFirstName.length < 5) {
            setFirstNameError("First name must be at least 5 characters long.");
            isValid = false;
        }
        else if (!/[A-Za-z]/.test(trimmedFirstName)) {
            setFirstNameError("First name must contain only letters.");
            isValid = false;
        }
        else {
            setFirstNameSuccess("First name is valid.");
        }

        // 2. التحقق من اسم العائلة
        if (trimmedLastName === "") {
            setLastNameError("Please fill in this field.")
            isValid = false;
        } else if (trimmedLastName.length < 2) {
            setLastNameError("Last name must be at least 2 characters long.");
            isValid = false;
        }
        else if (!/[A-Za-z]/.test(trimmedLastName)) {
            setLastNameError("Last name must contain only letters.");
            isValid = false;
        }
        else {
            setLastNameSuccess("Last name is valid.");
        }
        // 3. التحقق من البريد الإلكتروني
        let emailErrors = [];
        let emailSuccesses = [];

        if (trimmedEmail === "") {
            emailErrors.push("Please fill in this field.");
            isValid = false;
        } else {
            // فحص الطول
            if (trimmedEmail.length < 8) {
                emailErrors.push("Email must be at least 8 characters long.");
                isValid = false;
            } else {
                emailSuccesses.push("Email has at least 8 characters.");
            }

            // فحص نطاق البريد
            if (!trimmedEmail.includes("@gmail.com")) {
                emailErrors.push("Please enter a valid email address (must include @gmail.com).");
                isValid = false;
            } else {
                emailSuccesses.push("Email contains @gmail.com.");
            }
        }
        setEmailError(emailErrors);
        setEmailSuccess(emailSuccesses);

        // 4. التحقق من كلمة المرور (أخطاء ونجاحات متعددة)
        let passErrors = [];
        let passSuccesses = [];

        if (trimmedPassword === "") {
            passErrors.push("Please fill in this field.");
            isValid = false;
        } else {
            // فحص الطول
            if (trimmedPassword.length < 8) {
                passErrors.push("Password must be at least 8 characters long.");
                isValid = false;
            } else {
                passSuccesses.push("Password has at least 8 characters.");
            }

            // فحص الأرقام
            if (!/[0-9]/.test(trimmedPassword)) {
                passErrors.push("Password must contain at least one number.");
                isValid = false;
            } else {
                passSuccesses.push("Password has at least one number.");
            }

            // فحص الحروف الكبيرة
            if (!/[A-Z]/.test(trimmedPassword)) {
                passErrors.push("Password must contain at least one uppercase letter.");
                isValid = false;
            } else {
                passSuccesses.push("Password has at least one uppercase letter.");
            }

            // فحص الحروف الصغيرة
            if (!/[a-z]/.test(trimmedPassword)) {
                passErrors.push("Password must contain at least one lowercase letter.");
                isValid = false;
            } else {
                passSuccesses.push("Password has at least one lowercase letter.");
            }

            // فحص الرموز الخاصة
            if (!/[!@#$%^&*]/.test(trimmedPassword)) {
                passErrors.push("Password must contain at least one special character.");
                isValid = false;
            } else {
                passSuccesses.push("Password has at least one special character.");
            }
        }
        setPasswordError(passErrors);
        setPasswordSuccess(passSuccesses);

        // 5. التحقق من تأكيد كلمة المرور
        if (trimmedConfirmPassword === "") {
            setConfirmPasswordError("Please confirm your password.");
            isValid = false;
        } else if (trimmedConfirmPassword !== trimmedPassword) {
            setConfirmPasswordError("Passwords do not match!");
            isValid = false;
        } else {
            setConfirmPasswordSuccess("Passwords match.");
        }

        // 6. التحقق من رقم الهاتف
        const phoneRegex = /^[0-9]{10,15}$/;
        if (trimmedPhone === "") {
            setPhoneError("Please fill in this field.");
            isValid = false;
        } else if (!phoneRegex.test(trimmedPhone)) {
            setPhoneError("Please enter a valid phone number (10-15 digits).");
            isValid = false;
        } else {
            setPhoneSuccess("Phone number is valid.");
        }

        // 7. التحقق من الموافقة على الشروط
        if (!agree) {
            setAgreeError("You must agree to the terms and conditions.");
            isValid = false;
        }

        // الانتقال للصفحة الرئيسية عند نجاح جميع الفحوصات
        if (isValid && passErrors.length === 0) {
            navigate("/home");
        }
    }

    return (
        <>
            <div className="sign-up-page-container">
                <div className="sign-up-form">
                    <h1 className="title-sign-up">Sign up to <label style={{ color: "#0089EA" }}>Learnova</label></h1>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="fullName">
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
                                {firstNameError && <span className="error-message" style={{ color: "red", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px", marginTop: "5px" }}><img src="/photo_icons/Inchorrect.png" alt="error" style={{ width: "16px" }} />{firstNameError}</span>}
                                {firstNameSuccess && <span className="success-message" style={{ color: "green", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px", marginTop: "5px" }}><img src="/photo_icons/Chorrect.png" alt="success" style={{ width: "16px" }} />{firstNameSuccess}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    placeholder="example Hazeem"
                                />
                                {lastNameError && <span className="error-message" style={{ color: "red", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px", marginTop: "5px" }}><img src="/photo_icons/Inchorrect.png" alt="error" style={{ width: "16px" }} />{lastNameError}</span>}
                                {lastNameSuccess && <span className="success-message" style={{ color: "green", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px", marginTop: "5px" }}><img src="/photo_icons/Chorrect.png" alt="success" style={{ width: "16px" }} />{lastNameSuccess}</span>}
                            </div>
                        </div>

                        <div className="form-group">
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
                            {emailError.length > 0 && (
                                <div style={{ marginTop: "5px" }}>
                                    {emailError.map((err, i) => (
                                        <span key={i} className="error-message" style={{ color: "red", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
                                            <img src="/photo_icons/Inchorrect.png" alt="error" style={{ width: "16px" }} />
                                            {err}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {emailSuccess.length > 0 && (
                                <div style={{ marginTop: "5px" }}>
                                    {emailSuccess.map((succ, i) => (
                                        <span key={i} className="success-message" style={{ color: "green", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
                                            <img src="/photo_icons/Chorrect.png" alt="success" style={{ width: "16px" }} />
                                            {succ}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
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
                            {passwordError.length > 0 && (
                                <div style={{ marginTop: "5px" }}>
                                    {passwordError.map((err, i) => (
                                        <span key={i} className="error-message" style={{ color: "red", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                                            <img src="/photo_icons/Inchorrect.png" alt="error" style={{ width: "16px" }} /> {err}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {passwordSuccess.length > 0 && (
                                <div style={{ marginTop: "5px" }}>
                                    {passwordSuccess.map((succ, i) => (
                                        <span key={i} className="success-message" style={{ color: "green", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                                            <img src="/photo_icons/Chorrect.png" alt="success" style={{ width: "16px" }} /> {succ}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
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
                            {confirmPasswordError && <span className="error-message" style={{ color: "red", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px", marginTop: "5px" }}><img src="/photo_icons/Inchorrect.png" alt="error" style={{ width: "16px" }} />{confirmPasswordError}</span>}
                            {confirmPasswordSuccess && <span className="success-message" style={{ color: "green", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px", marginTop: "5px" }}><img src="/photo_icons/Chorrect.png" alt="success" style={{ width: "16px" }} />{confirmPasswordSuccess}</span>}
                        </div>

                        <div className="form-group">
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
                            {phoneError && <span className="error-message" style={{ color: "red", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px", marginTop: "5px" }}><img src="/photo_icons/Inchorrect.png" alt="error" style={{ width: "16px" }} />{phoneError}</span>}
                            {phoneSuccess && <span className="success-message" style={{ color: "green", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px", marginTop: "5px" }}><img src="/photo_icons/Chorrect.png" alt="success" style={{ width: "16px" }} />{phoneSuccess}</span>}
                        </div>

                        <div className="form-options">
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
                            {agreeError && <span className="error-message" style={{ color: "red", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px", marginTop: "8px", width: "100%" }}><img src="/photo_icons/Inchorrect.png" alt="error" style={{ width: "16px" }} />{agreeError}</span>}
                        </div>

                        <button type="submit" className="sign-in-button">Sign Up</button>

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
