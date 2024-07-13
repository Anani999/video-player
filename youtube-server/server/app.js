const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const videoRoutes = require('./routes/videoRoutes');
const path = require('path');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(cors());
mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());
app.use('/api', videoRoutes);


// Serve static files from the 'videos' directory
app.use('/videos', express.static(path.join(__dirname, '../videos')));


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
