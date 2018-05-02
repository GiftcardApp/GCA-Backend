'use strict'

// const User = require(../../model/user.js)

moduel.exports = function(done) {

  new User({
    username : 'Example User' + Math.floor(Math.random() * (100 -1)) +1,
    email: 'sampleUser' + Math.floor(Math.random() * (100 -1)) + 1 + '@example.com',
    password: 'password',
    role: 'user',
  }).generatePasswordHash('123')
  .then(user => user.save())
  .then(user=> {
    this.tempUser = user
    return user.generateToken()
  })
  .then(token => {
    this.tempToken = token
    done()
  })
  .catch(done)
}
