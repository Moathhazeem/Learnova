import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import "./Sign_up.css"

function SignUp() {
    return (
        <>
            <div className="sign-up-page-container">
                <div className="sign-up-form">
                    <h1 className="title-sign-up">Sign up to <label style={{ color: "#0089EA" }}>Learnova</label></h1>
                    <form>
                        <div className="fullName">
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text" id="first_name" name="first_name" required placeholder="example Moath" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text" id="last_name" name="last_name" required placeholder="example Hazeem" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required placeholder="example Moath_hazeem665@gmail.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required placeholder="example 4645456qwwe#$" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input type="password" id="confirm_password" name="confirm_password" required placeholder="example 4645456qwwe#$" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" required placeholder="example 0528885023" />
                        </div>
                        <div className="form-options">
                            <div className="form-group_remember">
                                <input type="checkbox" id="confirmation" name="confirmation" required />
                                <label htmlFor="confirmation">I agree to the <span style={{ color: "#0089EA" }}>Terms & Condition</span></label>
                            </div>
                        </div>
                        <button type="submit" className="sign-in-button">Sign Up</button>
                        <div className="or">
                            <span htmlFor="or">Or register with</span>
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
                            <p style={{ color: "#514C4Ca5" }}>Already have an account ? <a href="/log_in" style={{ color: "#0089EA", fontWeight: "bold" }}>Log In</a></p>
                        </div>
                    </form>
                </div>
                <div className="Photo">
                    <img src="./photo/Photo_Sign_up.jpg" alt="Photo related to sign up" title="Photo related to sign up" />
                </div>
            </div>
        </>
    )
}

export default SignUp
