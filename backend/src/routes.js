const express = require('express')
const OngController = require('./controllers/OngController.js')
const IncidentsController = require('./controllers/IncidentsController.js')
const ProfileController = require('./controllers/ProfileController.js')
const SessionController = require('./controllers/SessionController.js')

const routes = express.Router()

routes.post('/ongs', OngController.create)
routes.get('/ongs', OngController.index)

routes.get('/profile', ProfileController.index)

routes.post('/session', SessionController.create)

routes.post('/incidents', IncidentsController.create)
routes.get('/incidents', IncidentsController.index)
routes.delete('/incidents/:id', IncidentsController.delete)

module.exports = routes