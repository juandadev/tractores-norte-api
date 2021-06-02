const usersMock = require('../utils/usersDB.json');
const db = require('./db');

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
    const createdUser = await Promise.resolve(
      db.query(
        'INSERT INTO users (name_user, address_user, phone_user, email_user, password_user, level_user) VALUES (?, ?, ?, ?, ?, ?)',
        [
          data.name_user,
          data.address_user,
          data.phone_user,
          data.email_user,
          data.password_user,
          data.level_user,
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
          data.name_user,
          data.address_user,
          data.phone_user,
          data.email_user,
          data.password_user,
          data.level_user,
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
