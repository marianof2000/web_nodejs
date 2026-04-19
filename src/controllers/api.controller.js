// CONTROLADORES GENERALES DE LA API

// =========================
// MEDICOS
// =========================
const pruebaMedicos = (req, res) => {
  res.json({ mensaje: "Ruta de prueba de medicos" });
};

const listarMedicos = (req, res) => {
  res.json({ mensaje: "Listado de medicos" });
};

const crearMedicos = (req, res) => {
  res.json({ mensaje: "Medico creado correctamente" });
};

const listarInfoMedicos = (req, res) => {
  res.json({ mensaje: `Información del medico ${req.params.idMedico}` });
};

// =========================
// PACIENTES
// =========================
const pruebaPacientes = (req, res) => {
  res.json({ mensaje: "Ruta de prueba de pacientes" });
};

const listarPacientes = (req, res) => {
  res.json({ mensaje: "Listado de pacientes" });
};

const crearPacientes = (req, res) => {
  res.json({ mensaje: "Paciente creado correctamente" });
};

const listarInfoPacientes = (req, res) => {
  res.json({ mensaje: `Información del paciente ${req.params.idPaciente}` });
};

// =========================
// TRATAMIENTOS
// =========================
const pruebaTratamientos = (req, res) => {
  res.json({ mensaje: "Ruta de prueba de tratamientos" });
};

const listarTratamientos = (req, res) => {
  res.json({ mensaje: "Listado de tratamientos" });
};

const crearTratamientos = (req, res) => {
  res.json({ mensaje: "Tratamiento creado correctamente" });
};

const listarInfoTratamientos = (req, res) => {
  res.json({ mensaje: `Información del tratamiento ${req.params.idTratamiento}` });
};

module.exports = {
  // médicos
  pruebaMedicos,
  listarMedicos,
  crearMedicos,
  listarInfoMedicos,

  // pacientes
  pruebaPacientes,
  listarPacientes,
  crearPacientes,
  listarInfoPacientes,

  // tratamientos
  pruebaTratamientos,
  listarTratamientos,
  crearTratamientos,
  listarInfoTratamientos
};