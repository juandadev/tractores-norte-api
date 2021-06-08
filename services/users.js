const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  async authorizeUser(id, data) {
    const user = await Promise.resolve(
      db.query('SELECT * FROM users WHERE id_user=?', [id])
    ).then((res) => res[0]);

    const checkPassword = bcrypt.compareSync(data.password, user.password_user);

    if (checkPassword) {
      const token = jwt.sign(
        {
          id: user.id_user,
          email: user.email_user,
          name: user.name_user,
          level: user.level_user,
        },
        process.env.JWT_SECRET
      );

      return { ...user, token };
    }

    return false;
  }

  decodeJWT(token) {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    return decode;
  }

  async createUser(data) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);

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
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);

    const updatedUser = await Promise.resolve(
      db.query(
        'UPDATE users SET name_user=? , address_user=? , phone_user=? , email_user=? , password_user=? , level_user=? WHERE id_user=?',
        [
          data.name,
          data.address || null,
          data.phone || null,
          data.email,
          hash,
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
