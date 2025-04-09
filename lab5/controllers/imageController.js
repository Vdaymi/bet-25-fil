const Image = require('../models/Image');
const path = require('path');

// Функція для обробки помилок
const handleError = (res, error) => {
  console.error(error);
  res.status(500).send("Internal Server Error");
};

// Читання одного запису
const getImage = (req, res) => {
    const pageTitle = 'Image';
    Image.findById(req.params.id)
      .then(image => res.render('image', { image, pageTitle }))
      .catch(error => handleError(res, error));
  };
  

// Видалення запису
const deleteImage = (req, res) => {
  Image.findByIdAndDelete(req.params.id)
    .then(result => res.redirect('/Images'))
    .catch(error => handleError(res, error));
};

// Отримання форми редагування запису
const getEditImage = (req, res) => {
  const title = 'Edit Image';
  Image.findById(req.params.id)
    .then(image => res.render('edit-image', { image, title }))
    .catch(error => handleError(res, error));
};

// Оновлення запису
const editImage = (req, res) => {
    const { name_image, author, text } = req.body;
    const { id } = req.params;
    Image.findByIdAndUpdate(id, { name_image, author, text })
      .then(result => res.redirect(`/Images/${id}`))
      .catch(error => handleError(res, error));
  };  

// Отримання списку записів
const getImages = (req, res) => {
  const title = 'Images';
  Image.find()
    .sort({ createdAt: -1 })
    .then(Images => res.render('Images', { Images, title }))
    .catch(error => handleError(res, error));
};

// Відображення форми додавання запису
const getAddImage = (req, res) => {
  const title = 'Add Image';
  res.render('add-image', { title });
};

// Додавання нового запису
const addImage = (req, res) => {
    const { name_image, author, text } = req.body;
    const image = new Image({ name_image, author, text });
    image.save()
      .then(result => res.redirect('/Images'))
      .catch(error => handleError(res, error));
  };
  
const getImagesJson = (req, res) => {
  Image.find()
    .then(Images => res.json(Images))
    .catch(error => handleError(res, error));
};

module.exports = {
  getImage,
  deleteImage,
  getEditImage,
  editImage,
  getImages,
  getAddImage,
  addImage,
  getImagesJson
};
