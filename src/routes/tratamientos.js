// RUTAS DE TRATAMIENTOS

const router = require("express").Router();

const tratamientosController = require("../controllers/tratamientos.controller");

router.get("/prueba", tratamientosController.prueba);
router.get("/", tratamientosController.listar);
router.post("/", tratamientosController.crear);
router.get("/:idTratamiento", tratamientosController.listarInfo);

module.exports = router;