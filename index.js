const express = require('express');
const app = express();
const { config } = require('./config/');
const usersAPI = require('./routes/users');

usersAPI(app);

app.listen(config.port, () => {
  console.log(`Listening on  ${process.env.NODE_URL}:${config.port}`);
});
