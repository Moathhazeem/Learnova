import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Verification_Code.css";

const RESEND_SECONDS = 30;

function VerificationCode() {
    const navigate = useNavigate();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [codeError, setCodeError] = useState("");
    const [codeSuccess, setCodeSuccess] = useState("");
    const [timer, setTimer] = useState(RESEND_SECONDS);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    /* ── Countdown timer ── */
    useEffect(() => {
        if (timer === 0) { setCanResend(true); return; }
        const id = setTimeout(() => setTimer(t => t - 1), 1000);
        return () => clearTimeout(id);
    }, [timer]);

    const handleResend = () => {
        if (!canResend) return;
        setCode(["", "", "", "", "", ""]);
        setCodeError("");
        setCodeSuccess("");
        setTimer(RESEND_SECONDS);
        setCanResend(false);
        inputRefs.current[0]?.focus();
    };

    const goToLogin = () => navigate("/log_in");
    const goToCreateNewPas = () => navigate("/Create_new_pas");

    const handleSubmit = (e) => {
        e.preventDefault();
        setCodeError("");
        setCodeSuccess("");
        const fullCode = code.join("");
        if (code.some(d => d === "")) {
            setCodeError("Please fill in all 6 digits.");
            return;
        }
        if (fullCode !== "123456") {
            setCodeError("Incorrect code. Please try again.");
            return;
        }
        setCodeSuccess("Code verified! Redirecting…");
        setTimeout(() => goToCreateNewPas(), 2000);
    };

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;
        const char = value.slice(-1);
        const newCode = [...code];
        newCode[index] = char;
        setCode(newCode);
        if (char !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (!pasted) return;
        const newCode = [...code];
        pasted.split("").forEach((ch, i) => { if (i < 6) newCode[i] = ch; });
        setCode(newCode);
        const next = Math.min(pasted.length, 5);
        inputRefs.current[next]?.focus();
    };

    /* ── Shield SVG icon ── */
    const ShieldIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );

    return (
        <div className="vc-page">
            <div className="vc-card">

                {/* Shield icon badge */}
                <div className="vc-icon-wrap">
                    <ShieldIcon />
                </div>

                {/* Header */}
                <h1 className="vc-title">Verify your identity</h1>
                <p className="vc-subtitle">
                    We've sent a 6-digit code to{" "}
                    <span className="vc-email-highlight">moathhazeem@gmail.com</span>.
                    Enter it below to continue.
                </p>

                <form onSubmit={handleSubmit} noValidate style={{ width: "100%" }}>

                    {/* OTP inputs */}
                    <div className="vc-otp-row" onPaste={handlePaste}>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                placeholder="·"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onFocus={(e) => e.target.select()}
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    {/* Error / success feedback */}
                    {codeError && (
                        <div className="vc-error-msg">
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, flexShrink: 0, stroke: "#dc2626" }}>
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            {codeError}
                        </div>
                    )}
                    {codeSuccess && (
                        <div className="vc-success-msg">
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, flexShrink: 0, stroke: "#16a34a" }}>
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            {codeSuccess}
                        </div>
                    )}

                    {/* Verify button */}
                    <button type="submit" className="vc-btn-primary">
                        Verify Code
                    </button>

                    {/* Resend */}
                    <p className="vc-resend-row">
                        Didn't receive the code?{" "}
                        {canResend ? (
                            <button type="button" className="vc-resend-btn" onClick={handleResend}>
                                Resend code
                            </button>
                        ) : (
                            <span className="vc-timer">Resend in {timer}s</span>
                        )}
                    </p>

                    {/* Back to login */}
                    <div className="vc-back-wrap">
                        <button type="button" className="vc-btn-back" onClick={goToLogin}>
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Back to Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default VerificationCode;