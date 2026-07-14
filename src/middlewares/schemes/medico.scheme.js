const Joi = require('joi')

let crearMedico = Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    email: Joi.string().email().optional(),
    especialidad: Joi.string(),
    tiempo_trabajando: Joi.number().integer().min(0),
    password: Joi.string().required(),
})

let actualizarMedico = Joi.object({
    nombre: Joi.string(),
    apellido: Joi.string(),
    email: Joi.string().email().optional(),
    especialidad: Joi.string(),
    tiempo_trabajando: Joi.number().integer().min(0),
    password: Joi.string(),
}).min(1)

module.exports = {
    crearMedico,
    actualizarMedico,
}
