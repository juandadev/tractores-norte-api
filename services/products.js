const db = require('./db');

class ProductsService {
  async getProducts() {
    const products = await Promise.resolve(
      db.query('SELECT * FROM products', [])
    );

    return products || [];
  }

  async getProduct(id) {
    const product = await Promise.resolve(
      db.query('SELECT * FROM products WHERE id_product=?', [id])
    );

    return product;
  }

  async createProduct(data) {
    const createdProduct = await Promise.resolve(
      db.query(
        'INSERT INTO products (name_product, key_product, fk_category_id, fk_store_id, stock_product, fk_vendor_id, state_product) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          data.name,
          data.key,
          data.category,
          data.store,
          data.stock,
          data.vendor,
          data.state,
        ]
      )
    );

    return createdProduct;
  }

  async updateProduct(id, data) {
    const updatedProduct = await Promise.resolve(
      db.query(
        'UPDATE products SET name_product=?, key_product=?, fk_category_id=?, fk_store_id=?, stock_product=?, fk_vendor_id=?, state_product=? WHERE id_product=?',
        [
          data.name,
          data.key,
          data.category,
          data.store,
          data.stock,
          data.vendor,
          data.state,
          id,
        ]
      )
    );

    return updatedProduct;
  }

  async deleteProduct(id) {
    const deletedProduct = await Promise.resolve(
      db.query('DELETE FROM products WHERE id_product=?', [id])
    );

    return deletedProduct;
  }
}

module.exports = ProductsService;
