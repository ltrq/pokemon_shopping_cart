import './Home.css';
function Footer() {
    return (
        <div className="Footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <h3>About Team Rocket</h3>
                        <p>Join us on our quest to become the ultimate Pokémon trainers.<br /> Explore our selection of rare and powerful Pokémon today!</p>
                    </div>
                    <div className="footer-section">
                        <h3>Customer Service</h3>
                        <ul>
                            <li><a href="#help">Help Center</a></li>
                            <li><a href="#shipping">Shipping Information</a></li>
                            <li><a href="#returns">Return Policy</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Connect with Us</h3>
                        <ul className="social-media-links">
                            <li><a href="#facebook">Facebook</a></li>
                            <li><a href="#twitter">Twitter</a></li>
                            <li><a href="#instagram">Instagram</a></li>
                            <li><a href="#youtube">YouTube</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Policies</h3>
                        <ul>
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#terms">Terms of Service</a></li>
                            <li><a href="#cookies">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Team Rocket. All Rights Reserved.</p>
                </div>
            </div>
    );
}

export default Footer;