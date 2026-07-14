// FUNCIONAMIENTO DE TODAS LAS RUTAS DE TRATAMIENTO

const models = require("../database/models/index")
const errors = require("../const/errors")

module.exports = {

    listar: async (req, res, next) => {
        try {
            const tratamientos = await models.tratamiento.findAll({
                include: [
                    {
                        model: models.paciente
                    },
                    {
                        model: models.medico,
                        attributes: { exclude: ['password'] }
                    }
                ]
            })

            res.json({
                success: true,
                data: {
                    tratamientos: tratamientos
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    listarInfo: async (req, res, next) => {
        try {
            const tratamiento = await models.tratamiento.findOne({
                where: {
                    id: req.params.idTratamiento
                },
                include: [
                    {
                        model: models.paciente
                    },
                    {
                        model: models.medico,
                        attributes: { exclude: ['password'] }
                    }
                ]
            })
            if (!tratamiento) return next(errors.TratamientoInexistente)

            res.json({
                success: true,
                data: {
                    tratamiento: tratamiento
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    crear: async (req, res, next) => {
        try {
            const tratamiento = await models.tratamiento.create(req.body)

            res.status(201).location(`/tratamientos/${tratamiento.id}`).json({
                success: true,
                data: {
                    id: tratamiento.id
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    actualizar: async (req, res, next) => {
        try {
            const tratamiento = await models.tratamiento.findOne({
                where: {
                    id: req.params.idTratamiento
                }
            })
            if (!tratamiento) return next(errors.TratamientoInexistente)

            if (req.body.pacienteId) {
                const paciente = await models.paciente.findOne({
                    where: {
                        id: req.body.pacienteId
                    }
                })
                if (!paciente) return next(errors.PacienteInexistente)
            }

            if (req.body.medicoId) {
                const medico = await models.medico.findOne({
                    where: {
                        id: req.body.medicoId
                    }
                })
                if (!medico) return next(errors.MedicoInexistente)
            }

            await tratamiento.update(req.body)

            res.json({
                success: true,
                data: {
                    id: tratamiento.id
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    eliminar: async (req, res, next) => {
        try {
            const tratamiento = await models.tratamiento.findOne({
                where: {
                    id: req.params.idTratamiento
                }
            })
            if (!tratamiento) return next(errors.TratamientoInexistente)

            await tratamiento.destroy()

            res.status(204).send()

        } catch (err) {
            return next(err)
        }
    },

}
