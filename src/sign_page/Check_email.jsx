import { useNavigate } from "react-router-dom";
import "./Check_email.css";

/**
 * CheckEmail Component
 * 
 * Renders the "Check Your Email" notification screen displayed after a user requests
 * a password reset. Guides the user to verify their inbox, input a verification code,
 * request a resend, or return to the login screen.
 */
function CheckEmail() {
    // Hook from React Router for handling programmatic navigation between routes
    const navigate = useNavigate();

    /**
     * Navigates the user back to the Login screen.
     */
    const goToLogin = () => {
        navigate("/log_in");
    };

    /**
     * Navigates the user to the Verification Code input page.
     */
    const goToVC = () => {
        navigate("/Verification_Code");
    };

    /**
     * Prevents default anchor navigation and handles email resend request.
     * 
     * @param {React.MouseEvent<HTMLAnchorElement>} e - Click event object
     */
    const handleResend = (e) => {
        e.preventDefault();
        // TODO: Wire up API resend email logic here
    };

    return (
        /* Outer page container providing full-height centered layout */
        <div className="ce-page">
            {/* Central content card */}
            <div className="ce-card">

                {/* Decorative envelope icon badge */}
                <div className="ce-icon-wrap" aria-hidden="true">
                    <svg
                        className="ce-envelope-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                        <polyline points="22,4 12,13 2,4" />
                    </svg>
                </div>

                {/* Header title and instructional message */}
                <div className="ce-header">
                    <h1 className="ce-title">Check your email</h1>
                    <p className="ce-subtitle">
                        We've sent a password reset link to your email address.
                        Please check your inbox and follow the instructions.
                    </p>
                </div>

                {/* Primary call-to-action buttons and resend link */}
                <div className="ce-actions">
                    <button
                        type="button"
                        className="ce-btn-primary"
                        onClick={goToVC}
                    >
                        Enter Verification Code
                    </button>

                    <p className="ce-resend-text">
                        Didn't receive the email?{" "}
                        <a href="#" className="ce-resend-link" onClick={handleResend}>
                            Click to resend
                        </a>
                    </p>
                </div>

                {/* Navigation link to return to login */}
                <div className="ce-back-wrap">
                    <button type="button" onClick={goToLogin} className="ce-btn-back">
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

            </div>
        </div>
    );
}

export default CheckEmail;