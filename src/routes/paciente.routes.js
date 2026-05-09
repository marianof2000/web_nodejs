// RUTAS DE PACIENTES

const router = require("express").Router(); 
const pacienteController = require('../controllers/paciente.controller') 

const validate = require('../middlewares/validate') // importar el middleware de validacion
const pacienteScheme = require('../middlewares/schemes/paciente.scheme') // importar el esquema de validacion de pacientes

router.get('/', pacienteController.listar)
router.get('/:idPaciente', pacienteController.listarInfo)
router.post('/', validate(pacienteScheme.crearPaciente), pacienteController.crear)

module.exports = router;
