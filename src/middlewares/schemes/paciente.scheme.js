const Joi = require('joi')

let crearPaciente = Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    email: Joi.string().email().optional(),
    edad: Joi.number().integer().min(0),
    obra_social: Joi.string(),
    medicoId: Joi.number().integer().min(1)
})

let actualizarPaciente = Joi.object({
    nombre: Joi.string(),
    apellido: Joi.string(),
    email: Joi.string().email().optional(),
    edad: Joi.number().integer().min(0),
    obra_social: Joi.string(),
}).min(1)

module.exports = {
    crearPaciente,
    actualizarPaciente,
}
