// SE ENCARGA DE CONECTAR TODAS LAS RUTAS

const { Router } = require("express"); // importar express

const medicosRoutes = require("./medicos"); // importar el archivo de rutas de médicos
const pacientesRoutes = require("./pacientes"); // importar el archivo de rutas de pacientes
const tratamientosRoutes = require("./tratamientos"); // importar el archivo de rutas de tratamientos

const rutas_init = () => { // aca se ponen todas las rutas que existen
  const router = Router(); // crear una instancia de express.Router()

  router.use("/medicos", medicosRoutes); // para acceder a las rutas de médicos siempre deberá empezar con /medicos
  router.use("/pacientes", pacientesRoutes); // para acceder a las rutas de pacientes siempre deberá empezar con /pacientes
  router.use("/tratamientos", tratamientosRoutes); // para acceder a las rutas de tratamientos siempre deberá empezar con /tratamientos

  return router; // retornar el router
};

module.exports = { rutas_init }; // exportar el archivo de rutas de la api