import { useNavigate } from "react-router-dom";
import "./Check_email.css";

function CheckEmail() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/log_in");
    };

    const goToVC = () => {
        navigate("/Verification_Code");
    };

    const handleResend = (e) => {
        e.preventDefault();
        // TODO: wire up resend logic
    };

    return (
        <div className="ce-page">
            <div className="ce-card">

                {/* Envelope icon badge */}
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

                {/* Header */}
                <div className="ce-header">
                    <h1 className="ce-title">Check your email</h1>
                    <p className="ce-subtitle">
                        We've sent a password reset link to your email address.
                        Please check your inbox and follow the instructions.
                    </p>
                </div>

                {/* Actions */}
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

                {/* Back to login */}
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