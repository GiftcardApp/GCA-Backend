'use strict'

require('dotenv').load()

const express = require('express')
const cors = require('cors')
const Promise = require('bluebird')
const authRoutes = require('./routes/auth-routes')
const giftCardRoutes = require('./routes/giftcard-routes')
const bodyParser = require('body-parser').json()
const mongoose = require('mongoose')

const app = module.exports = express()
const router = express.Router()
const PORT = process.env.PORT || 3898
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/gca-backend-dev'

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(bodyParser)
app.use('/api', authRoutes(router))
app.use('/api', giftCardRoutes(router))

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
