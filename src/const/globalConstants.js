// ESTAN TODAS LAS CONSTANTES DE LA API EN ESTE ARCHIVO

require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 8000, // obtener el puerto de la aplicación desde el archivo .env o si no existe, usar el puerto 8000
    DB_USERNAME: process.env.DB_USERNAME || "postgres", // obtener el nombre de usuario de la base de datos desde el archivo .env o si no existe, usar "postgres"
    DB_PASSWORD: process.env.DB_PASSWORD || "postgres", // obtener la contraseña de la base de datos desde el archivo .env o si no existe, usar "postgres"
    DB_NAME: process.env.DB_NAME || "postgres", // obtener el nombre de la base de datos desde el archivo .env o si no existe, usar "postgres"
    DB_HOST: process.env.DB_HOST || "127.0.0.1", // obtener el host de la base de datos desde el archivo .env o si no existe, usar "127.0.0.1"
    DB_PORT: process.env.DB_PORT || 5432, // obtener el puerto de la base de datos desde el archivo .env o si no existe, usar 5432
    JWT_SECRET: process.env.JWT_SECRET || "secret", // obtener la clave secreta para encriptar el token desde el archivo .env
}
