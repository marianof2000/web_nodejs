// RUTAS DE TURNOS

const router = require("express").Router()
const turnoController = require('../controllers/turno.controller')

const validate = require('../middlewares/validate')
const turnoScheme = require('../middlewares/schemes/turno.scheme')

router.get('/', turnoController.listar)
router.get('/:idTurno', turnoController.listarInfo)
router.post('/', validate(turnoScheme.crearTurno), turnoController.crear)
router.put('/:idTurno', validate(turnoScheme.actualizarTurno), turnoController.actualizar)
router.delete('/:idTurno', turnoController.eliminar)

module.exports = router
