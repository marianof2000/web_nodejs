// RUTAS DE TRATAMIENTOS

const router = require("express").Router()
const tratamientoController = require('../controllers/tratamiento.controller')

const validate = require('../middlewares/validate') // importar el middleware de validacion
const tratamientoScheme = require('../middlewares/schemes/tratamiento.scheme') // importar el esquema de validacion de tratamientos

router.get('/', tratamientoController.listar)
router.get('/:idTratamiento', tratamientoController.listarInfo)
router.post('/', validate(tratamientoScheme.crearTratamiento), tratamientoController.crear)

module.exports = router
