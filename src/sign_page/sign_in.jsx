import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./sign_in.css";
function SignIn() {
    return (
        <>
            <div className="sign-in">
                <h1 className="title-sign-in">Sign in to<label style={{ color: "#0089EA" }}>Learnova</label></h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required placeholder="exampleMoath_hazeem@gmail.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required placeholder="!2##4$5^sdsds" />
                    </div>
                    <div className="form-options">
                        <div className="form-group_remember">
                            <input type="checkbox" id="remember" name="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <div className="form-group_forgot-password">
                            <span style={{ color: "#0089EA", cursor: "pointer" }}>Forgot password</span>
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
                    <p style={{ color: "#514C4Ca5" }}>Don't have an account? <a href="#" style={{ color: "#0089EA", fontWeight: "bold" }}>Sign Up</a></p>
                </form >
            </div >
        </>
    )
}
export default SignIn