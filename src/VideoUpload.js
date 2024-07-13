import React, { useState } from 'react';
import axios from 'axios';
import './VideoUpload.css'

const VideoUpload = ({ fetchVideos }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [uploadVisible, setUploadVisible] = useState(false);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);

    try {
      await axios.post('http://localhost:5000/api/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Video Uploaded Successfully !');
      toggleUpload();
      fetchVideos();
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setThumbnailFile(null);
      setThumbnailPreview(null);
      setSuccessMessage('Successfully uploaded!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const toggleUpload = () => {
    setUploadVisible(!uploadVisible);
  };

  return (
    <div className={`upload-container ${uploadVisible ? '' : 'blur-background'}`}>
      {uploadVisible && (
        <div className="upload-form">
          <div onClick={toggleUpload} className='cancel'>
            X
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <label>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            <div>
              <label>Video</label>
              <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} required />
            </div>
            <div>
              <label>Thumbnail</label>
              <input type="file" onChange={handleThumbnailChange} required />
            </div>
            {thumbnailPreview && (
              <div className="thumbnail-preview">
                <img src={thumbnailPreview} alt="Thumbnail Preview" />
              </div>
            )}
            <button type="submit">Upload Video</button>
            {successMessage && <div className="success-message">{successMessage}</div>}
          </form>
        </div>
      )}
      
        <div className="upload-button">
          <button onClick={toggleUpload}>Upload Video</button>
        </div>
     
    </div>
  );
};

export default VideoUpload;
