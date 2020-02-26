const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.model('Watering', config.schema.WateringSchema);
const Watering = require('mongoose').model('Watering');

const createWatering = function (req, res, next) {
    const watering = new Watering(req.body);

    watering.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(watering);
        }
    });
};

const getAllWatering = function (req, res, next) {
    Watering.find(function (err, watering) {
        if (err) {
            next(err);
        } else {
            res.json(watering);
        }
    });
};

const getOneWatering = function (req, res) {
    res.json(req.watering);
};

const getByIdWatering = function (req, res, next, id) {
    Watering.findOne({_id: id}, function (err, watering) {
        if (err) {
            next(err);
        } else {
            req.watering = watering;
            next();
        }
    });
};

router.route('/')
    .post(createWatering)
    .get(getAllWatering);

router.route('/:wateringId')
    .get(getOneWatering);

router.param('wateringId', getByIdWatering);

module.exports = router;
