import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Check_email.css";
function CheckEmail() {
    const navigate = useNavigate();
    const totalPages = 4; // Added a default value or you can adjust as needed
    const goToLogin = () => {
        navigate("/log_in");
    };
    const goToVC = () => {
        navigate("/Verification_Code")
    }
    return (
        <>
            <div className="check-email-page-container">
                <div className="check-email-form">
                    <div className="check-email">
                        <h1 className="title-check-email">Check Email</h1>
                        <p className="description-check-email">
                            Please check your email inbox and click on the provided link to reset your password. If you don't receive email,
                            <a href="/resend_link" className="resend-email"> click here to resend</a>
                        </p>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <button type="submit" className="enter_code" onClick={goToVC}>Enter Code</button>
                        <div className="BTLI">
                            <label onClick={goToLogin} style={{ cursor: "pointer" }}>
                                <img src="./photo_icons/Back.png" alt="Back to Login" />
                                Back to log in
                            </label>
                        </div>
                        <div className="dots-container">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === 2 ? 'active' : ""}`}
                                ></span>
                            ))}
                        </div>
                    </form >
                </div>
                <div className="photo">
                    <img src="./photo/Check_email_photo.jfif" alt="Photo related to check email" title="Photo related to check email" />
                </div>
            </div >


        </>
    )
}
export default CheckEmail