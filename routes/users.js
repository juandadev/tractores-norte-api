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

  router.get('/:id', async (req, res, next) => {
    try {
      const user = await Promise.resolve(usersMock[0]);

      res.status(200).json({
        data: user,
        message: 'User retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const createdUser = await Promise.resolve(usersMock[0].id);

      res.status(201).json({
        data: createdUser,
        message: 'Users created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const updatedUser = await Promise.resolve(usersMock[0]);

      res.status(200).json({
        data: updatedUser,
        message: 'User updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const deletedUser = await Promise.resolve(usersMock[0]);

      res.status(200).json({
        data: deletedUser,
        message: 'User deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = usersAPI;
