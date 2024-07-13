import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './VideoPlayerPage.css'

function VideoPlayerPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(response.data);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    }

    fetchVideo();
  }, [id]);

  if (!video) {
    return <p>Loading...</p>;
  }

  return (
    <div className="video-player-page">
      <video autoPlay controls>
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{video.description}</p>
    </div>
  );
}

export default VideoPlayerPage;
