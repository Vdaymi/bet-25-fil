const express = require('express');
const hbs = require('hbs');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'style')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

const cities = ['Kyiv', 'Zhytomyr', 'Lviv', 'Warszawa', 'Oslo','London', 'Dubai'];

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Вибір міста',
    cities
  });
});

app.get('/weather/:city?', async (req, res) => {
  // const city = req.params.city || req.query.city;
  // if (!city) {
  //   return res.status(400).send('Назву міста не вказано. Використовуйте /weather/{city} або /weather?city={city}');
  // }
  const city = req.params.city || req.query.city;
  const lat = req.query.lat;
  const lon = req.query.lon;
  
  let query;
  if (lat && lon) {
    query = `${lat},${lon}`;
  } else if (city) {
    query = city;
  } else {
    return res.status(400).send('Назву міста або координати не вказано. Використовуйте /weather/{city} або /weather?city={city} або /weather?lat=...&lon=...');
  }
  // API-ключ для WeatherAPI (https://www.weatherapi.com/)
  const apiKey = '70210ccf6933444087d193502251803';
  const weatherURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}&lang=uk`;

  try {
    const response = await axios.get(weatherURL);
    const weatherData = response.data;

    res.render('weather', {
      title: 'Погода',
      city: weatherData.location.name,
      temperature: weatherData.current.temp_c,
      description: weatherData.current.condition.text,
      humidity: weatherData.current.humidity,
      pressure: weatherData.current.pressure_mb,
      icon: weatherData.current.condition.icon,
      cities
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Помилка отримання даних про погоду. Перевірте назву міста або API-ключ.');
  }
});


app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Сервер запущено на порті ${port}`);
});
