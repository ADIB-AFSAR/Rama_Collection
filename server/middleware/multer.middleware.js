const multer = require('multer');
const cloudinary = require('./cloudnaryConfig');
const {CloudinaryStorage} = require('multer-storage-cloudinary')

// Configure multer to use Cloudinary as the storage location
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // folder name in Cloudinary where images will be stored
    format: async (req, file) => 'jpeg', // Supports 'png', 'jpeg', etc.
    public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0], // Unique filename
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
  