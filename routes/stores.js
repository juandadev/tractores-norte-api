const express = require('express');
const bodyParser = require('body-parser');
const StoresService = require('../services/stores');

function storesAPI(app) {
  const router = express.Router();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use('/api/stores', router);

  const storesService = new StoresService();

  router.get('/', async (req, res, next) => {
    try {
      const stores = await storesService.getStores();

      res.status(200).json({
        data: stores,
        message: 'stores listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const store = await storesService.getStore(id);

      res.status(200).json({
        data: store,
        message: 'store retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    const { body } = req;

    try {
      const createdStore = await storesService.createStore(body);

      res.status(201).json({
        data: createdStore,
        message: 'store created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    try {
      const updatedStore = await storesService.updateStore(id, body);

      res.status(200).json({
        data: updatedStore,
        message: 'store updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedStore = await storesService.deleteStore(id);

      res.status(200).json({
        data: deletedStore,
        message: 'store deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = storesAPI;
