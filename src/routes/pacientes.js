// RUTAS DE PACIENTES

const router = require("express").Router();

const pacientesController = require("../controllers/pacientes.controller");

router.get("/prueba", pacientesController.prueba);
router.get("/", pacientesController.listar);
router.post("/", pacientesController.crear);
router.get("/:idPaciente", pacientesController.listarInfo);

module.exports = router;