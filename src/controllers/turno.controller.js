// FUNCIONAMIENTO DE TODAS LAS RUTAS DE TURNO

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

const existeTurnoParaMedico = async ({ medicoId, fecha, hora, idTurno }) => {
    const where = {
        medicoId,
        fecha,
        hora
    }

    if (idTurno) {
        where.id = {
            [models.Sequelize.Op.ne]: idTurno
        }
    }

    return models.turno.findOne({ where })
}

module.exports = {

    listar: async (req, res, next) => {
        try {
            const where = {}

            if (req.query.medicoId) where.medicoId = req.query.medicoId
            if (req.query.pacienteId) where.pacienteId = req.query.pacienteId
            if (req.query.fecha) where.fecha = req.query.fecha

            const turnos = await models.turno.findAll({
                where,
                include: includePacienteMedico
            })

            res.json({
                success: true,
                data: {
                    turnos: turnos
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    listarInfo: async (req, res, next) => {
        try {
            const turno = await models.turno.findOne({
                where: {
                    id: req.params.idTurno
                },
                include: includePacienteMedico
            })
            if (!turno) return next(errors.TurnoInexistente)

            res.json({
                success: true,
                data: {
                    turno: turno
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    crear: async (req, res, next) => {
        try {
            const paciente = await models.paciente.findOne({
                where: {
                    id: req.body.pacienteId
                }
            })
            if (!paciente) return next(errors.PacienteInexistente)

            const medico = await models.medico.findOne({
                where: {
                    id: req.body.medicoId
                }
            })
            if (!medico) return next(errors.MedicoInexistente)

            const turnoExistente = await existeTurnoParaMedico(req.body)
            if (turnoExistente) return next(errors.TurnoOcupado)

            const turno = await models.turno.create(req.body)

            res.status(201).location(`/turnos/${turno.id}`).json({
                success: true,
                data: {
                    id: turno.id
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    actualizar: async (req, res, next) => {
        try {
            const turno = await models.turno.findOne({
                where: {
                    id: req.params.idTurno
                }
            })
            if (!turno) return next(errors.TurnoInexistente)

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

            const datosTurno = {
                pacienteId: req.body.pacienteId || turno.pacienteId,
                medicoId: req.body.medicoId || turno.medicoId,
                fecha: req.body.fecha || turno.fecha,
                hora: req.body.hora || turno.hora
            }

            const turnoExistente = await existeTurnoParaMedico({
                ...datosTurno,
                idTurno: turno.id
            })
            if (turnoExistente) return next(errors.TurnoOcupado)

            await turno.update(req.body)

            res.json({
                success: true,
                data: {
                    id: turno.id
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    eliminar: async (req, res, next) => {
        try {
            const turno = await models.turno.findOne({
                where: {
                    id: req.params.idTurno
                }
            })
            if (!turno) return next(errors.TurnoInexistente)

            await turno.destroy()

            res.status(204).send()

        } catch (err) {
            return next(err)
        }
    },

}
