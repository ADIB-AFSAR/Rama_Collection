const express = require('express')
const ImageAsset = require('../../models/image.model');

const router = express.Router();

// GET: Get all uploaded images
router.get('/all', async (req, res) => {
  try {
    const images = await ImageAsset.find();
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all images', err });
  }
});
// POST: Upload a new image
router.post('/upload', async (req, res) => {
  const { url, device, type } = req.body;
  try {
    const newImage = new ImageAsset({ url, device, type });
    await newImage.save();
    res.status(200).json(newImage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload image', err });
  }
});

// GET: Get images by type and device
router.get('/:type/:device', async (req, res) => {
  const { type, device } = req.params;
  try {
    const images = await ImageAsset.find({ type, device });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images', err });
  }
});



module.exports = router;
