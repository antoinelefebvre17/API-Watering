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

const powerWatering = function (req, res) {
    const wateringPower = new WateringPower(req.body);

    wateringPower.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(wateringPower);
        }
    });};

router.route('/power')
    .post(powerWatering);

module.exports = router;
