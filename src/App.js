import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import VideoPlayerPage from './components/VideoPlayerPage.js';
import VideoUpload from './VideoUpload.js';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:id" element={<VideoPlayerPage />} />
        <Route path="/upload" element={<VideoUpload />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
