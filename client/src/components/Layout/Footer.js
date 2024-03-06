import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'
const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">All Right Reserved &copy;Tapan</h1>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;