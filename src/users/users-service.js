const xss = require('xss');
const bcrypt = require('bcrypt');

// to store db transactions:
const UsersService = {
  serializeUser(user) {
    return {
      id: user.id,
      email: xss(user.email),
    };
  },
  getAllUsers(knex) {
    return knex.select('*').from('users');
  },
  hasUserWithUserName(db, email) {
    return db('users')
      .where({ email })
      .first()
      .then((user) => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
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
    return knex('users').where({ id }).delete();
  },
  getById(knex, id) {
    return knex.from('users').select('*').where('id', id).first();
  },
};

module.exports = UsersService;
