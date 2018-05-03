'use strict'

require('dotenv').load()

const express = require('express')
const cors = require('cors')
const Promise = require('bluebird')
const authRoutes = require('./routes/auth-routes')
// TODO: find out what routes I need to add here.
const bodyParser = require('body-parser').json()
const mongoose = require('mongoose')

const app = module.exports = express()
const router = express.Router()
const PORT = process.env.PORT || 3680
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/gca-backend-dev'

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(bodyParser)
app.use('/api', authRoutes(router))
// TODO: and same routes here...
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
