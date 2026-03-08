import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forgot_pas.css";

function ForgotPassword() {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const totalPages = 3; // Added a default value or you can adjust as needed

    const goToLogin = () => {
        navigate("/log_in");
    };

    return (
        <>
            <div className="forgot-password-page-container">
                <div className="forgot-password-form">
                    <h1 className="title-forgot-password">Forgot password</h1>
                    <label className="title-forgot-password-description">
                        Enter your email address below and we'll send you a link to reset your password
                    </label>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group" style={{ flexDirection: "column" }}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="exampleMoath_hazeem@gmail.com"
                            />
                            <button type="submit" className="Send-code">Send code</button>
                            <label className="BTLI" onClick={goToLogin} style={{ cursor: "pointer" }}>
                                <img src="./photo_icons/Back.png" alt="Back to Login" />
                                Back to Login
                            </label>
                        </div>
                        <div className="dots-container">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${activeIndex === index ? 'active' : ""}`}
                                    onClick={() => setActiveIndex(index)}
                                ></span>
                            ))}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
