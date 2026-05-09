// TIENE TODA LA CONFIGURACION DE LA API

const express = require('express') // importar express
const routerConfig = require('./routes/index.routes.js') // importar el archivo de rutas
const globalConstants = require('./const/globalConstants.js') // importar el archivo de constantes globales
const logger = require('morgan');
const errorHandler = require('./middlewares/error')
let createError = require('http-errors') // se utiliza para crear un error personalizado

const configuracionApi = (app) => { // configurar la api
  app.use(express.json()) // para que la api pueda recibir json
  app.use(express.urlencoded({ extended: true })) // para que la api pueda recibir formularios
  app.use(logger('dev'))

  return;
};

const configuracionRouter = (app) => { // configurar las rutas
  app.use(routerConfig.rutas_init()) 
  app.use(function (req, res, next) {
    next(createError(404));
  })
  app.use(errorHandler)
};

const rutas_auth = () => {
  const router = Router()
  router.use("/auth", authRoutes)
  return router
}

const init = () => {
  const app = express() // crear una instancia de express
  configuracionApi(app) // configurar la api
  configuracionRouter(app) // configurar las rutas
  app.listen(globalConstants.PORT) // escuchar en el puerto
  console.log('La aplicacion se está ejecutando en el puerto:' + globalConstants.PORT) // mostrar en consola que se está ejecutando la aplicación en el puerto correspondiente
};

init(); // iniciar la aplicación
