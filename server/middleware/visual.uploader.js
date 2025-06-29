const express = require('express');
const multer = require('multer');
const cloudinary = require('./cloudnaryConfig');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    cloudinary.uploader.upload_stream(
      { folder: 'carousels' },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        res.status(200).json({ url: result.secure_url });
      }
    ).end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error });
  }
});

module.exports = router;