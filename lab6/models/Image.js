const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  name_image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('ImageGallery', imageSchema, 'image_gallery');
