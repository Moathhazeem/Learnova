import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create_new_pas.css";

/**
 * LockIcon Component
 * Renders a stylized lock SVG icon used in the header badge.
 */
const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
);

/**
 * EyeOpen Component
 * SVG icon representing an open eye (indicates visible password text).
 */
const EyeOpen = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

/**
 * EyeClosed Component
 * SVG icon representing a slashed eye (indicates hidden password text).
 */
const EyeClosed = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

/**
 * CheckIcon Component
 * Green checkmark SVG icon used in the password strength checklist when a rule is satisfied.
 */
const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, stroke: "#16a34a", flexShrink: 0 }}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

/**
 * XIcon Component
 * Red 'X' SVG icon used in the password strength checklist when a rule is not yet satisfied.
 */
const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, stroke: "#dc2626", flexShrink: 0 }}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

/**
 * CreateNewPas Component
 * Renders the password reset form where users can set a new password,
 * validate password strength via live checklist feedback, and confirm their new password.
 */
function CreateNewPas() {
    // Router navigation hook
    const navigate = useNavigate();

    // ── State Management ──
    // Stores the input value for the new password field
    const [password, setPassword] = useState("");
    // Stores the input value for the confirm password field
    const [confirmPassword, setConfirmPassword] = useState("");

    // Toggle visibility for new password input (false = masked/dots, true = visible text)
    const [showPass, setShowPass] = useState(false);
    // Toggle visibility for confirm password input (false = masked/dots, true = visible text)
    const [showConf, setShowConf] = useState(false);

    // Feedback message states for confirmation validation
    const [confError, setConfError] = useState("");
    const [confSuccess, setConfSuccess] = useState("");

    // Tracks if the user has attempted form submission
    const [submitted, setSubmitted] = useState(false);

    /**
     * Navigates the user back to the login page.
     */
    const goToLogin = () => navigate("/log_in");

    // ── Password Strength Rules ──
    // List of validation rules for calculating password complexity requirements
    const rules = [
        { label: "At least 8 characters", test: (p) => p.length >= 8 },
        { label: "At least one uppercase letter (A–Z)", test: (p) => /[A-Z]/.test(p) },
        { label: "At least one lowercase letter (a–z)", test: (p) => /[a-z]/.test(p) },
        { label: "At least one number (0–9)", test: (p) => /[0-9]/.test(p) },
        { label: "At least one special character (!@#$%^&*)", test: (p) => /[!@#$%^&*]/.test(p) },
    ];

    // Boolean check evaluating whether all password strength rules pass
    const allPassed = rules.every((r) => r.test(password));

    /**
     * Handles password submission and validation.
     * @param {React.FormEvent} e - Form submission event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setConfError("");
        setConfSuccess("");

        const trimPass = password.trim();
        const trimConf = confirmPassword.trim();

        // Halt processing if password strength criteria are not fully met
        if (!allPassed) return;

        // Ensure confirm password input is not empty
        if (!trimConf) {
            setConfError("Please confirm your password.");
            return;
        }

        // Check if new password matches confirm password
        if (trimPass !== trimConf) {
            setConfError("Passwords do not match!");
            return;
        }

        // On successful validation, display success feedback and redirect to login after delay
        setConfSuccess("Password updated successfully!");
        setTimeout(() => goToLogin(), 1500);
    };

    return (
        <div className="cnp-page">
            <div className="cnp-card">

                {/* Header Icon Badge */}
                <div className="cnp-icon-wrap">
                    <LockIcon />
                </div>

                {/* Form Title & Subtitle */}
                <h1 className="cnp-title">Create new password</h1>
                <p className="cnp-subtitle">
                    Your new password must be different from previously used passwords.
                </p>

                {/* Password Reset Form */}
                <form onSubmit={handleSubmit} noValidate style={{ width: "100%" }}>

                    {/* New Password Input Group */}
                    <div className="cnp-field-group">
                        <label className="cnp-label" htmlFor="cnp-new-pass">New Password</label>
                        <div className="cnp-input-wrap">
                            <input
                                id="cnp-new-pass"
                                type={showPass ? "text" : "password"}
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`cnp-input ${submitted && !allPassed ? "cnp-input--error" : ""}`}
                                autoComplete="new-password"
                            />
                            {/* Toggle password visibility button */}
                            <button
                                type="button"
                                className="cnp-eye-btn"
                                onClick={() => setShowPass((v) => !v)}
                                aria-label={showPass ? "Hide password" : "Show password"}
                            >
                                {showPass ? <EyeOpen /> : <EyeClosed />}
                            </button>
                        </div>

                        {/* Password strength checklist displayed when typing starts or after submit attempt */}
                        {(password.length > 0 || submitted) && (
                            <ul className="cnp-strength-list">
                                {rules.map((rule) => {
                                    const ok = rule.test(password);
                                    return (
                                        <li key={rule.label} className={`cnp-strength-item ${ok ? "cnp-strength-item--ok" : "cnp-strength-item--fail"}`}>
                                            {ok ? <CheckIcon /> : <XIcon />}
                                            {rule.label}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* Confirm Password Input Group */}
                    <div className="cnp-field-group">
                        <label className="cnp-label" htmlFor="cnp-conf-pass">Confirm Password</label>
                        <div className="cnp-input-wrap">
                            <input
                                id="cnp-conf-pass"
                                type={showConf ? "text" : "password"}
                                placeholder="Repeat new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`cnp-input ${confError ? "cnp-input--error" : ""} ${confSuccess ? "cnp-input--success" : ""}`}
                                autoComplete="new-password"
                            />
                            {/* Toggle confirm password visibility button */}
                            <button
                                type="button"
                                className="cnp-eye-btn"
                                onClick={() => setShowConf((v) => !v)}
                                aria-label={showConf ? "Hide password" : "Show password"}
                            >
                                {showConf ? <EyeOpen /> : <EyeClosed />}
                            </button>
                        </div>

                        {/* Error Feedback Message */}
                        {confError && (
                            <div className="cnp-msg cnp-msg--error">
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, flexShrink: 0, stroke: "#dc2626" }}>
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                </svg>
                                {confError}
                            </div>
                        )}
                        {/* Success Feedback Message */}
                        {confSuccess && (
                            <div className="cnp-msg cnp-msg--success">
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, flexShrink: 0, stroke: "#16a34a" }}>
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                {confSuccess}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="cnp-btn-primary">
                        Reset Password
                    </button>

                    {/* Navigation back to login page */}
                    <div className="cnp-back-wrap">
                        <button type="button" className="cnp-btn-back" onClick={goToLogin}>
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Back to Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default CreateNewPas;

