const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const config = {};

config.db = {};
config.schema = {};

//BDD Config
config.db.host = "127.0.0.1";
config.db.port = "27017";
config.db.name = "API-Watering";


//Schema Config
config.schema.WateringSchema = new Schema({
    id_user: {type: mongoose.Schema.ObjectId},
    name: {type: String}
}, {
    versionKey: false
});

config.schema.UserSchema = new Schema({
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    firstName: {type: String},
    lastName: {type: String}
}, {
    versionKey: false
});

config.schema.WateringPowerSchema = new Schema({
    id_watering: {type: mongoose.Schema.ObjectId},
    power: {type: Boolean},
    time: {type: Date}
}, {
    versionKey: false
});

config.schema.WateringSchedulesSchema = new Schema({
    id_watering: {
        type: mongoose.Schema.ObjectId,
        unique: true,
    },
    schedules: [{
        start: {type: String},
        end: {type: String}
    }]
}, {
    versionKey: false
});


module.exports = config;
