import React from 'react';
import PropTypes from 'prop-types';

const VideoList = ({ videos }) => {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <div key={video._id} className="video-item">
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <img src={video.thumbnailUrl} alt={video.title} width="200" />
          <video width="320" height="240" controls>
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

VideoList.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      thumbnailUrl: PropTypes.string.isRequired,
      videoUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VideoList;
