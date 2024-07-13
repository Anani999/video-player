import React from 'react';
import './SidePanel.css';

const SidePanel = () => {
  return (
    <div className="side-panel">
      <div className="side-item">Home</div>
      <div className="side-item">Shorts</div>
      <div className="side-item">Subscriptions</div>
      <div className="side-item">Library</div>
      <div className="side-item">History</div>
      <div className="side-item">Watch Later</div>
      <div className="side-item">Liked Videos</div>
    </div>
  );
};

export default SidePanel;
