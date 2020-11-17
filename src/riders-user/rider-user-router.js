const express = require('express');
const xxs = require('xxs');
const path = require('path');
const requireAuth = require('../middleware/jwt-auth');

const RiderUserService = require('./rider-user-service');

const riderUserRouter = express.Router();
const jsonParser = express.json();

riderUserRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    RiderUserService.getAllRiders(req.app.get('db'), req.user.id)
      .then((user_rider) => {
        if (!user_rider) {
          return res.status(404).json({
            error: { message: `Users Riders do not exist` },
          });
        }
        res.json(user_rider);
      })
      .catch(next);
  })

  .post(requireAuth, jsonParser, (req, res, next) => {
    const { riders_id } = req.body;
    const newRider = { user_id: req.user.id, riders_id };

    RiderUserService.insertRiders(req.app.get('db'), newRider)
      .then((rider) => {
        res.status(201).json(rider);
      })
      .catch(next);
  });
riderUserRouter
  .route('/:rider_id')
  .all((req, res, next) => {
    if (isNaN(parseInt(req.params.rider_id))) {
      return res.status(400).json({
        error: { message: `Invalid id ${req.params.rider_id}` },
      });
    }
    RiderUserService.getRidersById(req.app.get('db'), req.params.rider_id)
      .then((rider) => {
        if (!rider) {
          return res.status(400).json({
            error: { message: `Rider does not exist` },
          });
        }
        res.rider = rider;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(res.rider);
  });
module.exports = riderUserRouter;
