const xss = require('xss');
const bcrypt = require('bcryptjs');

// to store db transactions:
const UsersService = {
  serializeUser(user) {
    return {
      id: user.id,
      email: xss(user.email),
    };
  },
  getAllUsers(knex) {
    return knex.select('*').from('stable_users');
  },
  hasUserWithUserName(db, email) {
    return db('stable_users')
      .where({ email })
      .first()
      .then((user) => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('stable_users')
      .returning('*')
      .then(([user]) => user);
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (password.length > 20) {
      return 'Password must be less than 20 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  deleteUser(knex, id) {
    return knex('stable_users').where({ id }).delete();
  },
  getById(knex, id) {
    return knex.from('stable_users').select('*').where('id', id).first();
  },
};

module.exports = UsersService;
