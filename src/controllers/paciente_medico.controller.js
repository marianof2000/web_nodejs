const models = require("../database/models/index")

module.exports = {
    listar: async (req, res, next) => {
        try {
            const relaciones = await models.paciente_medico.findAll({
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
                    relaciones: relaciones
                }
            })

        } catch (err) {
            return next(err)
        }
    }
}
