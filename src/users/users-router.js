const express = require('express');
const path = require('path');
const UsersService = require('./users-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.post('/', jsonBodyParser, (req, res, next) => {
  const { password, username, fullname, nickname } = req.body;

  for (const field of ['fullname', 'username', 'password'])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing ${field} in request`,
      });
  const passwordError = UsersService.validatePassword(password);

  if (passwordError) return res.status(400).json({ error: passwordError });

  UsersService.usernameTaken(req.app.get('db'), username)
    .them((usernameTaken) => {
      if (usernameTaken)
        return res.status(400).json({ error: `Username already taken` });

      return UsersService.hashPassword(password).then((hashedPassword) => {
        const newUser = {
          username,
          password: hashedPassword,
          fullname,
          nickname,
          date_created: 'now()',
        };
        return UsersService.insertUser(req.app.get('db'), newUser).then(
          (user) => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${user.id}`))
              .json(UsersService.serializeUser(user));
          }
        );
      });
    })
    .catch(next);
});

module.exports = usersRouter;
