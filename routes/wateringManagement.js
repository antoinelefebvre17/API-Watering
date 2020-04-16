const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.model('WateringPower', config.schema.WateringPowerSchema);
const WateringPower = require('mongoose').model('WateringPower');

mongoose.model('WateringSchedules', config.schema.WateringSchedulesSchema);
const WateringSchedules = require('mongoose').model('WateringSchedules');

const powerWatering = function (req, res, next) {
    const wateringPower = new WateringPower(req.body);

    wateringPower.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(wateringPower);
        }
    });
};

const schedulesWatering = function (req, res, next) {
    const wateringSchedules = new WateringSchedules(req.body);

    wateringSchedules.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(wateringSchedules);
        }
    });
};

const getPowerWatering = function (req, res, next) {
    WateringPower.find({id_watering: req.params.wateringPowerId}, function (err, wateringPower) {
        if (err) {
            next(err);
        } else {
            res.json(wateringPower);
        }
    });
};

const getAllWateringSchedules = function (req, res, next) {
    WateringSchedules.find(function (err, watering) {
        if (err) {
            next(err);
        } else {
            res.json(watering);
        }
    });
};

const getOneWateringSchedules = function (req, res) {
    res.json(req.schedules);
};

const getByIdWateringSchedules = function (req, res, next, id) {
    WateringSchedules.findOne({id_watering: id}, function (err, schedules) {
        if (err) {
            next(err);
        } else {
            req.schedules = schedules;
            next();
        }
    });
};

router.route('/power')
    .post(powerWatering);

router.route('/power/:wateringPowerId')
    .get(getPowerWatering);

router.route('/schedules')
    .post(schedulesWatering)
    .get(getAllWateringSchedules);

router.route('/schedules/:wateringId')
    .get(getOneWateringSchedules);

router.param('wateringId', getByIdWateringSchedules);

module.exports = router;
