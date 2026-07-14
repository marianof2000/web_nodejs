// RUTAS DE PACIENTES

const router = require("express").Router(); 
const pacienteController = require('../controllers/paciente.controller') 
const pacienteMedicoController = require('../controllers/paciente_medico.controller')

const validate = require('../middlewares/validate') // importar el middleware de validacion
const validateParams = require('../middlewares/validateParams')
const pacienteScheme = require('../middlewares/schemes/paciente.scheme') // importar el esquema de validacion de pacientes

router.get('/', pacienteController.listar)
router.get('/:idPaciente/medicos', validateParams('idPaciente'), pacienteMedicoController.listarMedicosPorPaciente)
router.post('/:idPaciente/medicos/:idMedico', validateParams('idPaciente', 'idMedico'), pacienteMedicoController.crear)
router.delete('/:idPaciente/medicos/:idMedico', validateParams('idPaciente', 'idMedico'), pacienteMedicoController.eliminar)
router.get('/:idPaciente', validateParams('idPaciente'), pacienteController.listarInfo)
router.post('/', validate(pacienteScheme.crearPaciente), pacienteController.crear)
router.patch('/:idPaciente', validateParams('idPaciente'), validate(pacienteScheme.actualizarPaciente), pacienteController.actualizar)
router.delete('/:idPaciente', validateParams('idPaciente'), pacienteController.eliminar)

module.exports = router;
