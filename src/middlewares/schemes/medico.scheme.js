const Joi = require('joi')

let crearMedico = Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    email: Joi.string().email().optional(),
    especialidad: Joi.string(),
    tiempo_trabajando: Joi.number().integer().min(0),
    password: Joi.string().required(),
})

module.exports = {
    crearMedico,
}
