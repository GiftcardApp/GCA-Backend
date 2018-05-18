'use strict'

const multer = require('multer')
const dataDir = '${__dirname}/../data'
const upload = multer({dest: dataDir})

const debug = require('debug')
const bearerAuth = require('../lib/bearer-auth-middleware')
const giftCardController = require('../controller/giftcard-controller')

module.exports = function(router) {
  router.post('/giftcard', bearerAuth, upload.single('photo'), (req,res) => {
  debug('#POST /giftcard')

  giftCardCtrl.enterGiftCard(req)
    .then(giftCard => res.status(201).json(giftCard))
    .catch(err => res.status(err.status).send(err.name))
  })

  router.get('/giftcard', bearerAuth, (req, res) => {
    debug('#GET /giftcard')

    giftCardCtrl.fetchGiftCard(req)
      .then(giftCard => res.json(giftCard))
      .catch(err => {
        res.status(err.status).send(err.message)
      })
  })

  router.put('/giftcard/:id', bearerAuth, (req, res) => {
    debug('#PUT /giftcard/:id')

    giftCardCtrl.updateGiftCard(req)
      .then(giftCard => res.json(giftCard))
      .catch(err => res.status(err.status).send(err.message))
  })

  router.delete('giftcard/:id', bearerAuth, (req, res) => {
    debug('#DELETE /giftcard/:id')

    giftCardCtrl.deleteGiftCard(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(err.status).send(err.message))
  })

  return router
}
