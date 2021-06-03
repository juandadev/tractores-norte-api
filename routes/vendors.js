const express = require('express');
const bodyParser = require('body-parser');
const VendorsService = require('../services/vendors');

function vendorsAPI(app) {
  const router = express.Router();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use('/api/vendors', router);

  const vendorsService = new VendorsService();

  router.get('/', async (req, res, next) => {
    try {
      const vendors = await vendorsService.getVendors();

      res.status(200).json({
        data: vendors,
        message: 'Vendors listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const vendor = await vendorsService.getVendor(id);

      res.status(200).json({
        data: vendor,
        message: 'Vendor retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    const { body } = req;

    try {
      const createdVendor = await vendorsService.createVendor(body);

      res.status(201).json({
        data: createdVendor,
        message: 'Vendor created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    try {
      const updatedVendor = await vendorsService.updateVendor(id, body);

      res.status(200).json({
        data: updatedVendor,
        message: 'Vendor updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedVendor = await vendorsService.deleteVendor(id);

      res.status(200).json({
        data: deletedVendor,
        message: 'Vendor deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = vendorsAPI;
