const path = require('path');
const express = require('express');
const xss = require('xss');
const RidersService = require('./riders-service');

const ridersRouter = express.Router();
const jsonParser = express.json();

// What is this serializeRider function doing?
const serializeRider = (rider) => ({
  id: rider.id,
  name: xss(rider.name),
});

ridersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    RidersService.getAllRiders(knexInstance)
      .then((riders) => {
        res.json(riders.map(serializeRider));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { name } = req.body;
    const newRider = { name };

    for (const [key, value] of Object.entries(newRider))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    RidersService.insertRider(req.app.get('db'), newRider)
      .then((rider) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/api/riders/${rider.id}`))
          .json(serializeRider(rider));
      })
      .catch(next);
  });

ridersRouter
  .route('/:riderId')
  .all((req, res, next) => {
    RidersService.getById(req.app.get('db'), req.params.riderId)
      .then((rider) => {
        if (!rider) {
          return res.status(404).json({
            error: { message: `Rider doesn't exist` },
          });
        }
        res.rider = rider;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeRider(res.rider));
  })
  .delete((req, res, next) => {
    RidersService.deleteRider(req.app.get('db'), req.params.riderId)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = ridersRouter;
