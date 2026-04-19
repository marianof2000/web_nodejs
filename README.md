# web_nodejs
# Trabajo Práctico 1 - API REST con NodeJS y Express
### Cursante: Francisco, Mariano Daniel - DNI 21094267

# Trabajo Práctico 1 - API REST con NodeJS y Express

## Descripción

Este proyecto corresponde al Trabajo Práctico 1 del curso de Desarrollo de Servicios Web con NodeJS.

El objetivo es construir una API REST básica utilizando **NodeJS** y **Express**, planteando la estructura inicial del proyecto y simulando el funcionamiento de distintas rutas mediante respuestas en formato JSON.

En esta primera etapa no se implementa base de datos ni lógica de negocio real. Las rutas únicamente devuelven mensajes simulando el comportamiento esperado de cada endpoint.

---

## Tecnologías utilizadas

- NodeJS
- Express
- Dotenv

---

## Estructura del proyecto

```text
proyecto_nodejs/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── src/
    ├── index.js
    ├── const/
    │   └── globalConstants.js
    ├── controllers/
    │   └── api.controller.js
    └── routes/
        ├── index.routes.js
        ├── api.routes.js
        ├── medicos.js
        ├── pacientes.js
        └── tratamientos.js
```