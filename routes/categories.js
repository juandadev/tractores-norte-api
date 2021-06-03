const express = require('express');
const bodyParser = require('body-parser');
const CategoriesService = require('../services/categories');

function categoriesAPI(app) {
  const router = express.Router();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use('/api/categories', router);

  const categoriesService = new CategoriesService();

  router.get('/', async (req, res, next) => {
    try {
      const categories = await categoriesService.getCategories();

      res.status(200).json({
        data: categories,
        message: 'Categories listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const category = await categoriesService.getCategory(id);

      res.status(200).json({
        data: category,
        message: 'Category retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    const { body } = req;

    try {
      const createdCategory = await categoriesService.createCategory(body);

      res.status(201).json({
        data: createdCategory,
        message: 'Category created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    try {
      const updatedCategory = await categoriesService.updateCategory(id, body);

      res.status(200).json({
        data: updatedCategory,
        message: 'Category updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedCategory = await categoriesService.deleteCategory(id);

      res.status(200).json({
        data: deletedCategory,
        message: 'Category deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = categoriesAPI;
