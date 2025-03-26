import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: support@farmhub.com</li>
              <li>Phone: +254 111 653 936</li>
              <li>Address: P.O Box 45-00902</li>
              <li>Location: Kiambu, Kenya</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Information</h5>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Account</h5>
            <ul className="list-unstyled">
              <li>Sign In</li>
              <li>Register</li>
              <li>My Listings</li>
              <li>Biddings</li>
              <li>Favourites</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>FAQs</li>
              <li>Help Center</li>
              <li>Support</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0">&copy; 2025 Farm Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
