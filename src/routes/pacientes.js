// RUTAS DE PACIENTES

const router = require("express").Router(); // importar express.Router()

const usuarioController = require("../controllers/api.controller"); // importar el archivo de controladores

router.get("/prueba", usuarioController.pruebaPacientes);
router.get("/", usuarioController.listarPacientes);
router.post("/", usuarioController.crearPacientes);
router.get("/:idPaciente", usuarioController.listarInfoPacientes);

module.exports = router;