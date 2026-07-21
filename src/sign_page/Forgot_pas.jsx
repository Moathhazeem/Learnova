import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forgot_pas.css";

function ForgotPassword() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/log_in");
    };
    const goToCE = () => {
        navigate("/check_email");
    };

    const [emailError, setEmailError] = useState("");
    const [emailSuccess, setEmailSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError("");
        setEmailSuccess("");
        const email = e.target.email.value;
        if (email.trim() === "") {
            setEmailError("Please fill in this field.");
        } else if (!email.trim().includes("@gmail.com")) {
            setEmailError("Email must contain @gmail.com");
        } else {
            setEmailSuccess("Email is valid");
            goToCE();
        }
    };

    return (
        <div className="fp-page">
            <div className="fp-card">
                {/* Lock icon */}
                <div className="fp-icon-wrap">
                    <svg
                        className="fp-lock-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                {/* Header */}
                <div className="fp-header">
                    <h1 className="fp-title">Forgot password?</h1>
                    <p className="fp-subtitle">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="fp-form">
                    <div className="fp-field">
                        <label htmlFor="fp-email" className="fp-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="fp-email"
                            name="email"
                            required
                            placeholder="you@gmail.com"
                            className={`fp-input${emailError ? " fp-input--error" : ""}${emailSuccess ? " fp-input--success" : ""}`}
                            autoComplete="email"
                        />
                        {emailError && (
                            <p className="fp-feedback fp-feedback--error" role="alert">
                                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {emailError}
                            </p>
                        )}
                        {emailSuccess && (
                            <p className="fp-feedback fp-feedback--success" role="status">
                                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {emailSuccess}
                            </p>
                        )}
                    </div>

                    <button type="submit" className="fp-btn-primary">
                        Send Reset Link
                    </button>

                    <div className="fp-back-wrap">
                        <button type="button" onClick={goToLogin} className="fp-btn-back">
                            <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M12 5L7 10l5 5" />
                            </svg>
                            <span>Back to login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
