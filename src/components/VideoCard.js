import React from 'react';

const VideoCard = ({ thumbnail, title, views, time }) => {
  return (
    <div className="video-card">
      <img src={thumbnail} alt="Video Thumbnail" />
      <div className="video-info">
        <div className="video-title">{title}</div>
        <div className="video-details">{views} views • {time}</div>
      </div>
    </div>
  );
};

export default VideoCard;
                              