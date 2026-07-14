// RUTAS DE MEDICOS

const router = require("express").Router(); 
const medicoController = require('../controllers/medico.controller')
const pacienteMedicoController = require('../controllers/paciente_medico.controller')

const validate = require('../middlewares/validate') // importar el middleware de validacion
const validateParams = require('../middlewares/validateParams')
const medicoScheme = require('../middlewares/schemes/medico.scheme') // importar el esquema de validacion de medicos



router.get('/', medicoController.listar)
router.get('/:idMedico/pacientes', validateParams('idMedico'), pacienteMedicoController.listarPacientesPorMedico)
router.get('/:idMedico', validateParams('idMedico'), medicoController.listarInfo)
router.post('/', validate(medicoScheme.crearMedico), medicoController.crear)
router.patch('/:idMedico', validateParams('idMedico'), validate(medicoScheme.actualizarMedico), medicoController.actualizar)
router.delete('/:idMedico', validateParams('idMedico'), medicoController.eliminar)


module.exports = router;
