// RUTAS DE TURNOS

const router = require("express").Router()
const turnoController = require('../controllers/turno.controller')

const validate = require('../middlewares/validate')
const validateParams = require('../middlewares/validateParams')
const turnoScheme = require('../middlewares/schemes/turno.scheme')

router.get('/', turnoController.listar)
router.get('/:idTurno', validateParams('idTurno'), turnoController.listarInfo)
router.post('/', validate(turnoScheme.crearTurno), turnoController.crear)
router.patch('/:idTurno', validateParams('idTurno'), validate(turnoScheme.actualizarTurno), turnoController.actualizar)
router.delete('/:idTurno', validateParams('idTurno'), turnoController.eliminar)

module.exports = router
