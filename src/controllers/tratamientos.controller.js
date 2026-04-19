// CONTROLADORES DE TRATAMIENTOS

const prueba = (req, res) => {
  res.json({ mensaje: "Ruta de prueba de tratamientos" });
};

const listar = (req, res) => {
  res.json({ mensaje: "Listado de tratamientos" });
};

const crear = (req, res) => {
  res.json({ mensaje: "Tratamiento creado correctamente" });
};

const listarInfo = (req, res) => {
  res.json({ mensaje: `Información del tratamiento ${req.params.idTratamiento}` });
};

module.exports = {
  prueba,
  listar,
  crear,
  listarInfo,
};