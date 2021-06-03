const db = require('./db');
const bcrypt = require('bcrypt');

class UsersService {
  async getUsers() {
    const users = await Promise.resolve(db.query('SELECT * FROM users', []));

    return users || [];
  }

  async getUser(id) {
    const user = await Promise.resolve(
      db.query('SELECT * FROM users WHERE id_user=?', [id])
    );

    return user;
  }

  async createUser(data) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password_user, salt);

    const createdUser = await Promise.resolve(
      db.query(
        'INSERT INTO users (name_user, address_user, phone_user, email_user, password_user, level_user) VALUES (?, ?, ?, ?, ?, ?)',
        [
          data.name,
          data.address || null,
          data.phone || null,
          data.email,
          hash,
          data.level,
        ]
      )
    );

    return createdUser;
  }

  async updateUser(id, data) {
    const updatedUser = await Promise.resolve(
      db.query(
        'UPDATE users SET name_user=? , address_user=? , phone_user=? , email_user=? , password_user=? , level_user=? WHERE id_user=?',
        [
          data.name,
          data.address || null,
          data.phone || null,
          data.email,
          data.password,
          data.level,
          id,
        ]
      )
    );

    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await Promise.resolve(
      db.query('DELETE FROM users WHERE id_user=?', [id])
    );

    return deletedUser;
  }
}

module.exports = UsersService;
