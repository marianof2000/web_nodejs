// RUTAS DE TRATAMIENTOS

const router = require("express").Router(); // importar express.Router()

const usuarioController = require("../controllers/api.controller"); // importar el archivo de controladores

router.get("/prueba", usuarioController.pruebaTratamientos);
router.get("/", usuarioController.listarTratamientos);
router.post("/", usuarioController.crearTratamientos);
router.get("/:idTratamiento", usuarioController.listarInfoTratamientos);

module.exports = router;