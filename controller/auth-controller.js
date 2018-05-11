'use strict'

const debug = require('debug')('gca-backend: authCtrl')
const User = require('../model/user')

module.exports = exports = {}

exports.createUser = function(reqBody, tempPass) {
  debug('#authCtrl createUser')

  let newUser = new User(reqBody);
  return newUser.generatePasswordHash(tempPass)
    .then(user => user.save())
    .then(user => user.generateToken())
    .catch(err => Promise.reject(err))
}

exports.fetchUser = function(reqAuth) {
  debug('#authCtrl fetchUser')

  return User.findOne({username: reqAuth.username})
    .then(user => user.comparePasswordHash(reqAuth.password))
    .then(user => user.generateToken())
    .catch(err => Promise.reject(err))
}

exports.deleteUser = function(id) {
  debug('#authCtrl dleteUser');

  return User.findByIdAndRemove(id)
}
