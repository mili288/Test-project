import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/')
  }
  function handle() {
    navigate('/about')
  }
  return (
    <div className="navbar">
      <div className="logo">Logo</div>
      <ul className="nav-links">
        <li className="nav-link" onClick={handleClick}>Home</li>
        <li className="nav-link" onClick={handle}>About</li>
        <li className="nav-link">Services</li>
        <li className="nav-link">Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
