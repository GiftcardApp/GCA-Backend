'use strict'

const GiftCard = require('../..model/gift-card.js')

module.exports = function(done) {

  new GiftCard({
    cardTitle: 'Example Card Title ' + Math.floor(Math.random() * (100 -1)) +1,
    cardNumber: '1111 1111 11111 1114',
    cardExpirationDate: new Date(Date.now() + 120*2)4*60*60000)
  })
}
