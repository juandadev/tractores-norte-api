const express = require('express');
const bodyParser = require('body-parser');
const ProductsService = require('../services/products');

function productsAPI(app) {
  const router = express.Router();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use('/api/products', router);

  const productsService = new ProductsService();

  router.get('/', async (req, res, next) => {
    try {
      const products = await productsService.getProducts();

      res.status(200).json({
        data: products,
        message: 'Products listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/join', async (req, res, next) => {
    try {
      const product = await productsService.getDetailedProducts();

      res.status(200).json({
        data: product,
        message: 'Product retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const product = await productsService.getProduct(id);

      res.status(200).json({
        data: product,
        message: 'Product retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/join/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const product = await productsService.getDetailedProduct(id);

      res.status(200).json({
        data: product,
        message: 'Product retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    const { body } = req;

    try {
      const createdProduct = await productsService.createProduct(body);

      res.status(201).json({
        data: createdProduct,
        message: 'Product created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    try {
      const updatedProduct = await productsService.updateProduct(id, body);

      res.status(200).json({
        data: updatedProduct,
        message: 'Product updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedProduct = await productsService.deleteProduct(id);

      res.status(200).json({
        data: deletedProduct,
        message: 'Product deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = productsAPI;
