import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create_new_pas.css";

/* ── Lock SVG icon ── */
const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
);

/* ── Eye icons ── */
const EyeOpen = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
const EyeClosed = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

/* ── Inline icons for strength messages ── */
const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, stroke: "#16a34a", flexShrink: 0 }}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, stroke: "#dc2626", flexShrink: 0 }}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

function CreateNewPas() {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConf, setShowConf] = useState(false);
    const [confError, setConfError] = useState("");
    const [confSuccess, setConfSuccess] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const goToLogin = () => navigate("/log_in");

    /* ── Strength rules ── */
    const rules = [
        { label: "At least 8 characters", test: (p) => p.length >= 8 },
        { label: "At least one uppercase letter (A–Z)", test: (p) => /[A-Z]/.test(p) },
        { label: "At least one lowercase letter (a–z)", test: (p) => /[a-z]/.test(p) },
        { label: "At least one number (0–9)", test: (p) => /[0-9]/.test(p) },
        { label: "At least one special character (!@#$%^&*)", test: (p) => /[!@#$%^&*]/.test(p) },
    ];

    const allPassed = rules.every((r) => r.test(password));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setConfError("");
        setConfSuccess("");

        const trimPass = password.trim();
        const trimConf = confirmPassword.trim();

        if (!allPassed) return;

        if (!trimConf) {
            setConfError("Please confirm your password.");
            return;
        }
        if (trimPass !== trimConf) {
            setConfError("Passwords do not match!");
            return;
        }

        setConfSuccess("Password updated successfully!");
        setTimeout(() => goToLogin(), 1500);
    };

    return (
        <div className="cnp-page">
            <div className="cnp-card">

                {/* Lock icon badge */}
                <div className="cnp-icon-wrap">
                    <LockIcon />
                </div>

                {/* Header */}
                <h1 className="cnp-title">Create new password</h1>
                <p className="cnp-subtitle">
                    Your new password must be different from previously used passwords.
                </p>

                <form onSubmit={handleSubmit} noValidate style={{ width: "100%" }}>

                    {/* New Password */}
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
                            <button
                                type="button"
                                className="cnp-eye-btn"
                                onClick={() => setShowPass((v) => !v)}
                                aria-label={showPass ? "Hide password" : "Show password"}
                            >
                                {showPass ? <EyeOpen /> : <EyeClosed />}
                            </button>
                        </div>

                        {/* Strength checklist — always visible once user starts typing */}
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

                    {/* Confirm Password */}
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
                            <button
                                type="button"
                                className="cnp-eye-btn"
                                onClick={() => setShowConf((v) => !v)}
                                aria-label={showConf ? "Hide password" : "Show password"}
                            >
                                {showConf ? <EyeOpen /> : <EyeClosed />}
                            </button>
                        </div>

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

                    {/* Submit */}
                    <button type="submit" className="cnp-btn-primary">
                        Reset Password
                    </button>

                    {/* Back to login */}
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
