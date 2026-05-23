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

## Para ejecutar con Docker en un VPS

1. Copiar el proyecto al servidor.

2. Crear el archivo `.env` tomando como base `.env.example` y cambiar `JWT_SECRET` por una clave segura.

3. Crear una red Docker compartida, si todavía no existe:

```bash
docker network create tp2_net
```

4. Conectar el contenedor PostgreSQL existente a esa red:

```bash
docker network connect tp2_net postgres_tp2
```

Si el contenedor ya estaba conectado, Docker puede indicar que ya pertenece a esa red.

5. Levantar la API:

```bash
docker compose up -d --build
```

6. Ver logs de la API:

```bash
docker compose logs -f api
```

7. Cargar datos iniciales, si se necesitan:

```bash
docker compose exec api npm run db:seed
```

La API queda disponible en:

```text
http://IP_DEL_SERVIDOR:8000
```

Para detener los contenedores:

```bash
docker compose down
```

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
    │   ├── paciente_medico.controller.js
    │   └── tratamiento.controller.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── index.routes.js
    │   ├── medico.routes.js
    │   ├── paciente.routes.js
    │   ├── paciente_medico.routes.js
    │   └── tratamiento.routes.js
    ├── middlewares/
    │   ├── decodeJWT.js
    │   ├── error.js
    │   ├── signJWT.js
    │   ├── validate.js
    │   └── schemes/
    │       ├── auth.scheme.js
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
        │   ├── paciente_medico.js
        │   └── tratamiento.js
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
- `src/routes/`: contiene las rutas de la API separadas por recurso: autenticación, pacientes, médicos, relaciones entre pacientes y médicos, y tratamientos.
- `src/controllers/`: contiene la lógica de cada endpoint. Los controladores reciben la petición, consultan o modifican la base de datos y devuelven la respuesta.
- `src/database/models/`: contiene los modelos Sequelize que representan las tablas de la base de datos y sus asociaciones.
- `src/database/config/`: contiene la configuración de conexión a PostgreSQL.
- `src/database/seeders/`: contiene datos iniciales de prueba para cargar médicos, pacientes y relaciones entre ambos.
- `src/database/migrations/`: contiene migraciones de Sequelize para aplicar cambios estructurales en la base de datos.
- `src/middlewares/`: contiene funciones intermedias de Express, como validación de datos, manejo centralizado de errores y generación/decodificación de JWT.
- `src/middlewares/schemes/`: contiene los esquemas Joi usados para validar los datos recibidos por body antes de llegar a los controladores.
- `src/const/`: contiene constantes globales y errores personalizados.

---

## Endpoints principales

### Tratamientos

- `GET /tratamientos`: lista todos los tratamientos, incluyendo la información del paciente y del médico asociados.
- `GET /tratamientos/:idTratamiento`: obtiene la información de un tratamiento puntual.
- `POST /tratamientos`: crea un nuevo tratamiento.

Ejemplo de body para crear un tratamiento:

```json
{
  "nombre": "Kinesiologia",
  "descripcion": "Tratamiento semanal",
  "pacienteId": 1,
  "medicoId": 1
}
```

---

## Testeo de Endpoints

Los siguientes ejemplos usan `curl`.

### Pacientes

Listar pacientes:

```bash
curl http://localhost:8000/pacientes
```

Obtener un paciente por ID:

```bash
curl http://localhost:8000/pacientes/1
```

Crear un paciente:

```bash
curl -X POST http://localhost:8000/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Perez",
    "email": "juan.perez@example.com",
    "edad": 35,
    "obra_social": "OSDE",
    "medicoId": 1
  }'
```

### Médicos

Listar médicos:

```bash
curl http://localhost:8000/medicos
```

Obtener un médico por ID:

```bash
curl http://localhost:8000/medicos/1
```

Crear un médico:

```bash
curl -X POST http://localhost:8000/medicos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana",
    "apellido": "Gomez",
    "email": "ana.gomez@example.com",
    "especialidad": "Clinica medica",
    "tiempo_trabajando": 8,
    "password": "123456"
  }'
```

### Pacientes y Médicos

Listar relaciones entre pacientes y médicos:

```bash
curl http://localhost:8000/pacientes-medicos
```

### Tratamientos

Listar tratamientos:

```bash
curl http://localhost:8000/tratamientos
```

Obtener un tratamiento por ID:

```bash
curl http://localhost:8000/tratamientos/1
```

Crear un tratamiento:

```bash
curl -X POST http://localhost:8000/tratamientos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Kinesiologia",
    "descripcion": "Tratamiento semanal",
    "pacienteId": 1,
    "medicoId": 1
  }'
```

### Autenticación

Login:

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ana.gomez@example.com",
    "password": "123456"
  }'
```
