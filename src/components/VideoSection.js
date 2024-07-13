import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './VidoSection.css';

function VideoSection() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="home-page">
      <div className="video-thumbnails">
        {videos.map(video => (
          <Link key={video._id} to={`/video/${video._id}`} className="video-link">
            <div className='video'>
              <div className='thumbnail'>
                <img src={video.thumbnailUrl} alt={video.title} />
              </div>
              <div className='video-footer'>
                <div className='profile'>
                  <img src={video.thumbnailUrl} alt='profile' className="profile-img"/>
                </div>
                <div className='text-info'>
                  <p className="video-title">{video.title}</p>
                  <p className='channel-name'>ChannelXYZ</p>
                  <p className='video-views'>1.4M views • 3 days ago</p>
                </div>
                <div className='more-options'>
                  <p>⋮</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VideoSection;
