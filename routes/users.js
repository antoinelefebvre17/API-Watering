const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.model('User', config.schema.UserSchema);
const User = require('mongoose').model('User');

//middleware for create
const createUser = function (req, res, next) {
  const user = new User(req.body);

  user.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
};

const updateUser = function (req, res, next) {
  User.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, user) {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
};

const deleteUser = function (req, res, next) {
  req.user.remove(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(req.user);
    }
  });
};

const getAllUsers = function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      next(err);
    } else {
      res.json(users);
    }
  });
};

const getOneUser = function (req, res) {
  res.json(req.user);
};

const getByIdUser = function (req, res, next, id) {
  User.findOne({_id: id}, function (err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

router.route('/')
    .post(createUser)
    .get(getAllUsers);

router.route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

router.param('userId', getByIdUser);

module.exports = router;
