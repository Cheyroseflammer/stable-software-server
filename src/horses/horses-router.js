const path = require('path');
const express = require('express');
const xss = require('xss');
const HorsesService = require('./horses-service');

const horsesRouter = express.Router();
const jsonParser = express.json();

const serializeHorse = (horse) => ({
  id: horse.id,
  name: xss(horse.name),
  showname: xss(horse.showname),
  age: xss(horse.age),
  stall: xss(horse.stall),
  riderId: xss(horse.riderId),
});
horsesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    HorsesService.getAllHorses(knexInstance)
      .then((horses) => {
        res.json(horses.map(serializeHorse));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { name, showname, age, stall, riderId } = req.body;
    const newHorse = { name, showname, age, stall, riderId };

    for (const [key, value] of Object.entries(newHorse))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    HorsesService.insertHorse(req.app.get('db'), newHorse)
      .then((horse) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${horse.id}`))
          .json(serializeHorse(horse));
      })
      .catch(next);
  });

horsesRouter
  // need explanation of the .all block
  .route('/:horseId')
  .all((req, res, next) => {
    HorsesService.getById(req.app.get('db'), req.params.horseId)
      .then((horse) => {
        if (!horse) {
          return res.status(404).json({
            error: { message: `Horse doesn't exist` },
          });
        }
        res.horse = horse;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeHorse(res.horse));
  })
  .delete((req, res, next) => {
    HorsesService.deleteHorse(req.app.get('db'), req.params.HorseId)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = horsesRouter;
