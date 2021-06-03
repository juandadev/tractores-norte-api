const db = require('./db');

class ClientsService {
  async getClients() {
    const clients = await Promise.resolve(
      db.query('SELECT * FROM clients', [])
    );

    return clients || [];
  }

  async getClient(id) {
    const client = await Promise.resolve(
      db.query('SELECT * FROM clients WHERE id_client=?', [id])
    );

    return client;
  }

  async createClient(data) {
    const createdClient = await Promise.resolve(
      db.query(
        'INSERT INTO clients (name_client, phone_client, address_client, email_client) VALUES (?, ?, ?, ?)',
        [
          data.name,
          data.phone || null,
          data.address || null,
          data.email || null,
        ]
      )
    );

    return createdClient;
  }

  async updateClient(id, data) {
    const updatedClient = await Promise.resolve(
      db.query(
        'UPDATE clients SET name_client=?, phone_client=?, address_client=?, email_client=? WHERE id_client=?',
        [
          data.name,
          data.phone || null,
          data.address || null,
          data.email || null,
          id,
        ]
      )
    );

    return updatedClient;
  }

  async deleteClient(id) {
    const deletedClient = await Promise.resolve(
      db.query('DELETE FROM clients WHERE id_client=?', [id])
    );

    return deletedClient;
  }
}

module.exports = ClientsService;
