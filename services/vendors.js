const db = require('./db');

class VendorsService {
  async getVendors() {
    const vendors = await Promise.resolve(
      db.query('SELECT * FROM vendors', [])
    );

    return vendors || [];
  }

  async getVendor(id) {
    const vendor = await Promise.resolve(
      db.query('SELECT * FROM vendors WHERE id_vendor=?', [id])
    );

    return vendor;
  }

  async createVendor(data) {
    const createdVendor = await Promise.resolve(
      db.query(
        'INSERT INTO vendors (name_vendor, phone_vendor, social_vendor, address_vendor, bank_vendor) VALUES (?, ?, ?, ?, ?)',
        [
          data.name,
          data.phone || null,
          data.social || null,
          data.address || null,
          data.bank || null,
        ]
      )
    );

    return createdVendor;
  }

  async updateVendor(id, data) {
    const updatedVendor = await Promise.resolve(
      db.query(
        'UPDATE vendors SET name_vendor=?, phone_vendor=?, social_vendor=?, address_vendor=?, bank_vendor=? WHERE id_vendor=?',
        [
          data.name,
          data.phone || null,
          data.social || null,
          data.address || null,
          data.bank || null,
          id,
        ]
      )
    );

    return updatedVendor;
  }

  async deleteVendor(id) {
    const deletedVendor = await Promise.resolve(
      db.query('DELETE FROM vendors WHERE id_vendor=?', [id])
    );

    return deletedVendor;
  }
}

module.exports = VendorsService;
