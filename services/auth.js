const db = require('./db');
const bcrypt = require('bcrypt');

class AuthService {
  async signIn(credentials) {
    const { email, password } = credentials;

    const user = await Promise.resolve(
      db.query('SELECT * FROM users WHERE email_user=?', [email])
    );

    if (user) {
      const matchPassword = bcrypt.compareSync(password, user.password_user);

      matchPassword ? user : 'Contraseña incorrecta';
    }

    return 'El usuario no existe';
  }
}

module.exports = AuthService;
