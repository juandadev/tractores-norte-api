const express = require('express');
const app = express();
const { config } = require('./config');

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/json', (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(config.port, () => {
  console.log(`Listening on  ${process.env.NODE_URL}:${config.port}`);
});
