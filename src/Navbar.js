import React from 'react';
import logo from './logo.svg';
import './App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <h1 className="logo-text">Terribly Tiny Tales</h1>
      </div>
      <ul className="navbar-menu">
        <li>Equbal</li>
        <li>Fahmi</li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
