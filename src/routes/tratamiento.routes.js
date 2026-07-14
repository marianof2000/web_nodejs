// RUTAS DE TRATAMIENTOS

const router = require("express").Router()
const tratamientoController = require('../controllers/tratamiento.controller')

const validate = require('../middlewares/validate') // importar el middleware de validacion
const validateParams = require('../middlewares/validateParams')
const tratamientoScheme = require('../middlewares/schemes/tratamiento.scheme') // importar el esquema de validacion de tratamientos

router.get('/', tratamientoController.listar)
router.get('/:idTratamiento', validateParams('idTratamiento'), tratamientoController.listarInfo)
router.post('/', validate(tratamientoScheme.crearTratamiento), tratamientoController.crear)
router.patch('/:idTratamiento', validateParams('idTratamiento'), validate(tratamientoScheme.actualizarTratamiento), tratamientoController.actualizar)
router.delete('/:idTratamiento', validateParams('idTratamiento'), tratamientoController.eliminar)

module.exports = router
