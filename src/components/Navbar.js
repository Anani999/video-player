import React from 'react';
import './Navbar.css';
import VideoUpload from '../VideoUpload';

const Navbar = () => {
  return (
    <>    

    <div className="navbar">
      <div className="logo">YouTube</div>
      <input type="text" className="search-bar" placeholder="Search" />
      <div className="nav-icons">
      <VideoUpload/>
      </div>
    </div>
    </>
  );
};

export default Navbar;
