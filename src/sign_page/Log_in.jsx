import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Log_in.css";

function LogIn() {
    const navigate = useNavigate();

    const goToForgotPassword = () => navigate("/Forgot_pas");
    const goToSignIn = () => navigate("/sign_up");

    const [email, setEmail]             = useState("");
    const [pass, setPass]               = useState("");
    const [emailError, setEmailError]   = useState("");
    const [passError, setPassError]     = useState([]);
    const [emailSuccess, setEmailSuccess] = useState("");
    const [passSuccess, setPassSuccess]   = useState([]);
    const [serverError, setServerError]   = useState("");
    const [isLoading, setIsLoading]       = useState(false);

    // ── Client-side validation ─────────────────────────────────────────────
    const validateLocally = () => {
        let isValid = true;
        const trimmedEmail = email.trim();
        const trimmedPass  = pass.trim();

        setEmailError(""); setEmailSuccess("");
        setPassError([]);  setPassSuccess([]);
        setServerError("");

        if (!trimmedEmail) {
            setEmailError("Please fill in this field.");
            isValid = false;
        } else if (!trimmedEmail.includes("@gmail.com")) {
            setEmailError("Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailSuccess("Email is valid.");
        }

        let passErrors = [], passSuccesses = [];
        if (!trimmedPass) {
            passErrors.push("Please fill in this field.");
            isValid = false;
        } else if (trimmedPass.length < 8) {
            passErrors.push("Password must be at least 8 characters.");
            isValid = false;
        } else {
            passSuccesses.push("Password looks good.");
        }
        setPassError(passErrors);
        setPassSuccess(passSuccesses);

        return isValid;
    };

    // ── Form submit → calls Express API ───────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateLocally()) return;

        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), password: pass.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Map server errors to UI
                setServerError(data.errors?.[0] || "Login failed. Please try again.");
                setIsLoading(false);
                return;
            }

            // ✅ Success: store token & user, navigate home
            localStorage.setItem("learnova_token", data.token);
            localStorage.setItem("learnova_user", JSON.stringify(data.user));
            navigate("/home");
        } catch (err) {
            setServerError("Cannot connect to server. Make sure the backend is running.");
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="sign-in-page-container">
                <div className="sign-in">
                    <h1 className="title-sign-in">
                        Login to <label style={{ color: "#0089EA" }}>Learnova</label>
                    </h1>

                    {/* ── Server-level error banner ── */}
                    {serverError && (
                        <div className="server-error-banner">
                            <img src="/photo_icons/Inchorrect.png" alt="error" />
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        {/* ── Email ── */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="example@gmail.com"
                                disabled={isLoading}
                            />
                            {emailError && (
                                <span className="error-message" style={{ marginTop: "-30px" }}>
                                    <img src="/photo_icons/Inchorrect.png" alt="error" />
                                    {emailError}
                                </span>
                            )}
                            {emailSuccess && (
                                <span className="success-message" style={{ marginTop: "-30px" }}>
                                    <img src="/photo_icons/Chorrect.png" alt="success" />
                                    {emailSuccess}
                                </span>
                            )}
                        </div>

                        {/* ── Password ── */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                required
                                placeholder="Your password"
                                disabled={isLoading}
                            />
                            {passError.map((err, i) => (
                                <span key={i} className="error-message">
                                    <img src="/photo_icons/Inchorrect.png" alt="error" />
                                    {err}
                                </span>
                            ))}
                            {passSuccess.map((s, i) => (
                                <span key={i} className="success-message">
                                    <img src="/photo_icons/Chorrect.png" alt="success" />
                                    {s}
                                </span>
                            ))}
                        </div>

                        {/* ── Options ── */}
                        <div className="form-options">
                            <div className="form-group_remember">
                                <input type="checkbox" id="remember" name="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <div className="form-group_forgot-password">
                                <span style={{ color: "#0089EA", cursor: "pointer" }} onClick={goToForgotPassword}>
                                    Forgot password
                                </span>
                            </div>
                        </div>

                        {/* ── Submit ── */}
                        <button type="submit" className="sign-in-button" disabled={isLoading}>
                            {isLoading ? (
                                <span className="btn-loading">
                                    <span className="spinner" /> Signing in...
                                </span>
                            ) : "Sign In"}
                        </button>

                        <div className="or"><span>Or sign in with</span></div>

                        <div className="social-media-container">
                            <div className="social-button">
                                <img src="/photo_icons/Google.png" alt="logo_Google" />
                                <span>Google</span>
                            </div>
                            <div className="social-button">
                                <img src="/photo_icons/Facebook_Logo.png" alt="logo_Facebook" />
                                <span>Facebook</span>
                            </div>
                        </div>

                        <div className="DHAA">
                            <p style={{ color: "#514C4Ca5" }}>
                                Don't have an account?{" "}
                                <a onClick={goToSignIn} style={{ color: "#0089EA", fontWeight: "bold", cursor: "pointer" }}>
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="Photo">
                    <img src="/Photo/Photo_Log_in.jpg" alt="Photo related to sign in" title="Photo related to sign in" />
                </div>
            </div>
        </>
    );
}

export default LogIn;

