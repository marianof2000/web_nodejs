const models = require("../database/models/index")
const errors = require("../const/errors")

const includePacienteMedico = [
    {
        model: models.paciente
    },
    {
        model: models.medico,
        attributes: { exclude: ['password'] }
    }
]

const buscarPaciente = async (id) => {
    return models.paciente.findOne({
        where: {
            id
        }
    })
}

const buscarMedico = async (id) => {
    return models.medico.findOne({
        where: {
            id
        },
        attributes: { exclude: ['password'] }
    })
}

const buscarRelacion = async ({ pacienteId, medicoId }) => {
    return models.paciente_medico.findOne({
        where: {
            pacienteId,
            medicoId
        }
    })
}

module.exports = {
    listar: async (req, res, next) => {
        try {
            const relaciones = await models.paciente_medico.findAll({
                include: includePacienteMedico
            })

            res.json({
                success: true,
                data: {
                    relaciones: relaciones
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    listarMedicosPorPaciente: async (req, res, next) => {
        try {
            const paciente = await buscarPaciente(req.params.idPaciente)
            if (!paciente) return next(errors.PacienteInexistente)

            const relaciones = await models.paciente_medico.findAll({
                where: {
                    pacienteId: req.params.idPaciente
                },
                include: [
                    {
                        model: models.medico,
                        attributes: { exclude: ['password'] }
                    }
                ]
            })

            res.json({
                success: true,
                data: {
                    pacienteId: req.params.idPaciente,
                    medicos: relaciones.map(relacion => relacion.medico)
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    listarPacientesPorMedico: async (req, res, next) => {
        try {
            const medico = await buscarMedico(req.params.idMedico)
            if (!medico) return next(errors.MedicoInexistente)

            const relaciones = await models.paciente_medico.findAll({
                where: {
                    medicoId: req.params.idMedico
                },
                include: [
                    {
                        model: models.paciente
                    }
                ]
            })

            res.json({
                success: true,
                data: {
                    medicoId: req.params.idMedico,
                    pacientes: relaciones.map(relacion => relacion.paciente)
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    crear: async (req, res, next) => {
        try {
            const pacienteId = req.params.idPaciente
            const medicoId = req.params.idMedico

            const paciente = await buscarPaciente(pacienteId)
            if (!paciente) return next(errors.PacienteInexistente)

            const medico = await buscarMedico(medicoId)
            if (!medico) return next(errors.MedicoInexistente)

            const relacionExistente = await buscarRelacion({ pacienteId, medicoId })
            if (relacionExistente) return next(errors.RelacionPacienteMedicoExistente)

            const relacion = await models.paciente_medico.create({
                pacienteId,
                medicoId
            })

            res.status(201).location(`/pacientes/${pacienteId}/medicos/${medicoId}`).json({
                success: true,
                data: {
                    id: relacion.id,
                    pacienteId,
                    medicoId
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    eliminar: async (req, res, next) => {
        try {
            const pacienteId = req.params.idPaciente
            const medicoId = req.params.idMedico

            const paciente = await buscarPaciente(pacienteId)
            if (!paciente) return next(errors.PacienteInexistente)

            const medico = await buscarMedico(medicoId)
            if (!medico) return next(errors.MedicoInexistente)

            const relacion = await buscarRelacion({ pacienteId, medicoId })
            if (!relacion) return next(errors.RelacionPacienteMedicoInexistente)

            await relacion.destroy()

            res.status(204).send()

        } catch (err) {
            return next(err)
        }
    },
}
