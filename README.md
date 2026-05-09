# web_nodejs
# Trabajo Práctico 1 y 2 - API REST con NodeJS y Express
### Cursante: Francisco, Mariano Daniel
#### DNI 21094267 - Mat: 2347

## Descripción

Este proyecto corresponde al Trabajo Práctico 1 del curso de Desarrollo de Servicios Web con NodeJS.

El objetivo es construir una API REST básica utilizando **NodeJS** y **Express**, planteando la estructura inicial del proyecto y simulando el funcionamiento de distintas rutas mediante respuestas en formato JSON.

En esta primera etapa no se implementa base de datos ni lógica de negocio real. Las rutas únicamente devuelven mensajes simulando el comportamiento esperado de cada endpoint.

Trabajo Práctico N° 2: Agregar modelos de base de datos con Sequelize y darle funcionalidad a las rutas.

Trabajo Final: Agregar JWT al proyecto

---

## Tecnologías utilizadas

- NodeJS
- Express
- Dotenv
- Sequelize
- PostgreSQL
- pg
- pg-hstore
- Nodemon
- joi
- Multer

---

## Estructura del proyecto

```text
proyecto_nodejs_TP1/
├── package.json
├── package-lock.json
├── .sequelizerc
├── .env
├── .gitignore
├── README.md
└── src/
    ├── index.js
    ├── const/
    │   ├── errors.js
    │   └── globalConstants.js
    ├── controllers/
    │   ├── medicos.controller.js
    │   ├── pacientes.controller.js
    │   └── tratamientos.controller.js
    ├── routes/
    │   ├── index.routes.js
    │   ├── medicos.js
    │   ├── pacientes.js
    │   └── tratamientos.js
    ├── middlewares/
    │   ├── error.js
    │   ├── validate.js
    │   └── scheme/
    │       ├── medico.scheme.js
    │       ├── paciente.scheme.js
    │       └── tratamiento.scheme.js
    └── database/
        ├── config/
        │   └── config.js
        ├── models/
        │   ├── index.js
        │   ├── medico.js
        │   ├── paciente.js
        │   ├── paciente-medico.js
        │   └── tratamiento.js
        ├── migrations/
        └── seeders/
            ├── 000-medicos.js
            ├── 100-pacientes.js
            ├── 200-paciente-medico.js
            └── 300-tratamientos.js
```

## Descripción de carpetas principales

```md
- `src/index.js`: archivo principal de la API. Configura Express, middlewares, rutas y puerto de ejecución.
- `src/routes/`: contiene las rutas de la API, separadas por recurso.
- `src/controllers/`: contiene la lógica de cada endpoint. Los controladores reciben la petición, consultan la base de datos y devuelven la respuesta.
- `src/database/models/`: contiene los modelos Sequelize que representan las tablas de la base de datos.
- `src/database/config/`: contiene la configuración de conexión a PostgreSQL.
- `src/database/seeders/`: contiene datos iniciales de prueba para cargar la base de datos.
- `src/database/migrations/`: contiene migraciones de Sequelize, si se agregan cambios estructurales en la base de datos.
- `src/middlewares/`: contiene funciones intermedias de Express, como validación de datos y manejo de errores.
- `src/middlewares/scheme/`: contiene los esquemas Joi usados para validar los datos recibidos por body.
- `src/const/`: contiene constantes globales y errores personalizados.
```