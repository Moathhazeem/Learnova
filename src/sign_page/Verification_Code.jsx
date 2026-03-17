import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Verification_Code.css";
function VerificationCode() {
    const navigate = useNavigate();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const totalPages = 4;

    const goToLogin = () => {
        navigate("/log_in");
    };

    const goToCreateNewPas = () => {
        navigate("/Create_new_pas");
    };
    const [codeError, setCodeError] = useState("");
    const [codeSuccess, setCodesuccess] = useState("");
    const handleSubmit = (e) => {
        setCodeError("");
        setCodesuccess("");
        e.preventDefault();
        // Check if all code fields are filled (optional but recommended)
        const fullcode = code.join("");
        if (code.every(digit => digit === "")) {
            setCodeError("Please fill in all fields");
        }
        else if (fullcode !== "123456") {
            setCodeError("Code is incorrect");
        }
        else if (fullcode === "123456") {
            setCodesuccess("Code is correct");
            setTimeout(() => {
                goToCreateNewPas();
            }, 5000);
        }
    };

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const char = value.slice(-1);
        const newCode = [...code];
        newCode[index] = char;
        setCode(newCode);

        if (char !== "" && e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
    };

    return (
        <>
            <div className="verification_code-page-container">
                <div className="verification_code-form">
                    <div className="verification_code">
                        <h1 className="title_verification_code">Verification Code</h1>
                        <p className="description_verification_code">
                            Enter the code sent to <span className="email_pesonal">moathhazeem@gmail.com</span> to reset your password
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} noValidate>
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
                        {codeError && <p className="error-message" style={{ marginTop: "-20px", marginBottom: "30px" }}><img src="/photo_icons/Inchorrect.png" alt="error" />{codeError}</p>}
                        {codeSuccess && <p className="success-message" style={{ marginTop: "-20px", marginBottom: "30px" }}><img src="/photo_icons/Chorrect.png" alt="success" />{codeSuccess}</p>}
                        <button type="submit" className="Send_code_VC">Send Code</button>
                        <div className="BTLI">
                            <label onClick={goToLogin} style={{ cursor: "pointer" }}>
                                <img src="/photo_icons/Back.png" alt="Back to Login" />
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
                    <img src="/Photo/Send_code_photo.jfif" alt="Photo related to Verification Code" title="Photo related to Verification Code" />
                </div>
            </div>
        </>
    );
}

export default VerificationCode