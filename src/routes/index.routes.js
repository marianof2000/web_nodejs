// SE ENCARGA DE CONECTAR TODAS LAS RUTAS

const { Router } = require("express");

const medicosRoutes = require("./medicos");
const pacientesRoutes = require("./pacientes");
const tratamientosRoutes = require("./tratamientos");

const rutas_init = () => {
  const router = Router();

  router.use("/medicos", medicosRoutes);
  router.use("/pacientes", pacientesRoutes);
  router.use("/tratamientos", tratamientosRoutes);

  return router;
};

module.exports = { rutas_init };