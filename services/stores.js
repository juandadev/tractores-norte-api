const db = require('./db');

class StoresService {
  async getStores() {
    const stores = await Promise.resolve(db.query('SELECT * FROM stores', []));

    return stores || [];
  }

  async getStore(id) {
    const store = await Promise.resolve(
      db.query('SELECT * FROM stores WHERE id_store=?', [id])
    );

    return store;
  }

  async createStore(data) {
    const createdStore = await Promise.resolve(
      db.query('INSERT INTO stores (name_store) VALUES (?)', [data.name])
    );

    return createdStore;
  }

  async updateStore(id, data) {
    const updatedStore = await Promise.resolve(
      db.query('UPDATE stores SET name_store=? WHERE id_store=?', [
        data.name,
        id,
      ])
    );

    return updatedStore;
  }

  async deleteStore(id) {
    const deletedStore = await Promise.resolve(
      db.query('DELETE FROM stores WHERE id_store=?', [id])
    );

    return deletedStore;
  }
}

module.exports = StoresService;
