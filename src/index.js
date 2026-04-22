// Index del proyecto

require("dotenv").config();

const express = require("express");
const { rutas_init } = require("./routes/index.routes");
const globalConstants = require("./const/globalConstants");
const { testDBConnection } = require("./database/config/db.js");

const PORT = globalConstants.PORT;

testDBConnection();

const crearAplicacion = () => {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ mensaje: "API funcionando correctamente" });
  });

  app.use(rutas_init());

  return app;
};

const iniciarServidor = () => {
  const app = crearAplicacion();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

iniciarServidor();