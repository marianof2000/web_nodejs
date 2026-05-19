// FUNCIONAMIENTO DE TODAS LAS RUTAS DE MEDICO

const models = require("../database/models/index")
const errors = require("../const/errors")
const bcrypt = require("bcryptjs")

module.exports = {

    listar: async (req, res, next) => {
        try {
            const medicos = await models.medico.findAll({
                attributes: { exclude: ['password'] }
            })

            res.json({
                success: true,
                data: {
                    medicos: medicos
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    listarInfo: async (req, res, next) => {
        try {
            const medico = await models.medico.findOne({
                where: {
                    id: req.params.idMedico
                },
                attributes: { exclude: ['password'] }
            })
            if (!medico) return next(errors.MedicoInexistente)

            res.json({
                success: true,
                data: {
                    medico: medico
                }
            })

        } catch (err) {
            return next(err)
        }
    },

    crear: async (req, res, next) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
            const medico = await models.medico.create(req.body)

            res.json({
                success: true,
                data: {
                    id: medico.id
                }
            })

        } catch (err) {
            return next(err)
        }
    },

}
