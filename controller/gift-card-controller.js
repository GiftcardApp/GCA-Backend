'use strict'

const debug = require('debug')('momentus: memoryCtrl')
const fs = require('fs')
const path = require('path')
// const AWS = require('aws-sdk')
const del = require('del')
const createError = require('http-errors')
const Promise = require('bluebird')
const dataDir = `${__dirname}/../data`

const GiftCard = requie('../model/gift-card')
