// ESTAN TODAS LAS CONSTANTES DE LA API EN ESTE ARCHIVO

require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 5000, // obtener el puerto de la aplicación desde el archivo .env o si no existe, usar el puerto 5000
    DB_USERNAME: process.env.DB_USERNAME || "postgres", // obtener el nombre de usuario de la base de datos desde el archivo .env o si no existe, usar "postgres"
    DB_PASSWORD: process.env.DB_PASSWORD || "postgres", // obtener la contraseña de la base de datos desde el archivo .env o si no existe, usar "postgres"
    DB_NAME: process.env.DB_NAME || "postgres", // obtener el nombre de la base de datos desde el archivo .env o si no existe, usar "postgres"

}