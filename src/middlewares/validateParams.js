const errors = require('../const/errors')

module.exports = (...paramNames) => {
    return (req, res, next) => {
        const invalidParam = paramNames.find((paramName) => {
            const value = req.params[paramName]
            return !/^[1-9]\d*$/.test(String(value))
        })

        if (invalidParam) {
            return next({
                status: 400,
                code: errors.ValidationError.code,
                message: `Parametro invalido: ${invalidParam}`
            })
        }

        next()
    }
}
