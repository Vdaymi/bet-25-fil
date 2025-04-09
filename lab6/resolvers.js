const Image = require('./models/Image');

const resolvers = {
  // Запит для отримання всіх зображень
  getAllImages: async () => {
    try {
      const images = await Image.find({});
      if (!images.length) {
        throw new Error('No Images Added!');
      }
      return images;
    } catch (error) {
      throw error;
    }
  },
  // Запит для отримання окремого зображення
  getImage: async ({ _id }) => {
    try {
      const image = await Image.findById(_id);
      if (!image) {
        throw new Error('Image does not exist!');
      }
      return image;
    } catch (error) {
      throw error;
    }
  },
  // Мутація для створення нового зображення
  createImage: async ({ name_image, author, text }) => {
    try {
      const now = new Date();
      const newImage = new Image({
        name_image,
        author,
        text,
        createdAt: now,
        updatedAt: now,
      });
      const result = await newImage.save();
      return result;
    } catch (error) {
      throw error;
    }
  },
  // Мутація для оновлення зображення
  updateImage: async ({ _id, name_image, author, text }) => {
    try {
      const updatedImage = await Image.findByIdAndUpdate(
        _id,
        { name_image, author, text, updatedAt: new Date() },
        { new: true }
      );
      if (!updatedImage) {
        throw new Error('Image does not exist!');
      }
      return updatedImage;
    } catch (error) {
      throw error;
    }
  },
  // Мутація для видалення зображення
  deleteImage: async ({ _id }) => {
    try {
      const deletedImage = await Image.findByIdAndDelete(_id);
      if (!deletedImage) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = resolvers;
