const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/API-Watering', { useNewUrlParser: true, useUnifiedTopology: true });

const WateringSchema = new Schema({
    id_user: {type: mongoose.Schema.ObjectId},
    name: {type: String}
}, {
    versionKey: false
});

mongoose.model('Watering', WateringSchema);
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
    res.json(req.user);
};

const getByIdWatering = function (req, res, next, id) {
    Watering.findOne({_id: id}, function (err, watering) {
        if (err) {
            next(err);
        } else {
            req.user = watering;
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
