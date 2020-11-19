const express = require('express');
const UsersService = require('./users-service');
const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.post('/', jsonBodyParser, (req, res) => {
  const { password } = req.body;
  for (const field of ['email', 'password'])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing ${field} in request body`,
      });
  if (password.length < 8) {
    return res.status(400).json({
      error: 'Password must be longer than 8 characters',
    });
  }
  const passwordError = UsersService.validatePassword(password);
  if (passwordError) return res.status(400).json({ error: passwordError });
  res.send('ok');
});

module.exports = usersRouter;
