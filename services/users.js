const usersMock = require('../utils/usersDB.json');

class UsersService {
  async getUsers() {
    const users = await Promise.resolve(usersMock);

    return users || [];
  }

  async getUser() {
    const user = await Promise.resolve(usersMock[0]);

    return user;
  }

  async createUser() {
    const createdUser = await Promise.resolve(usersMock[0].id);

    return createdUser;
  }

  async updateUser() {
    const updatedUser = await Promise.resolve(usersMock[0].id);

    return updatedUser;
  }

  async deleteUser() {
    const deletedUser = await Promise.resolve(usersMock[0].id);

    return deletedUser;
  }
}

module.exports = UsersService;
