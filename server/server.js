/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./models/user');

dotenv.config();

const app = express();

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to the database');
    }
  },
);

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// APIS
const productRoutes = require('./routes/product');

app.use('/api', productRoutes);

// POST - SEND DATA FROM FRONTEND TO BACK END

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listen on Port 3000');
  }
});
