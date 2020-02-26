const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/API-Watering', { useNewUrlParser: true, useUnifiedTopology: true });

const WateringPowerSchema = new Schema({
    id_watering: {type: mongoose.Schema.ObjectId},
    power: {type: Boolean},
    time: {type: Date}
}, {
    versionKey: false
});

mongoose.model('WateringPower', WateringPowerSchema);
const WateringPower = require('mongoose').model('WateringPower');

const WateringSchedulesSchema = new Schema({
    id_watering: {
        type: mongoose.Schema.ObjectId,
        unique: true,
    },
    schedules: [{
        start: {type: "string"},
        end: {type: "string"}
    }]
}, {
    versionKey: false
});

mongoose.model('WateringSchedules', WateringSchedulesSchema);
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

router.route('/schedules')
    .post(schedulesWatering)
    .get(getAllWateringSchedules);

router.route('/schedules/:wateringId')
    .get(getOneWateringSchedules);

router.param('wateringId', getByIdWateringSchedules);

module.exports = router;
