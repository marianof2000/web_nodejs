// SE ENCARGA DE CONECTAR TODAS LAS RUTAS

const { Router } = require("express") // importar express

const authRoutes = require("./auth.routes")
const pacienteRoutes = require("./paciente.routes")
const medicoRoutes = require("./medico.routes")
const pacienteMedicoRoutes = require("./paciente_medico.routes")

const rutas_init = () => { // aca se ponen todas las rutas que existen
  const router = Router() // crear una instancia de express.Router()

  router.use("/pacientes", pacienteRoutes)
  router.use("/medicos", medicoRoutes)
  router.use("/pacientes-medicos", pacienteMedicoRoutes)
  router.use("/auth", authRoutes)

  return router // retornar el router
};

module.exports = { rutas_init } // exportar el archivo de rutas de la api