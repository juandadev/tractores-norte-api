const express = require('express');
const usersMock = require('../utils/usersDB.json');

function usersAPI(app) {
  const router = express.Router();

  app.use('/api/users', router);

  router.get('/', async (req, res, next) => {
    try {
      const users = await Promise.resolve(usersMock);

      res.status(200).json({
        data: users,
        message: 'Users listed',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = usersAPI;
