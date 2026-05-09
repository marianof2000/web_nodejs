# web_nodejs
# Trabajo Práctico - API REST con NodeJS
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
- Moment
- Nodemon
- joi
- Multer

---

## Para ejecutar el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Crear el archivo `.env` tomando como referencia `.env.example` y completar los datos de conexión.

3. Si se usa la base de datos remota, abrir el túnel SSH:

```bash
ssh -L 5433:127.0.0.1:5432 user@200.45.133.87
```

4. Crear la base de datos:

```bash
npm run db:create
```

5. Ejecutar las migraciones:

```bash
npx sequelize-cli db:migrate
```

6. Cargar los seeders:

```bash
npm run db:seed
```

7. Iniciar el servidor:

```bash
npm start
```

La API queda disponible en el puerto configurado en `.env`.

---

## Conexión a la base de datos

Conectar a la base de datos remota con: 

ssh -L 5433:127.0.0.1:5432 user@200.45.133.87

password: ***

---

## Estructura del proyecto

```text
Web_NodeJS_TP/
├── package.json
├── package-lock.json
├── .sequelizerc
├── .env
├── .env.example
├── .gitignore
├── README.md
└── src/
    ├── index.js
    ├── const/
    │   ├── errors.js
    │   └── globalConstants.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── medico.controller.js
    │   ├── paciente.controller.js
    │   └── paciente_medico.controller.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── index.routes.js
    │   ├── medico.routes.js
    │   ├── paciente.routes.js
    │   └── paciente_medico.routes.js
    ├── middlewares/
    │   ├── decodeJWT.js
    │   ├── error.js
    │   ├── signJWT.js
    │   ├── validate.js
    │   └── schemes/
    │       ├── auth.scheme.js
    │       ├── medico.scheme.js
    │       └── paciente.scheme.js
    └── database/
        ├── config/
        │   └── config.js
        ├── models/
        │   ├── index.js
        │   ├── medico.js
        │   ├── paciente.js
        │   └── paciente_medico.js
        ├── migrations/
        │   ├── medico-agregar-password.js
        │   └── paciente-agregar-sintoma.js
        └── seeders/
            ├── crear_medicos_nuevos.js
            └── crear_pacientes.js
```
---

## Descripción de carpetas principales

- `src/index.js`: archivo principal de la API. Configura Express, middlewares, rutas y puerto de ejecución.
- `src/routes/`: contiene las rutas de la API separadas por recurso: autenticación, pacientes, médicos y relaciones entre pacientes y médicos.
- `src/controllers/`: contiene la lógica de cada endpoint. Los controladores reciben la petición, consultan o modifican la base de datos y devuelven la respuesta.
- `src/database/models/`: contiene los modelos Sequelize que representan las tablas de la base de datos y sus asociaciones.
- `src/database/config/`: contiene la configuración de conexión a PostgreSQL.
- `src/database/seeders/`: contiene datos iniciales de prueba para cargar médicos, pacientes y relaciones entre ambos.
- `src/database/migrations/`: contiene migraciones de Sequelize para aplicar cambios estructurales en la base de datos.
- `src/middlewares/`: contiene funciones intermedias de Express, como validación de datos, manejo centralizado de errores y generación/decodificación de JWT.
- `src/middlewares/schemes/`: contiene los esquemas Joi usados para validar los datos recibidos por body antes de llegar a los controladores.
- `src/const/`: contiene constantes globales y errores personalizados.
