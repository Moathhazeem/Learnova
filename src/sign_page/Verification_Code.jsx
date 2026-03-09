import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Verification_Code.css";
function VerificationCode() {
    const navigate = useNavigate();
    const totalPages = 4;
    const goToLogin = () => {
        navigate("/log_in")
    }
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    const handleChange = (e, index) => {
        const value = e.target.value;

        // Ensure only numbers are entered
        if (isNaN(value)) return;

        // Take only the last entered character if multiple are pasted
        const char = value.slice(-1);

        const newCode = [...code];
        newCode[index] = char;
        setCode(newCode);

        // Move to the next input box automatically
        if (char !== "" && e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    }

    const handleKeyDown = (e, index) => {
        // Move to the previous input box automatically when deleting
        if (e.key === "Backspace" && !code[index] && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
    }
    return (
        <>
            <div className="verification_code-page-container">
                <div className="verification_code-form">
                    <div className="verification_code">
                        <h1 className="title_verification_code">Verification Code</h1>
                        <p className="description_verification_code">Enter the code sent to <span className="email_pesonal">moathhazeem@gmail.com</span> to reset your password </p>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="input_VC">
                            {code.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    placeholder={index + 1}
                                    required
                                    value={data}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onFocus={(e) => e.target.select()}
                                />
                            ))}
                        </div>
                        <button type="submit" className="Send_code_VC" >Send Code</button>
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
                                    className={`dot ${index === 2 ? 'active' : ""}`}
                                ></span>
                            ))}
                        </div>
                    </form>
                </div>
                <div className="photo">
                    <img src="./photo/Send_code_photo.jfif" alt="Photo related to Verification Code" title="Photo related to Verification Code" />
                </div>
            </div>



        </>
    )
}
export default VerificationCode