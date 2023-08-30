const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const { PORT } = process.env;

app.get('/', (req, res) => {
  res.send('123456');
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
