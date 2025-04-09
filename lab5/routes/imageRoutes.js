const express = require('express');
const router = express.Router();
const {
  getImage,
  deleteImage,
  getEditImage,
  editImage,
  getImages,
  getAddImage,
  addImage,
  getImagesJson
} = require('../controllers/imageController');

// Отримання одного запису (читання)
router.get('/images/:id', getImage);

// Видалення запису
router.delete('/images/:id', deleteImage);

// Отримання форми редагування
router.get('/edit/:id', getEditImage);

// Оновлення запису
router.put('/edit/:id', editImage);

// Отримання списку записів
router.get('/images', getImages);

// Отримання форми додавання нового запису
router.get('/add-image', getAddImage);

// Додавання нового запису
router.post('/add-image', addImage);

// Повернення списку записів у форматі JSON
router.get('/images-json', getImagesJson);

module.exports = router;
