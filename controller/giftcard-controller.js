'use strict'

const debug = require('debug')('gca-backend: giftCardCtrl')
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const del = require('del')
const createError = require('http-errors')
const Promise = require('bluebird')
const dataDir = `${__dirname}/../data`

const GiftCard = require('../model/giftcard')

AWS.config.setPromisesDependency(require('bluebird'))

const s3 = new AWS.S3()

function s3UploadProm(params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if(err) return reject(createError(err.status, err.name))
      return resolve(data)
    })
  })
}

function s3DeleteProm(params) {
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if(err) return reject(createError(err.status, err.name))
      return resolve(data)
    })
  })
}

module.exports = exports = {}

exports.createGiftCard = function(req) {
  debug('#giftCardCtrl create-giftcard')

  if(!req.user) return Promise.reject(createError(400, 'GCID Required'))

  req.body.userId = req.user._id

  if(req.file) {
    let ext = path.extname(req.file.originalname)
    let params = {
      ACL: 'private-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.file.filename}${ext}`,
      Body: fs.createReadStream(req.file.path),
    }
    return s3UploadProm(params)
      .then(s3Data => {
        del([`${dataDir}/*`])
        req.body.photo = {
          imageURI: s3Data.Location,
          ObjectId: s3Data.Key,
        }
        return new GiftCard(req.body).save()
      })
      .catch(err => Promise.reject(createError(err.status, err.message)))

      } else {
        return new GiftCard(req.body).save()
          .then(giftcard => giftcard)
          .catch(err => Promise.reject(createError(err.status, err.message)));
  }
}

exports.fetchGiftCard = function(req) {
  if(!req.user_id) return Promise.reject(createError(err.status, err.message))

  return Memory.find({userId: req.user._id})
    .catch(err => Promise.reject(createError(err.status, err.message)))
}

exports.updateGiftCard = function(req) {
  if(req.params.id) return Promise.reject(createError(400, 'GCID Required'))
  if(req.file) {
    return GiftCard.find({_id: req.params.id, userId: req.user._id})
      .then(giftcard => {
        if(giftcard[0].photo) {
          let params = {
            Bucket: process.env.AWS_BUCKET,
            Key: giftcard[0].photo.ObjectId,
          }
          return s3DeleteProm(params)
        }
      })
      .then(() => {
        let ext = path.extname(req.file.originalname)
        let params = {
          ACL:'private-read',
          Bucket: process.env.AWS_BUCKET,
          Key: `${req.file.filename}${ext}`,
          Body: fs.createReadStream(req.file.path),
        }
        return s3UploadProm(params)
          .then(s3Data => {
            del([`${dataDir}/*`])
            req.body.photo = {
              imageURI: s3Data.Location,
              ObjectId: s3Data.Key,
            }
            return GiftCard.findOneAndUpdate({_id:req.params.id}, req.body, {new: true})
          })
          .catch(err => Promise.reject(createError(err.status, err.message)))
      })
      .catch(err => Promise.reject(createError(err.status, err.message)));
  } else {
    return GiftCard.findOneAndUpdate({_id:req.params.id}, req.body, {new: true})
    .then(giftcard => giftcard)
  }
}
