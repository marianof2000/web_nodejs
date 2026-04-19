// RUTAS DE MEDICOS

const router = require("express").Router();

const medicosController = require("../controllers/medicos.controller");

router.get("/prueba", medicosController.prueba);
router.get("/", medicosController.listar);
router.post("/", medicosController.crear);
router.get("/:idMedico", medicosController.listarInfo);

module.exports = router;