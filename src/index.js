require("dotenv").config();

const express = require("express");
const { rutas_init } = require("./routes/index.routes");

const globalConstants = require("./const/globalConstants");
const PORT = globalConstants.PORT;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "API funcionando correctamente" });
});

app.use(rutas_init());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});