const express = require('express')
const ImageAsset = require('../../models/image.model');
const { authorization } = require('../../middleware/authorization.middleware');
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
// POST: Upload a new image
router.post('/upload',authorization, async (req, res) => {
  const { url, device, type } = req.body;
  try {
    const newImage = new ImageAsset({ url, device, type });
    await newImage.save();
    res.status(200).json(newImage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload image', err });
  }
});
router.delete('/:id', authorization, async (req, res) => {
    console.log("DELETE route hit with ID:", req.params.id);
  try {
    const bannerId = req.params.id;
    const deleted = await ImageAsset.findByIdAndDelete(bannerId);

    if (!deleted) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (err) {
    console.error('Delete banner error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// delete :delete images by their id





module.exports = router;
