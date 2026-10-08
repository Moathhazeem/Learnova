import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import "./Log_in.css";

/**
 * LogIn Component
 * 
 * Manages user authentication input for the Learnova platform.
 * Handles live validation, password visibility toggling, error/success feedback,
 * submission state, and routing to related authentication pages.
 */
function LogIn() {
    const handleFacebookLogin = async (response) => {
        try {
            console.log('Facebook response:', response);

            if (!response.accessToken) {
                console.error('No Facebook access token');
                return;
            }

            const res = await axios.post(
                'http://localhost:5000/api/auth/facebook',
                {
                    accessToken: response.accessToken
                }
            );

            localStorage.setItem('token', res.data.token);
            localStorage.setItem(
                'user',
                JSON.stringify(res.data.user)
            );

            navigate('/home');

        } catch (error) {
            console.error(
                'Facebook Login Error:',
                error.response?.data || error.message
            );
        }
    };
    const handleGoogleLogin = async (response) => {
        try {
            const res = await axios.post(
                'http://localhost:5000/api/auth/google',
                {
                    idToken: response.credential,
                }
            );
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/home');
        } catch (error) {
            console.error('Google login error:', error.response?.data || error.message);
        }
    };

    // React Router navigation hook for programmatic page redirects
    const navigate = useNavigate();

    /**
     * Navigation helper functions
     */
    // Navigates the user to the Forgot Password page
    const goToForgotPassword = () => navigate("/Forgot_pas");

    // Navigates the user to the Sign Up page
    const goToSignIn = () => navigate("/sign_up");

    /**
     * Component State Management
     */
    // Stores the current user email input value
    const [email, setEmail] = useState("");

    // Stores the current user password input value
    const [pass, setPass] = useState("");

    // Controls whether the password field displays plain text or masked bullets
    const [showPassword, setShowPassword] = useState(false);

    // Controls remember me checkbox
    const [rememberMe, setRememberMe] = useState(false);

    // Stores error message for the email input field
    const [emailError, setEmailError] = useState("");

    // Stores error messages array for the password input field
    const [passError, setPassError] = useState([]);

    // Stores success message for the email input field
    const [emailSuccess, setEmailSuccess] = useState("");

    // Stores success messages array for the password input field
    const [passSuccess, setPassSuccess] = useState([]);

    // Server-side error message display
    const [serverError, setServerError] = useState("");

    // Tracks submission loading state to disable buttons and show loading spinner
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Tracks whether input fields have been interacted with (focused & blurred)
    const [touched, setTouched] = useState({ email: false, password: false });

    /**
     * Validates input values based on field rules.
     * 
     * @param {string} name - The field identifier ("email" or "password").
     * @param {string} value - The input text to validate.
     * @returns {string} An error message string if invalid, or empty string if valid.
     */
    const validateField = (name, value) => {
        if (name === "email") {
            if (!value.trim()) return "Please fill in this field.";
            return "";
        }
        if (name === "password") {
            if (!value.trim()) return "Please fill in this field.";
            if (value.trim().length < 8) return "Password must be at least 8 characters.";
            return "";
        }
        return "";
    };

    /**
     * Handles live updates on input change. Re-validates if the field was already touched.
     * 
     * @param {string} name - The field identifier ("email" or "password").
     * @param {string} value - The new value entered by the user.
     * @param {Function} setter - State setter function for the field value.
     */
    const handleInputChange = (name, value, setter) => {
        setter(value);
        if (serverError) setServerError("");
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

    /**
     * Marks field as touched when focus leaves the input, then evaluates validation states.
     * 
     * @param {string} name - The field identifier ("email" or "password").
     */
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

    /**
     * Handles login form submission. Validates all fields and sends credentials to backend API.
     * 
     * @param {Event} e - Form submission event object.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        // Mark all fields as touched to trigger full visual error feedback
        setTouched({ email: true, password: true });

        // Run validation rules on current input states
        const eError = validateField("email", email);
        const pError = validateField("password", pass);

        setEmailError(eError);
        setPassError(pError ? [pError] : []);

        // Proceed if no validation errors exist
        if (!eError && !pError) {
            setIsSubmitting(true);
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    email: email.trim().toLowerCase(),
                    password: pass,
                    rememberMe,
                });

                const { token, user } = response.data;
                if (rememberMe) {
                    localStorage.setItem('token', token);
                } else {
                    sessionStorage.setItem('token', token);
                }
                localStorage.setItem('user', JSON.stringify(user));

                navigate('/home');
            } catch (err) {
                if (err.response?.data?.message) {
                    setServerError(err.response.data.message);
                } else {
                    setServerError('An error occurred. Please try again later.');
                }
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <>
            {/* Outer Page Container */}
            <div className="login-page-container">
                {/* Card Layout Wrapper */}
                <div className="login-card-wrapper">
                    <div className="login-card">
                        {/* Header Title with Brand Highlight */}
                        <h1 className="title-login">
                            Login to <span className="brand-accent">Learnova</span>
                        </h1>
                        <p className="login-subtitle">Welcome back! Please enter your details.</p>

                        {/* Global Server Error Banner */}
                        {serverError && (
                            <div className="server-alert server-error" style={{
                                color: '#ef4444',
                                backgroundColor: '#fef2f2',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <AlertCircle size={18} />
                                <span>{serverError}</span>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} noValidate>
                            {/* Email Input Field Group */}
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
                                    {/* Feedback Icon Status Indicator */}
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
                                {/* Validation Error Message Display */}
                                {touched.email && emailError && (
                                    <span className="error-message">
                                        {emailError}
                                    </span>
                                )}
                            </div>

                            {/* Password Input Field Group */}
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
                                    {/* Password Visibility Toggle Button */}
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
                                {/* Validation Error Message Display */}
                                {touched.password && passError.map((err, i) => (
                                    <span key={i} className="error-message">
                                        {err}
                                    </span>
                                ))}
                            </div>

                            {/* Options Row (Remember Me & Forgot Password Link) */}
                            <div className="login-options">
                                <div className="remember-me">
                                    <div className="custom-checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            name="remember"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
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

                            {/* Submit Button */}
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

                            {/* Visual Divider */}
                            <div className="login-divider">
                                <span>Or sign in with</span>
                            </div>

                            {/* Social Authentication Actions */}

                            <div className="social-media-container">
                                {/*
                                    < div className="login-social-btn" onClick={handleGoogleLogin}>
                                <img src="/photo_icons/Google.png" alt="Google" />
                                <span>Google</span>
                            </div>
                                    */}

                                {/* 
                                <div className="login-social-btn" onClick={handleFacebookLogin}>
                                    <img src="/photo_icons/Facebook_Logo.png" alt="Facebook" />
                                    <span>Facebook</span>
                                </div>
                                */}
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() => {
                                        console.error('Google Login Failed')
                                    }}
                                    render={({ onClick }) => (
                                        <div
                                            className="login-social-btn"
                                            onClick={onClick}
                                        >
                                            <img
                                                src="/photo_icons/Google.png"
                                                alt="Google"
                                            />
                                            <span>Google</span>
                                        </div>
                                    )}
                                />
                                <FacebookLogin
                                    appId={import.meta.env.VITE_FACEBOOK_CLIENT_ID}
                                    onSuccess={handleFacebookLogin}
                                    onFail={(error) => {
                                        console.error('Facebook Login Failed:', error);
                                    }}
                                    render={({ onClick }) => (
                                        <div
                                            className="login-social-btn"
                                            onClick={onClick}
                                        >
                                            <img
                                                src="/photo_icons/Facebook_Logo.png"
                                                alt="Facebook"
                                            />
                                            <span>Facebook</span>
                                        </div>
                                    )}
                                />

                            </div>
                            {/* Form Footer / Registration Redirection Prompt */}
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
                </div >
            </div >
        </>
    );
}

export default LogIn;



