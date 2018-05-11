'use strict'

const multer = require('multer')
const dataDir = '${__dirname}/../data'
const upload = multer({dest: dataDir})

const debug = require('debug')
const bearerAuth = require('../lib/bearer-auth-middleware')
const giftCardController = require('../controller/gift-card-controller')

module.exports = function(router) {
  router.post('/gift-card', bearerAuth, upload.single('photo'), (req,res) => {
  debug('#POST /gift-card')

  giftCardCtrl.enterGiftCard(req)
    .then(giftCard => res.status(201).json(giftCard))
    .catch(err => res.status(err.status).send(err.name))
  })

  router.get('/gift-card', bearerAuth, (req, res) => {
    debug('#GET /gift-card')

    giftCardCtrl.fetchGiftCard(req)
      .then(giftCard => res.json(giftCard))
      .catch(err => {
        res.status(err.status).send(err.message)
      })
  })

  router.put('/giftcard/:id', bearerAuth, (req, res) => {
    debug('#PUT /gift-card/:id')

    giftCardCtrl.updateGiftCard(req)
      .then(gift-card => res.json(gift-card))
      .catch(err => res.status(err.status).send(err.message))
  })

  router.delete('gift-card/:id', bearerAuth, (req, res) => {
    debug('#DELETE /gift-card/:id')

    giftCardCtrl.deleteGiftCard(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(err.status).send(err.message))
  })

  return router
}
