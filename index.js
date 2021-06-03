const express = require('express');
const cors = require('cors');
const app = express();
const { config } = require('./config/');
const usersAPI = require('./routes/users');
const productsAPI = require('./routes/products');
const vendorsAPI = require('./routes/vendors');
const clientsAPI = require('./routes/clients');
const categoriesAPI = require('./routes/categories');
const storesAPI = require('./routes/stores');

app.use(cors);

usersAPI(app);
productsAPI(app);
vendorsAPI(app);
clientsAPI(app);
categoriesAPI(app);
storesAPI(app);

app.listen(config.port, () => {
  console.log(`Listening on  ${process.env.NODE_URL}:${config.port}`);
});
