// TIENE TODA LA CONFIGURACION DE LA API

const express = require('express') // importar express
const cors = require('cors')
const routerConfig = require('./routes/index.routes.js') // importar el archivo de rutas
const logger = require('morgan')
const errorHandler = require('./middlewares/error')
let createError = require('http-errors') // se utiliza para crear un error personalizado

const configuracionApi = (app) => { // configurar la api
  app.use(cors())
  app.use(express.json()) // para que la api pueda recibir json
  app.use(express.urlencoded({ extended: true })) // para que la api pueda recibir formularios

  if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'))
  }

  return
}

const configuracionRouter = (app) => { // configurar las rutas
  app.use(routerConfig.rutas_init())
  app.use(function (req, res, next) {
    next(createError(404))
  })
  app.use(errorHandler)
}

const crearApp = () => {
  const app = express() // crear una instancia de express
  configuracionApi(app) // configurar la api
  configuracionRouter(app) // configurar las rutas

  return app
}

module.exports = crearApp
