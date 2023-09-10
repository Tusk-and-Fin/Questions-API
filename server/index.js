const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const router = require('./router.js');

dotenv.config();

const app = express();
const { PORT, LOADERIO } = process.env;

app.use(express.json());
app.use(morgan('dev'));
app.use('/', router);
app.get('/', (req, res) => {
  res.send('working);
});
app.get(`/${LOADERIO}/`, (req, res) => {
  res.send(`${LOADERIO}`);
});

app.listen(PORT, () => {
  console.log(`Listening at http://0.0.0.0:${PORT}`);
});
