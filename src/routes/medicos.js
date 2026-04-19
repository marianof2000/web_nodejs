// RUTAS DE MEDICOS

const router = require("express").Router(); // importar express.Router()

const usuarioController = require("../controllers/api.controller"); // importar el archivo de controladores

router.get("/prueba", usuarioController.pruebaMedicos);
router.get("/", usuarioController.listarMedicos);
router.post("/", usuarioController.crearMedicos);
router.get("/:idMedico", usuarioController.listarInfoMedicos);

module.exports = router;