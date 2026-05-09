const jwt = require('jsonwebtoken') // para crear el token
const globalConstants = require('../const/globalConstants')

module.exports = function (medico) { // recibe el usuario por parametro

    if (medico) {

        // Se crea el token con los datos del usuario
        const token = jwt.sign({
            id: medico.id
        },
            globalConstants.JWT_SECRET, // clave secreta para encriptar el token
            {
                expiresIn: '3000m' // expira en 3 horas
            }
        )
        return token // devuelvo el token
    } else {
        return null // si no hay usuario, devuelvo null
    }


}