import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Forgot_pas.css";

function ForgotPassword() {
    const navigate = useNavigate();
    const totalPages = 4; // Added a default value or you can adjust as needed

    const goToLogin = () => {
        navigate("/log_in");
    };
    const goToCE = () => {
        navigate("/check_email");
    }
    const [emailError, setEmailError] = useState("");
    const [emailSuccess, setEmailSuccess] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError("");
        setEmailSuccess("");
        const email = e.target.email.value;
        if (email.trim() === "") {
            setEmailError("Please fill in this field.");
        }
        else if (!email.trim().includes("@gmail.com")) {
            setEmailError("Email must contain @gmail.com");
        }
        else {
            setEmailSuccess("Email is valid");
            goToCE();
        }
    }
    const location = useLocation();
    return (
        <>
            <div className="forgot-password-page-container">
                <div className="forgot-password-form">
                    <div className="forgot-password">
                        <h1 className="title-forgot-password">Forgot password</h1>
                        <p className="title-forgot-password-description">
                            Enter your email address below and we'll send you a link to reset your password
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group" style={{ flexDirection: "column" }}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="exampleMoath_hazeem@gmail.com"
                            />
                            {emailError && <p className="error-message" style={{ marginTop: "-20px", marginBottom: "30px" }}><img src="/photo_icons/Inchorrect.png" alt="error" />{emailError}</p>}
                            {emailSuccess && <p className="success-message" style={{ marginTop: "-20px", marginBottom: "30px" }}><img src="/photo_icons/Chorrect.png" alt="success" />{emailSuccess}</p>}
                            <button type="submit" className="Send-code" style={{ cursor: "pointer" }}>Send Reset Link</button>
                            <div className="BTLI">
                                <label onClick={goToLogin} style={{ cursor: "pointer" }}>
                                    <img src="/photo_icons/Back.png" alt="Back to Login" />
                                    Back to Login
                                </label>
                            </div>
                        </div>
                        <div className="dots-container">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === 0 ? 'active' : ""}`}
                                ></span>
                            ))}
                        </div>
                    </form>
                </div>
                <div className="photo">
                    <img src="/Photo/Photo_password.jpg" alt="Photo related to forgot password" title="Photo related to forgot password" />
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
