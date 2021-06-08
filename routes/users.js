const express = require('express');
const bodyParser = require('body-parser');
const UsersService = require('../services/users');

function usersAPI(app) {
  const router = express.Router();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use('/api/users', router);

  const usersService = new UsersService();

  router.get('/', async (req, res, next) => {
    try {
      const users = await usersService.getUsers();

      res.status(200).json({
        data: users,
        message: 'Users listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const user = await usersService.getUser(id);

      res.status(200).json({
        data: user,
        message: 'User retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/verify/:id', async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    try {
      const user = await usersService.authorizeUser(id, body);

      res.status(200).json({
        data: user,
        message: 'User retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/decode/:token', async (req, res, next) => {
    const { token } = req.params;

    try {
      const decode = await usersService.decodeJWT(token);

      res.status(200).json({
        data: decode,
        message: 'JWT decoded',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    const { body } = req;

    try {
      const createdUser = await usersService.createUser(body);

      res.status(201).json({
        data: createdUser,
        message: 'User created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    try {
      const updatedUser = await usersService.updateUser(id, body);

      res.status(200).json({
        data: updatedUser,
        message: 'User updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedUser = await usersService.deleteUser(id);

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
