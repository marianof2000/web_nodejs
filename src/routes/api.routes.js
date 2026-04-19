// RUTAS GENERALES DE LA API

const router = require("express").Router(); // importar express.Router()

const apiController = require("../controllers/api.controller"); // importar el archivo de controladores

// Rutas de médicos
router.get("/medicos/prueba", apiController.pruebaMedicos);
router.get("/medicos", apiController.listarMedicos);
router.post("/medicos", apiController.crearMedicos);
router.get("/medicos/:idMedico", apiController.listarInfoMedicos);

// Rutas de pacientes
router.get("/pacientes/prueba", apiController.pruebaPacientes);
router.get("/pacientes", apiController.listarPacientes);
router.post("/pacientes", apiController.crearPacientes);
router.get("/pacientes/:idPaciente", apiController.listarInfoPacientes);

// Rutas de tratamientos
router.get("/tratamientos/prueba", apiController.pruebaTratamientos);
router.get("/tratamientos", apiController.listarTratamientos);
router.post("/tratamientos", apiController.crearTratamientos);
router.get("/tratamientos/:idTratamiento", apiController.listarInfoTratamientos);

module.exports = router;