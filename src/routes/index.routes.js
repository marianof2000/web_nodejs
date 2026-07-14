// SE ENCARGA DE CONECTAR TODAS LAS RUTAS

const { Router } = require("express") // importar express

const authRoutes = require("./auth.routes")
const pacienteRoutes = require("./paciente.routes")
const medicoRoutes = require("./medico.routes")
const pacienteMedicoRoutes = require("./paciente_medico.routes")
const tratamientoRoutes = require("./tratamiento.routes")
const turnoRoutes = require("./turno.routes")
const decodeJWT = require("../middlewares/decodeJWT")

const rutas_init = () => { // aca se ponen todas las rutas que existen
  const router = Router() // crear una instancia de express.Router()

  router.use("/auth", authRoutes)
  router.use("/pacientes", decodeJWT, pacienteRoutes)
  router.use("/medicos", decodeJWT, medicoRoutes)
  router.use("/pacientes-medicos", decodeJWT, pacienteMedicoRoutes)
  router.use("/tratamientos", decodeJWT, tratamientoRoutes)
  router.use("/turnos", decodeJWT, turnoRoutes)

  return router // retornar el router
};

module.exports = { rutas_init } // exportar el archivo de rutas de la api
