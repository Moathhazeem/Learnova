import { useState } from "react";
import "./Footer.css";
function Footer() {
    return (
        <>
            <div className="footer">
                <div className="footer-top">
                    <ul>
                        <li className="list_title">Learnova</li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">What We Offer</a></li>
                        <li><a href="#">Leadership</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Catalog</a></li>
                    </ul>
                    <ul>
                        <li className="list_title">Community</li>
                        <li><a href="#">Learners</a></li>
                        <li><a href="#">Partners</a></li>
                        <li><a href="#">Beta Testers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">The Coursera Podcast</a></li>
                    </ul>
                    <ul>
                        <li className="list_title">More</li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Investors</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Help</a></li>
                    </ul>
                    <ul className="store-buttons">
                        <li>
                            <a href="#" className="store-button">
                                <img src="./photo_icons/Apple_store.png" alt="Apple Store" />
                                <div className="button-text">
                                    <span className="top-text">Download on the</span>
                                    <span className="bottom-text">App Store</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="store-button">
                                <img src="./photo_icons/google_play.png" alt="Google Play" />
                                <div className="button-text">
                                    <span className="top-text">GET IT ON</span>
                                    <span className="bottom-text">Google Play</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer-bottom">
                    <div className="footer-brand-section">
                        <div className="title_footer">Learnova</div>
                        <div className="documentation">Copyright © 2025 Learnova Inc. All right reserved</div>
                    </div>

                    <ul className="social-icons">
                        <li><a href="#"><img src="./photo_icons/facebook.png" alt="Facebook icon" /></a></li>
                        <li><a href="#"><img src="./photo_icons/instagram.png" alt="Instagram icon" /></a></li>
                        <li><a href="#"><img src="./photo_icons/twitter.png" alt="Twitter icon" /></a></li>
                        <li><a href="#"><img src="./photo_icons/linkedin.png" alt="Linkedin icon" /></a></li>
                        <li><a href="#"><img src="./photo_icons/youtube.png" alt="Youtube icon" /></a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Footer;