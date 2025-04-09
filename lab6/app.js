const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();

const schema = require('./schema');
const resolvers = require('./resolvers');

const app = express();
const PORT = 4000;

const db = "mongodb+srv://filvadym:KQ0q4lf2I9fIMQgV@cluster0.hlpqlsa.mongodb.net/GalleryDB?retryWrites=true&w=majority"; // замініть на свої дані

mongoose
  .connect(db)
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  }),
);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`App is listening port ${PORT}`);
});
