import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react'
import "./Sign_up.css"

/**
 * ============================================================================
 * SignUp Component
 * ============================================================================
 * A modernized, centered registration interface for the Learnova application.
 * 
 * Features:
 * - Real-time client-side form validation with non-aggressive blur tracking.
 * - Dynamic password strength score calculation and visual progress indicator.
 * - Interactive popover checklist for security password requirements.
 * - Toggleable password and confirm password visibility.
 * - Simulated asynchronous submission state with loading spinner animation.
 * - Responsive layout with light and dark theme design support.
 */
function SignUp() {
    // React Router navigation hook to programmatically redirect users
    const navigate = useNavigate();

    /**
     * Redirects the user to the Log In page.
     */
    const goToLogIn = () => {
        navigate("/log_in");
    };

    // ------------------------------------------------------------------------
    // Form Input State Management
    // ------------------------------------------------------------------------
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [agree, setAgree] = useState(false);

    // Track focused and blurred fields to provide graceful, non-intrusive validation feedback
    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
        phone: false,
        agree: false
    });

    // Tracks active focus state on the password input to conditionally reveal requirement checklist
    const [passwordFocused, setPasswordFocused] = useState(false);

    // Password visibility toggles for password and confirm password fields
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form submission processing / loading state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ------------------------------------------------------------------------
    // Password Analytics & Security Helper
    // ------------------------------------------------------------------------
    /**
     * Evaluates password complexity based on length, digits, casing, and special characters.
     * 
     * @param {string} pass - Raw password string to evaluate
     * @returns {Object} Analytical summary containing score, descriptive text, theme color, and boolean requirement status.
     */
    const checkPasswordStrength = (pass) => {
        let score = 0;
        
        // Individual requirement validation flags
        const requirements = {
            length: pass.length >= 8,
            number: /[0-9]/.test(pass),
            upper: /[A-Z]/.test(pass),
            lower: /[a-z]/.test(pass),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)
        };

        // Increment score based on passed rules
        score += requirements.length ? 1 : 0;
        score += requirements.number ? 1 : 0;
        score += requirements.upper ? 1 : 0;
        score += requirements.lower ? 1 : 0;
        score += requirements.special ? 1 : 0;

        let text = "Too Short";
        let color = "#cbd5e1"; // Neutral slate grey

        // Determine descriptive rating and UI accent color
        if (pass.length > 0) {
            if (score <= 2) {
                text = "Weak";
                color = "#ef4444"; // Red
            } else if (score === 3) {
                text = "Fair";
                color = "#f97316"; // Orange
            } else if (score === 4) {
                text = "Good";
                color = "#eab308"; // Amber / Yellow
            } else if (score === 5) {
                text = "Strong";
                color = "#10b981"; // Emerald Green
            }
        }

        return { score, text, color, requirements };
    };

    // Calculate current password strength analytics dynamically
    const { 
        score: passwordStrength, 
        text: passwordStrengthText, 
        color: passwordStrengthColor, 
        requirements: passRequirements 
    } = checkPasswordStrength(password);

    // ------------------------------------------------------------------------
    // Real-Time Form Validation
    // ------------------------------------------------------------------------
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    // 1. First Name Validation
    if (!firstName.trim()) {
        errors.firstName = "First name is required.";
    } else if (firstName.trim().length < 2) {
        errors.firstName = "First name must be at least 2 characters.";
    } else if (!/^[A-Za-z\s\u0621-\u064A]+$/.test(firstName.trim())) {
        errors.firstName = "First name must contain only letters.";
    }

    // 2. Last Name Validation
    if (!lastName.trim()) {
        errors.lastName = "Last name is required.";
    } else if (lastName.trim().length < 2) {
        errors.lastName = "Last name must be at least 2 characters.";
    } else if (!/^[A-Za-z\s\u0621-\u064A]+$/.test(lastName.trim())) {
        errors.lastName = "Last name must contain only letters.";
    }

    // 3. Email Validation
    if (!email.trim()) {
        errors.email = "Email address is required.";
    } else if (!emailRegex.test(email.trim())) {
        errors.email = "Please enter a valid email address.";
    }

    // 4. Password Validation
    if (!password) {
        errors.password = "Password is required.";
    } else if (passwordStrength < 5) {
        errors.password = "Password does not meet all security guidelines.";
    }

    // 5. Confirm Password Validation
    if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
        errors.confirmPassword = "Passwords do not match.";
    }

    // 6. Phone Number Validation
    if (!phone.trim()) {
        errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phone.trim())) {
        errors.phone = "Please enter a valid phone number (10-15 digits).";
    }

    // 7. Terms & Conditions Consent Validation
    if (!agree) {
        errors.agree = "You must agree to the Terms & Conditions.";
    }

    // ------------------------------------------------------------------------
    // Interaction Handlers
    // ------------------------------------------------------------------------
    /**
     * Marks a specific field as touched when user moves focus away from it.
     */
    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    /**
     * Updates field state value and ensures touch status is recorded on user modification.
     */
    const handleInputChange = (field, value, setter) => {
        setter(value);
        if (!touched[field]) {
            setTouched(prev => ({ ...prev, [field]: true }));
        }
    };

    /**
     * Handles sign-up form submission logic.
     * Validates all inputs and simulates an API registration request.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Mark all fields touched to show validation status on all controls
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            confirmPassword: true,
            phone: true,
            agree: true
        });

        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            setIsSubmitting(true);
            // Simulate network request delay before navigating to home page
            setTimeout(() => {
                setIsSubmitting(false);
                navigate("/home");
            }, 1200);
        }
    };

    // ------------------------------------------------------------------------
    // Component Render
    // ------------------------------------------------------------------------
    return (
        <div className="sign-up-page-container">
            <div className="sign-up-form">
                <div className="signup-card">
                    {/* Header Title & Subtitle */}
                    <h1 className="title-sign-up">
                        Sign up to <span className="brand-accent">Learnova</span>
                    </h1>
                    <p className="signup-subtitle">Join thousands of students learning today.</p>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} noValidate>
                        
                        {/* First Name Field */}
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <div className={`input-wrapper ${touched.firstName && errors.firstName ? 'has-error' : touched.firstName && !errors.firstName ? 'has-success' : ''}`}>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    className="name-field-input"
                                    value={firstName}
                                    onChange={(e) => handleInputChange("firstName", e.target.value, setFirstName)}
                                    onBlur={() => handleBlur("firstName")}
                                    disabled={isSubmitting}
                                    placeholder="Moath"
                                />
                                {touched.firstName && (
                                    <span className="feedback-icon">
                                        {errors.firstName ? (
                                            <AlertCircle className="icon-err" size={22} strokeWidth={2.5} />
                                        ) : (
                                            <Check className="icon-succ" size={22} strokeWidth={3} />
                                        )}
                                    </span>
                                )}
                            </div>
                            {touched.firstName && errors.firstName && (
                                <span className="error-message">{errors.firstName}</span>
                            )}
                        </div>

                        {/* Last Name Field */}
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <div className={`input-wrapper ${touched.lastName && errors.lastName ? 'has-error' : touched.lastName && !errors.lastName ? 'has-success' : ''}`}>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    className="name-field-input"
                                    value={lastName}
                                    onChange={(e) => handleInputChange("lastName", e.target.value, setLastName)}
                                    onBlur={() => handleBlur("lastName")}
                                    disabled={isSubmitting}
                                    placeholder="Hazeem"
                                />
                                {touched.lastName && (
                                    <span className="feedback-icon">
                                        {errors.lastName ? (
                                            <AlertCircle className="icon-err" size={22} strokeWidth={2.5} />
                                        ) : (
                                            <Check className="icon-succ" size={22} strokeWidth={3} />
                                        )}
                                    </span>
                                )}
                            </div>
                            {touched.lastName && errors.lastName && (
                                <span className="error-message">{errors.lastName}</span>
                            )}
                        </div>

                        {/* Email Address Field */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className={`input-wrapper ${touched.email && errors.email ? 'has-error' : touched.email && !errors.email ? 'has-success' : ''}`}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="name-field-input"
                                    value={email}
                                    onChange={(e) => handleInputChange("email", e.target.value, setEmail)}
                                    onBlur={() => handleBlur("email")}
                                    disabled={isSubmitting}
                                    placeholder="moath@gmail.com"
                                />
                                {touched.email && (
                                    <span className="feedback-icon">
                                        {errors.email ? (
                                            <AlertCircle className="icon-err" size={22} strokeWidth={2.5} />
                                        ) : (
                                            <Check className="icon-succ" size={22} strokeWidth={3} />
                                        )}
                                    </span>
                                )}
                            </div>
                            {touched.email && errors.email && (
                                <span className="error-message">{errors.email}</span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className={`input-wrapper ${touched.password && errors.password ? 'has-error' : touched.password && !errors.password ? 'has-success' : ''}`}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="name-field-input"
                                    value={password}
                                    onChange={(e) => handleInputChange("password", e.target.value, setPassword)}
                                    onBlur={() => { handleBlur("password"); setPasswordFocused(false); }}
                                    onFocus={() => setPasswordFocused(true)}
                                    disabled={isSubmitting}
                                    placeholder="Create secure password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex="-1"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                                </button>
                            </div>

                            {/* Password Strength Progress Bar */}
                            {password.length > 0 && (
                                <div className="password-strength-container">
                                    <div className="strength-meta">
                                        <span className="strength-label">Password Strength:</span>
                                        <span className="strength-text" style={{ color: passwordStrengthColor }}>
                                            {passwordStrengthText}
                                        </span>
                                    </div>
                                    <div className="strength-bar-bg">
                                        <div
                                            className="strength-bar-fill"
                                            style={{
                                                width: `${(passwordStrength / 5) * 100}%`,
                                                backgroundColor: passwordStrengthColor
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Password Requirement Checklist Popover */}
                            {(passwordFocused || (touched.password && passwordStrength < 5)) && (
                                <div className="password-rules-popover">
                                    <p className="popover-title">Password must contain:</p>
                                    <ul className="rules-list">
                                        <li className={passRequirements.length ? "satisfied" : "unsatisfied"}>
                                            <span className="check-bullet">✓</span> At least 8 characters
                                        </li>
                                        <li className={passRequirements.number ? "satisfied" : "unsatisfied"}>
                                            <span className="check-bullet">✓</span> At least 1 number
                                        </li>
                                        <li className={passRequirements.upper ? "satisfied" : "unsatisfied"}>
                                            <span className="check-bullet">✓</span> At least 1 uppercase letter
                                        </li>
                                        <li className={passRequirements.lower ? "satisfied" : "unsatisfied"}>
                                            <span className="check-bullet">✓</span> At least 1 lowercase letter
                                        </li>
                                        <li className={passRequirements.special ? "satisfied" : "unsatisfied"}>
                                            <span className="check-bullet">✓</span> At least 1 special character
                                        </li>
                                    </ul>
                                </div>
                            )}
                            
                            {touched.password && errors.password && !passwordFocused && (
                                <span className="error-message">{errors.password}</span>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="form-group">
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <div className={`input-wrapper ${touched.confirmPassword && errors.confirmPassword ? 'has-error' : touched.confirmPassword && !errors.confirmPassword ? 'has-success' : ''}`}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm_password"
                                    name="confirm_password"
                                    className="name-field-input"
                                    value={confirmPassword}
                                    onChange={(e) => handleInputChange("confirmPassword", e.target.value, setConfirmPassword)}
                                    onBlur={() => handleBlur("confirmPassword")}
                                    disabled={isSubmitting}
                                    placeholder="Repeat secure password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    tabIndex="-1"
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                                </button>
                            </div>
                            {touched.confirmPassword && errors.confirmPassword && (
                                <span className="error-message">{errors.confirmPassword}</span>
                            )}
                            {touched.confirmPassword && !errors.confirmPassword && confirmPassword && (
                                <span className="success-message-subtle">
                                    <Check className="icon-succ-subtle" size={18} strokeWidth={3} />
                                    Passwords match
                                </span>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <div className={`input-wrapper ${touched.phone && errors.phone ? 'has-error' : touched.phone && !errors.phone ? 'has-success' : ''}`}>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="name-field-input"
                                    value={phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value, setPhone)}
                                    onBlur={() => handleBlur("phone")}
                                    disabled={isSubmitting}
                                    placeholder="0528885023"
                                />
                                {touched.phone && (
                                    <span className="feedback-icon">
                                        {errors.phone ? (
                                            <AlertCircle className="icon-err" size={22} strokeWidth={2.5} />
                                        ) : (
                                            <Check className="icon-succ" size={22} strokeWidth={3} />
                                        )}
                                    </span>
                                )}
                            </div>
                            {touched.phone && errors.phone && (
                                <span className="error-message">{errors.phone}</span>
                            )}
                        </div>

                        {/* Terms & Conditions Checkbox */}
                        <div className={`signup-options ${touched.agree && errors.agree ? 'has-error' : ''}`}>
                            <div className="custom-checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    id="confirmation"
                                    name="confirmation"
                                    checked={agree}
                                    onChange={(e) => handleInputChange("agree", e.target.checked, setAgree)}
                                    onBlur={() => handleBlur("agree")}
                                    disabled={isSubmitting}
                                />
                                <label htmlFor="confirmation" className="checkbox-label">
                                    <span className="checkbox-box">
                                        <Check className="checkmark" size={14} strokeWidth={4} />
                                    </span>
                                    <span>I agree to the <span className="terms-link">Terms & Conditions</span></span>
                                </label>
                            </div>
                            {touched.agree && errors.agree && (
                                <span className="error-message-agree">{errors.agree}</span>
                            )}
                        </div>

                        {/* Primary Submit Button */}
                        <button type="submit" className="signup-submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <div className="btn-loading">
                                    <div className="spinner"></div>
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                <span>Sign Up</span>
                            )}
                        </button>

                        {/* Divider Line */}
                        <div className="signup-divider">
                            <span>Or register with</span>
                        </div>

                        {/* Social Registration Options */}
                        <div className="social-media-container">
                            <div className="signup-social-btn" onClick={() => !isSubmitting && alert("Google signup is a mock option in this design.")}>
                                <img src="/photo_icons/Google.png" alt="Google logo" />
                                <span>Google</span>
                            </div>
                            <div className="signup-social-btn" onClick={() => !isSubmitting && alert("Facebook signup is a mock option in this design.")}>
                                <img src="/photo_icons/Facebook_Logo.png" alt="Facebook logo" />
                                <span>Facebook</span>
                            </div>
                        </div>

                        {/* Navigation Footer Prompt */}
                        <div className='signup-footer'>
                            <p className="login-prompt">
                                Already have an account? <a onClick={goToLogIn} className="login-link">Log In</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;

