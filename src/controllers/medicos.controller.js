// CONTROLADORES DE MEDICOS

const prueba = (req, res) => {
  res.json({ mensaje: "Ruta de prueba de medicos" });
};

const listar = (req, res) => {
  res.json({ mensaje: "Listado de medicos" });
};

const crear = (req, res) => {
  res.json({ mensaje: "Medico creado correctamente" });
};

const listarInfo = (req, res) => {
  res.json({ mensaje: `Información del medico ${req.params.idMedico}` });
};

module.exports = {
  prueba,
  listar,
  crear,
  listarInfo,
};