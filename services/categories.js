const db = require('./db');

class CategoriesService {
  async getCategories() {
    const categories = await Promise.resolve(
      db.query('SELECT * FROM categories', [])
    );

    return categories || [];
  }

  async getCategory(id) {
    const category = await Promise.resolve(
      db.query('SELECT * FROM categories WHERE id_category=?', [id])
    );

    return category;
  }

  async createCategory(data) {
    const createdCategory = await Promise.resolve(
      db.query('INSERT INTO categories (name_category) VALUES (?)', [data.name])
    );

    return createdCategory;
  }

  async updateCategory(id, data) {
    const updatedCategory = await Promise.resolve(
      db.query('UPDATE categories SET name_category=? WHERE id_category=?', [
        data.name,
        id,
      ])
    );

    return updatedCategory;
  }

  async deleteCategory(id) {
    const deletedCategory = await Promise.resolve(
      db.query('DELETE FROM categories WHERE id_category=?', [id])
    );

    return deletedCategory;
  }
}

module.exports = CategoriesService;
