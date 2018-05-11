'use strict'

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Promise = require('bluebird')
const mongoose = require('mongoose')
const createError = require('http-errors')
const debug = require('debug')('gca-backend:gift-card-model')

const Schema = mongoose.Schema
const giftCatdSchema = Schema({
  cardTitle: {type: String, trim: true,},
  cardNumber: {type: Number, required: true, unique: true, minlength: 19, maxLength: 19},
  cardExpirationDate: {
    validator: { $and:
      [
        { cardExpirationDate: { $type: Date,
        $lt: new Date(Date.now() + 30*24*60*60000) } }
      ]
    }
  }

})
