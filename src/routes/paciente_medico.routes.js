const router = require("express").Router()
const pacienteMedicoController = require('../controllers/paciente_medico.controller')

router.get('/', pacienteMedicoController.listar)

module.exports = router
