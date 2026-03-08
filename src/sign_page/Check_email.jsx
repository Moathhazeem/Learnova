import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Check_email.css";
function CheckEmail() {
    const navigate = useNavigate();
    const totalPages = 4; // Added a default value or you can adjust as needed
    const goToLogin = () => {
        navigate("/log_in");
    };
    return (
        <>
            <div className="check-email-container">
                <div className="check-email">
                    <h1 className="title-check-email">Check Email</h1>
                    <span className="description-check-email">Pleace check your email inbox  and click on the provided  link to reset  your password . If you don't receive email,<span style={{ color: "#0089EA", textDecoration: "underline", cursor: "pointer" }}> click here to resend</span></span>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>

                    <button type="submit" className="enter_code">Enter Code</button>
                    <div className="BTLI">
                        <label onClick={goToLogin} style={{ cursor: "pointer" }}>
                            <img src="./photo_icons/Back.png" alt="Back to Login" />
                            Back to Login
                        </label>
                    </div>
                    <div className="dots-container">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === 1 ? 'active' : ""}`}
                            ></span>
                        ))}
                    </div>

                </form >
                <div className="photo">
                    <img src="./photo/Photo_password.jpg" alt="Photo related to forgot password" title="Photo related to forgot password" />
                </div>
            </div >


        </>
    )
}
export default CheckEmail