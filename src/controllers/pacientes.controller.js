// CONTROLADORES DE PACIENTES

const prueba = (req, res) => {
  res.json({ mensaje: "Ruta de prueba de pacientes" });
};

const listar = (req, res) => {
  res.json({ mensaje: "Listado de pacientes" });
};

const crear = (req, res) => {
  res.json({ mensaje: "Paciente creado correctamente" });
};

const listarInfo = (req, res) => {
  res.json({ mensaje: `Información del paciente ${req.params.idPaciente}` });
};

module.exports = {
  prueba,
  listar,
  crear,
  listarInfo,
};