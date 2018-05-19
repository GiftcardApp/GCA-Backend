'use strict'

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Promise = require('bluebird')
const mongoose = require('mongoose')
const createError = require('http-errors')
const debug = require('debug')('gca-backend:giftcard-model')

const dateLimit = () => new Date(Date.now() + (30*24*60*60000))
const isValid = dateLimit => dateLimit < cardExpirationDate ? true : false

const Schema = mongoose.Schema
const giftCardSchema = Schema({
  cardTitle: {type: String, trim: true,},
  cardNumber: {type: Number, required: true, unique: true, minlength: 19, maxLength: 19},
  cardExpirationDate: {type: Date, required: true}
})

module.exports = mongoose.model('giftcard', giftCardSchema)
