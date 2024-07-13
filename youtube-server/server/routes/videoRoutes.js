const express = require('express');
const multer = require('multer');
const Video = require('../models/Video');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'videos/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const videoUploadFields = [
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
];

// Create a new video
router.post('/videos', upload.fields(videoUploadFields), async (req, res) => {
  try {
    const videoPath = req.files.video[0].path;
    const thumbnailPath = req.files.thumbnail[0].path;
    const videoUrl = `${req.protocol}://${req.get('host')}/videos/${path.basename(videoPath)}`;
    const thumbnailUrl = `${req.protocol}://${req.get('host')}/videos/${path.basename(thumbnailPath)}`;

    const video = new Video({
      title: req.body.title,
      description: req.body.description,
      videoPath: videoPath,
      thumbnailPath: thumbnailPath,
      videoUrl: videoUrl,
      thumbnailUrl: thumbnailUrl
    });
    
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ... other routes ...

module.exports = router;

  
// Get all videos
router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single video
router.get('/videos/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a video
router.put('/videos/:id', upload.fields([{ name: 'video' }, { name: 'thumbnail' }]), async (req, res) => {
  try {
    const updates = {
      title: req.body.title,
      description: req.body.description,
    };

    if (req.files.video) {
      updates.videoPath = req.files.video[0].path;
    }

    if (req.files.thumbnail) {
      updates.thumbnailPath = req.files.thumbnail[0].path;
    }

    const video = await Video.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!video) return res.status(404).json({ error: 'Video not found' });

    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a video
router.delete('/videos/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json({ message: 'Video deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
