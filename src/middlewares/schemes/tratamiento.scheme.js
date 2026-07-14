const Joi = require('joi')

let crearTratamiento = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string(),
    pacienteId: Joi.number().integer().min(1).required(),
    medicoId: Joi.number().integer().min(1).required(),
})

let actualizarTratamiento = Joi.object({
    nombre: Joi.string(),
    descripcion: Joi.string(),
    pacienteId: Joi.number().integer().min(1),
    medicoId: Joi.number().integer().min(1),
}).min(1)

module.exports = {
    crearTratamiento,
    actualizarTratamiento,
}
