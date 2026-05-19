const errors = require('../const/errors')

module.exports = function (err, req, res, next) {

  let status = err.status || err.statusCode || 500

  let response = {
    success: false,
    error: {
      code: err.code || 500, // si no hay un codigo de error, se asigna 500
      message: err.message || 'Internal server error' // si no hay un mensaje de error, se asigna 'Internal server error'
    }
  }

  // si el error es de Joi, es decir, si el error es de validacion
  if (err.isJoi) {
    status = 400
    let validationErrorType = err.details[0].type // obtener el tipo de error de validacion
    let errorKey = 'ValidationError' 
    if (validationErrorType === 'any.required') { // si el error es de validacion de campos requeridos
      errorKey = 'FaltanCampos'
    }
    response.error.code = errors[errorKey].code // asignar el codigo de error correspondiente
    response.error.message = errors[errorKey].message // asignar el mensaje de error correspondiente
  }


  // si el error es de NotFound
  if (err.message === 'Not Found') { 
    status = 404
    response.error.code = 404 
    response.error.message = 'Not Found'
  }

  if (
    err === errors.CredencialesInvalidas ||
    err === errors.MedicoNoAutorizado ||
    err === errors.SesionExpirada
  ) {
    status = 401
  }

  if (
    err === errors.PacienteInexistente ||
    err === errors.MedicoInexistente ||
    err === errors.TratamientoInexistente ||
    err === errors.TurnoInexistente
  ) {
    status = 404
  }

  if (err === errors.TurnoOcupado) {
    status = 409
  }

  res.status(status).json(response) // envia la respuesta al cliente
}
