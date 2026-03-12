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
    const goToCe = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        if (email.trim() !== "") {
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
                    <form onSubmit={goToCe}>
                        <div className="form-group" style={{ flexDirection: "column" }}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="exampleMoath_hazeem@gmail.com"
                            />
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
