// RUTAS DE MEDICOS

const router = require("express").Router(); 
const medicoController = require('../controllers/medico.controller')

const validate = require('../middlewares/validate') // importar el middleware de validacion
const medicoScheme = require('../middlewares/schemes/medico.scheme') // importar el esquema de validacion de medicos



router.get('/', medicoController.listar)
router.get('/:idMedico', medicoController.listarInfo)
router.post('/', validate(medicoScheme.crearMedico), medicoController.crear)


module.exports = router;
