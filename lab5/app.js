const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const imageRoutes = require('./routes/imageRoutes');
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'style')));

// Налаштування шаблонізатора EJS та папки з представленнями (views)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware для розбору даних з форм
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Підключення до MongoDB
const db = "mongodb+srv://filvadym:KQ0q4lf2I9fIMQgV@cluster0.hlpqlsa.mongodb.net/GalleryDB?retryWrites=true&w=majority"; // замініть на свої дані
mongoose
  .connect(db)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

// Використання роутів
app.use(imageRoutes);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening on port ${PORT}`);
});
