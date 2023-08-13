import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="row">
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Our Office</a>
            </li>
            <li>
              <a href="#">Other</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Get Help</h4>
          <ul>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
            <li>
              <a href="#">frequently asked questions</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          {/* The Contact Us link */}
          <h4>Contact Us</h4>
          <ul>
            <li>
              <a href="contactUs/contactUs.html">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="social-links">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <p>© 2023 goldOurs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
