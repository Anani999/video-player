import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import Navbar from './Navbar';
import SidePanel from './SidePanel';
import VideoSection from './VideoSection';

function HomePage() {
  
  return (
    <>
    <div className='body'>
        <SidePanel/>
        <VideoSection/>
    </div>
    </>
  );
}

export default HomePage;
