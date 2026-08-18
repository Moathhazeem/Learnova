import { Link } from "react-router-dom";
import "./Footer.css";

/**
 * Footer Component
 * 
 * Renders the global footer section for the Learnova application.
 * Contains site navigation categories, mobile app store links, branding,
 * copyright information, and social media links.
 * 
 * @returns {JSX.Element} The rendered Footer component layout.
 */
function Footer() {
    return (
        <footer className="footer">
            {/* ═══════════════════════════════════════════════════════════════
                TOP SECTION: Navigation Column Lists & App Store Downloads
               ═══════════════════════════════════════════════════════════════ */}
            <div className="footer-top">
                
                {/* Main Product / Core Navigation Links */}
                <ul>
                    <li className="list_title">Learnova</li>
                    <li><Link to="/Explore">Explore Courses</Link></li>
                    <li><Link to="/My Learning">My Learning</Link></li>
                    <li><Link to="/Teacher">Teachers</Link></li>
                    <li><Link to="/Contact_us">Contact Us</Link></li>
                    <li><Link to="/About_us">About Us</Link></li>   
                </ul>

                {/* Community & Support Links */}
                <ul>
                    <li className="list_title">Community</li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Partners</a></li>
                    <li><a href="#">Help Center</a></li>
                </ul>

                {/* Legal & Policy Links */}
                <ul>
                    <li className="list_title">Legal</li>
                    <li><Link to="/Setting/Privacy">Privacy Policy</Link></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Cookie Settings</a></li>
                </ul>

                {/* Mobile Application Store Download Buttons */}
                <ul className="store-buttons">
                    {/* iOS App Store Link */}
                    <li className="store-button_1">
                        <a href="#" className="store-button">
                            <img src="/photo_icons/Apple_store.png" alt="Apple Store" />
                            <div className="button-text">
                                <span className="top-text">Download on the</span>
                                <span className="bottom-text">App Store</span>
                            </div>
                        </a>
                    </li>

                    {/* Google Play Store Link */}
                    <li className="store-button_2">
                        <a href="#" className="store-button">
                            <img src="/photo_icons/google-play.png" alt="Google Play" />
                            <div className="button-text">
                                <span className="top-text">GET IT ON</span>
                                <span className="bottom-text">Google Play</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                BOTTOM SECTION: Brand Logo, Copyright & Social Media Links
               ═══════════════════════════════════════════════════════════════ */}
            <div className="footer-bottom">
                
                {/* Brand Logo & Copyright Information */}
                <div className="footer-brand-section">
                    <div className="title_footer">Learnova</div>
                    <div className="documentation">Copyright © 2025 Learnova Inc. All right reserved</div>
                </div>

                {/* Social Media Link Icons */}
                <ul className="social-icons">
                    <li><a href="#"><img src="/photo_icons/facebook.png" alt="Facebook icon" /></a></li>
                    <li><a href="#"><img src="/photo_icons/instagram.png" alt="Instagram icon" /></a></li>
                    <li><a href="#"><img src="/photo_icons/twitter.png" alt="Twitter icon" /></a></li>
                    <li><a href="#"><img src="/photo_icons/linkedin.png" alt="Linkedin icon" /></a></li>
                    <li><a href="#"><img src="/photo_icons/youtube.png" alt="Youtube icon" /></a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;