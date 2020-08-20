/* eslint-disable linebreak-style */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('mongodb is connected');
}).catch((error) => {
  console.log('mongodb not connected');
  console.log(error);
});


const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);

// Error handler
app.use(middlewares.errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
