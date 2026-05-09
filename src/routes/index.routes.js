// SE ENCARGA DE CONECTAR TODAS LAS RUTAS

const { Router } = require("express") // importar express

const pacienteRoutes = require("./paciente.routes")
const medicoRoutes = require("./medico.routes")
const pacienteMedicoRoutes = require("./paciente_medico.routes")


const rutas_init = () => { // aca se ponen todas las rutas que existen
  const router = Router() // crear una instancia de express.Router()

  router.use("/pacientes", pacienteRoutes)
  router.use("/medicos", medicoRoutes)
  router.use("/pacientes-medicos", pacienteMedicoRoutes)

  return router // retornar el router
};

const rutas_auth = () => {
  const router = Router()

  router.use("/auth", authRoutes)

  return router
}

module.exports = { rutas_init } // exportar el archivo de rutas de la api