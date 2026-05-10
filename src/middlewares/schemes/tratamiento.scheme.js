const Joi = require('joi')

let crearTratamiento = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string(),
    pacienteId: Joi.number().integer().min(1).required(),
    medicoId: Joi.number().integer().min(1).required(),
})

module.exports = {
    crearTratamiento,
}
