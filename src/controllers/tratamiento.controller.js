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
                        model: models.medico
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
                        model: models.medico
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

}
