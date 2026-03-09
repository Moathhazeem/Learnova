import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Log_in.css";
import ForgotPassword from './Forgot_pas';
function LogIn() {
    const navigate = useNavigate();
    const goToForgotPassword = () => {
        navigate("/Forgot_pas")
    }
    const goToSignIn = () => {
        navigate("/Sign_up")
    }
    return (
        <>
            <div className="sign-in-page-container">
                <div className="sign-in">
                    <h1 className="title-sign-in">Login to<label style={{ color: "#0089EA" }}>Learnova</label></h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required placeholder="exampleMoath_hazeem@gmail.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required placeholder="example!2##4$5^sdsds" />
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
                            <span htmlFor="or">Or sign in with</span>
                        </div>
                        <div className="social-media-container">
                            <div className="social-button">
                                <img src="./photo_icons/Google.png" alt="logo_Google" />
                                <span>Google</span>
                            </div>
                            <div className="social-button">
                                <img src="./photo_icons/Facebook_Logo.png" alt="logo_Facebook" />
                                <span>Facebook</span>
                            </div>
                        </div>
                        <div className='DHAA'>
                            <p style={{ color: "#514C4Ca5" }}>Don't have an account? <a onClick={goToSignIn} style={{ color: "#0089EA", fontWeight: "bold", cursor: "pointer", }}>Sign Up</a></p>
                        </div>
                    </form >
                </div >
                <div className="Photo">
                    <img src="./photo/Photo_Log_in.jpg" alt="Photo related to sign in" title="Photo related to sign in" />
                </div>
            </div>
        </>
    )
}

export default LogIn
