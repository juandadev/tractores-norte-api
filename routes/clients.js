const express = require('express');
const bodyParser = require('body-parser');
const ClientsService = require('../services/clients');

function clientsAPI(app) {
  const router = express.Router();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use('/api/clients', router);

  const clientsService = new ClientsService();

  router.get('/', async (req, res, next) => {
    try {
      const clients = await clientsService.getClients();

      res.status(200).json({
        data: clients,
        message: 'Clients listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const client = await clientsService.getClient(id);

      res.status(200).json({
        data: client,
        message: 'Client retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    const { body } = req;

    try {
      const createdClient = await clientsService.createClient(body);

      res.status(201).json({
        data: createdClient,
        message: 'Client created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    try {
      const updatedClient = await clientsService.updateClient(id, body);

      res.status(200).json({
        data: updatedClient,
        message: 'Client updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedClient = await clientsService.deleteClient(id);

      res.status(200).json({
        data: deletedClient,
        message: 'Client deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = clientsAPI;
