import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Log_in.css";

function LogIn() {
    const navigate = useNavigate();
    const goToForgotPassword = () => {
        navigate("/Forgot_pas")
    }
    const goToSignIn = () => {
        navigate("/sign_up")
    }
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");
    const [emailSuccess, setEmailSuccess] = useState("");
    const [passSuccess, setPassSuccess] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors and success messages
        setEmailError("");
        setPassError([]); // Now an array for multiple errors
        setEmailSuccess("");
        setPassSuccess([]); // Reset as array

        let isValid = true;
        const trimmedEmail = email.trim();
        const trimmedPass = pass.trim();

        // email validation
        if (trimmedEmail === "") {
            setEmailError("Please fill in this field.")
            isValid = false;
        }
        else if (!trimmedEmail.includes("@gmail.com")) {
            setEmailError("Please enter a valid email address.")
            isValid = false;
        }
        else {
            setEmailSuccess("Email is valid.")
        }

        // password validation
        let passwordErrors = [];
        let passwordSuccess = [];
        if (trimmedPass === "") {
            passwordErrors.push("Please fill in this field.");
            isValid = false;
        }
        else if (trimmedPass.length < 8) {
            passwordErrors.push("Incorrect password.");
            isValid = false;
        }
        else {
            passwordSuccess.push("Password is correct.");
        }

        setPassError(passwordErrors);
        setPassSuccess(passwordSuccess);

        if (isValid && passwordErrors.length === 0) {
            navigate("/home")
        }
    }

    return (
        <>
            <div className="sign-in-page-container">
                <div className="sign-in">
                    <h1 className="title-sign-in">Login to <label style={{ color: "#0089EA" }}>Learnova</label></h1>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="exampleMoath_hazeem@gmail.com"
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
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                required
                                placeholder="example!2##4$5^sdsds"
                            />
                            {passError.length > 0 &&
                                passError.map((err, index) => (
                                    <span key={index} className="error-message">
                                        <img src="/photo_icons/Inchorrect.png" alt="error" />
                                        {err}
                                    </span>
                                ))}

                            {passSuccess.length > 0 &&
                                passSuccess.map((success, index) => (
                                    <span key={index} className="success-message">
                                        <img src="/photo_icons/Chorrect.png" alt="success" />
                                        {success}
                                    </span>
                                ))}

                        </div>
                        <div className="form-options">
                            <div className="form-group_remember">
                                <input type="checkbox" id="remember" name="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <div className="form-group_forgot-password">
                                <span style={{ color: "#0089EA", cursor: "pointer" }} onClick={goToForgotPassword}>Forgot password</span>
                            </div>
                        </div>
                        <button type="submit" className="sign-in-button">Sign In</button>
                        <div className="or">
                            <span>Or sign in with</span>
                        </div>
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
                        <div className='DHAA'>
                            <p style={{ color: "#514C4Ca5" }}>Don't have an account? <a onClick={goToSignIn} style={{ color: "#0089EA", fontWeight: "bold", cursor: "pointer", }}>Sign Up</a></p>
                        </div>
                    </form >
                </div >
                <div className="Photo">
                    <img src="/Photo/Photo_Log_in.jpg" alt="Photo related to sign in" title="Photo related to sign in" />
                </div>
            </div>
        </>
    )
}

export default LogIn;

