module.exports = {

    'ValidationError': {
        code: 1000,
        message: 'Error de validacion'
    },
    'FaltanCampos': {
        code: 1001,
        message: 'Faltan parámetros necesarios'
    },
    'PacienteInexistente': {
        code: 1003,
        message: 'El paciente no existe'
    },
    'MedicoInexistente': {
        code: 1004,
        message: 'El medico no existe'
    },
    'TratamientoInexistente': {
        code: 1005,
        message: 'El tratamiento no existe'
    },
    'TurnoInexistente': {
        code: 1009,
        message: 'El turno no existe'
    },
    'TurnoOcupado': {
        code: 1010,
        message: 'El medico ya tiene un turno en esa fecha y hora'
    },
    'RelacionPacienteMedicoInexistente': {
        code: 1011,
        message: 'La relacion entre paciente y medico no existe'
    },
    'RelacionPacienteMedicoExistente': {
        code: 1012,
        message: 'La relacion entre paciente y medico ya existe'
    },
    'CredencialesInvalidas': {
        code: 1006,
        message: 'Credenciales invalidas'
    },
    'MedicoNoAutorizado': {
        code: 1007,
        message: 'Médico no autorizado'
    },
    "SesionExpirada": {
        code: 1008,
        message: 'Sesión expirada'
    }

}
