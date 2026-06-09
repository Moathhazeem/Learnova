import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react'
import "./Log_in.css";

function LogIn() {
    const navigate = useNavigate();

    const goToForgotPassword = () => navigate("/Forgot_pas");
    const goToSignIn = () => navigate("/sign_up");

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState([]);
    const [emailSuccess, setEmailSuccess] = useState("");
    const [passSuccess, setPassSuccess] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState({ email: false, password: false });

    const validateField = (name, value) => {
        if (name === "email") {
            if (!value.trim()) return "Please fill in this field.";
            if (!value.trim().includes("@gmail.com")) return "Please enter a valid Gmail address.";
            return "";
        }
        if (name === "password") {
            if (!value.trim()) return "Please fill in this field.";
            if (value.trim().length < 8) return "Password must be at least 8 characters.";
            return "";
        }
        return "";
    };

    const handleInputChange = (name, value, setter) => {
        setter(value);
        if (touched[name]) {
            const error = validateField(name, value);
            if (name === "email") {
                setEmailError(error);
                setEmailSuccess(error ? "" : "Email is valid.");
            } else {
                setPassError(error ? [error] : []);
                setPassSuccess(error ? [] : ["Password looks good."]);
            }
        }
    };

    const handleBlur = (name) => {
        setTouched(prev => ({ ...prev, [name]: true }));
        const value = name === "email" ? email : pass;
        const error = validateField(name, value);
        if (name === "email") {
            setEmailError(error);
            setEmailSuccess(error ? "" : "Email is valid.");
        } else {
            setPassError(error ? [error] : []);
            setPassSuccess(error ? [] : ["Password looks good."]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({ email: true, password: true });

        const eError = validateField("email", email);
        const pError = validateField("password", pass);

        setEmailError(eError);
        setPassError(pError ? [pError] : []);

        if (!eError && !pError) {
            setIsSubmitting(true);
            setTimeout(() => {
                navigate("/home");
            }, 1500);
        }
    };

    return (
        <>
            <div className="login-page-container">
                <div className="login-card-wrapper">
                    <div className="login-card">
                        <h1 className="title-login">
                            Login to <span className="brand-accent">Learnova</span>
                        </h1>
                        <p className="login-subtitle">Welcome back! Please enter your details.</p>

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className={`login-input-field-wrapper ${touched.email && emailError ? 'has-error' : touched.email && emailSuccess ? 'has-success' : ''}`}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="login-email-input"
                                        value={email}
                                        onChange={(e) => handleInputChange("email", e.target.value, setEmail)}
                                        onBlur={() => handleBlur("email")}
                                        required
                                        placeholder="moathhazeem@gmail.com"
                                    />
                                    {touched.email && (
                                        <span className="feedback-icon">
                                            {emailError ? (
                                                <AlertCircle className="icon-err" size={22} strokeWidth={2.5} />
                                            ) : emailSuccess ? (
                                                <Check className="icon-succ" size={22} strokeWidth={3} />
                                            ) : null}
                                        </span>
                                    )}
                                </div>
                                {touched.email && emailError && (
                                    <span className="error-message">
                                        {emailError}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className={`login-input-field-wrapper ${touched.password && passError.length > 0 ? 'has-error' : touched.password && passSuccess.length > 0 ? 'has-success' : ''}`}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="login-password-input"
                                        value={pass}
                                        onChange={(e) => handleInputChange("password", e.target.value, setPass)}
                                        onBlur={() => handleBlur("password")}
                                        required
                                        placeholder="Your password"
                                    />
                                    <button
                                        type="button"
                                        className="login-password-toggle-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex="-1"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                                    </button>
                                </div>
                                {touched.password && passError.map((err, i) => (
                                    <span key={i} className="error-message">
                                        {err}
                                    </span>
                                ))}
                            </div>

                            <div className="login-options">
                                <div className="remember-me">
                                    <div className="custom-checkbox-wrapper">
                                        <input type="checkbox" id="remember" name="remember" />
                                        <label htmlFor="remember" className="checkbox-label">
                                            <span className="checkbox-box">
                                                <Check className="checkmark" size={14} strokeWidth={4} />
                                            </span>
                                            <span>Remember me</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="forgot-password">
                                    <span className="forgot-link" onClick={goToForgotPassword}>
                                        Forgot password?
                                    </span>
                                </div>
                            </div>

                            <button type="submit" className="login-submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div className="btn-loading">
                                        <div className="spinner"></div>
                                        <span>Signing In...</span>
                                    </div>
                                ) : (
                                    <span>Sign In</span>
                                )}
                            </button>

                            <div className="login-divider">
                                <span>Or sign in with</span>
                            </div>

                            <div className="social-media-container">
                                <div className="login-social-btn">
                                    <img src="/photo_icons/Google.png" alt="Google" />
                                    <span>Google</span>
                                </div>
                                <div className="login-social-btn">
                                    <img src="/photo_icons/Facebook_Logo.png" alt="Facebook" />
                                    <span>Facebook</span>
                                </div>
                            </div>

                            <div className="login-footer">
                                <p className="signup-prompt">
                                    Don't have an account?{" "}
                                    <a onClick={goToSignIn} className="signup-link">
                                        Sign Up
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LogIn;

