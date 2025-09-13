import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Terms.css'; // Use the same style file for consistency

const Terms = () => {
    return (
        <div className="more-container">
            <h1>Terms & Conditions</h1>
            <div className="terms-content">
                <p>
                    Welcome to our app! By accessing or using our platform, you agree to be bound by these terms and conditions.
                    Please read them carefully.
                </p>

                <div>
                    <h3>1. Use of Service</h3>
                    <p>
                        You agree to use our services responsibly and not engage in any harmful or illegal activities while using the platform.
                    </p>
                </div>

                <div>
                    <h3>2. Privacy</h3>
                    <p>
                        Your privacy is important to us. We collect certain information to improve user experience. Please review our Privacy Policy for details.
                    </p>
                </div>

                <div>
                    <h3>3. User Conduct</h3>
                    <p>
                        You are responsible for the content you share. Any misuse of the platform may lead to suspension or banning of your account.
                    </p>
                </div>

                <div>
                    <h3>4. Changes to Terms</h3>
                    <p>
                        We reserve the right to update or modify these terms at any time. Continued use of the service implies acceptance of such changes.
                    </p>
                </div>

                <div>
                    <h3>5. Contact Us</h3>
                    <p>
                        If you have any questions or concerns regarding these terms, feel free to contact our support team.
                    </p>
                </div>

                <Link to="/user/more" className="back-link">← Back to More</Link>
            </div>
        </div>
    );
};

export default Terms;
