const Joi = require('joi')

const estadosTurno = ['pendiente', 'confirmado', 'cancelado', 'atendido']

let crearTurno = Joi.object({
    pacienteId: Joi.number().integer().min(1).required(),
    medicoId: Joi.number().integer().min(1).required(),
    fecha: Joi.date().iso().required(),
    hora: Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/).required(),
    motivo: Joi.string(),
    estado: Joi.string().valid(...estadosTurno)
})

let actualizarTurno = Joi.object({
    pacienteId: Joi.number().integer().min(1),
    medicoId: Joi.number().integer().min(1),
    fecha: Joi.date().iso(),
    hora: Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/),
    motivo: Joi.string(),
    estado: Joi.string().valid(...estadosTurno)
}).min(1)

module.exports = {
    crearTurno,
    actualizarTurno,
}
