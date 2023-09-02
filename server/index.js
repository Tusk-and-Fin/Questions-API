const express = require('express');
const dotenv = require('dotenv');
const router = require('./router.js');

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use('/', router);

app.get('/', (req, res) => {
  res.send('123456');
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
