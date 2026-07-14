jest.mock('../src/database/models/index', () => ({
    sequelize: {
        transaction: jest.fn()
    },
    Sequelize: {
        Op: {
            ne: Symbol('ne')
        }
    },
    medico: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn()
    },
    paciente: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn()
    },
    paciente_medico: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn()
    },
    tratamiento: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn()
    },
    turno: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn()
    }
}))

const validate = require('../src/middlewares/validate')
const validateParams = require('../src/middlewares/validateParams')
const decodeJWT = require('../src/middlewares/decodeJWT')
const authScheme = require('../src/middlewares/schemes/auth.scheme')
const medicoController = require('../src/controllers/medico.controller')
const pacienteController = require('../src/controllers/paciente.controller')
const pacienteMedicoController = require('../src/controllers/paciente_medico.controller')
const tratamientoController = require('../src/controllers/tratamiento.controller')
const turnoController = require('../src/controllers/turno.controller')
const errors = require('../src/const/errors')
const models = require('../src/database/models/index')

const createResponse = () => ({
    status: jest.fn().mockReturnThis(),
    location: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
    locals: {}
})

describe('Auth validations', () => {
    test('registrarse no permite requests sin email', () => {
        const req = {
            body: {
                nombre: 'Juan',
                apellido: 'Perez',
                password: '123456'
            }
        }
        const res = {}
        const next = jest.fn()

        validate(authScheme.registrarse)(req, res, next)

        expect(next).toHaveBeenCalledTimes(1)
        expect(next.mock.calls[0][0].isJoi).toBe(true)
        expect(next.mock.calls[0][0].details[0].path).toEqual(['email'])
        expect(models.medico.create).not.toHaveBeenCalled()
    })
})

describe('Validacion de parametros', () => {
    test('rechaza ids no numericos con error 400', () => {
        const req = { params: { idPaciente: 'abc' } }
        const res = {}
        const next = jest.fn()

        validateParams('idPaciente')(req, res, next)

        expect(next).toHaveBeenCalledWith({
            status: 400,
            code: errors.ValidationError.code,
            message: 'Parametro invalido: idPaciente'
        })
    })

    test('permite ids enteros positivos', () => {
        const req = { params: { idPaciente: '1', idMedico: '2' } }
        const res = {}
        const next = jest.fn()

        validateParams('idPaciente', 'idMedico')(req, res, next)

        expect(next).toHaveBeenCalledWith()
    })
})

describe('JWT middleware', () => {
    test('rechaza requests sin Authorization', async () => {
        const req = {
            header: jest.fn().mockReturnValue(undefined)
        }
        const res = createResponse()
        const next = jest.fn()

        await decodeJWT(req, res, next)

        expect(next).toHaveBeenCalledWith(errors.MedicoNoAutorizado)
    })

    test('rechaza tokens invalidos', async () => {
        const req = {
            header: jest.fn().mockReturnValue('Bearer token-invalido')
        }
        const res = createResponse()
        const next = jest.fn()

        await decodeJWT(req, res, next)

        expect(next).toHaveBeenCalledWith(errors.SesionExpirada)
    })
})

describe('Medicos', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('listar excluye password en la consulta', async () => {
        const medicos = [
            {
                id: 1,
                nombre: 'Ana',
                apellido: 'Gomez',
                email: 'ana.gomez@example.com'
            }
        ]
        models.medico.findAll.mockResolvedValue(medicos)

        const req = {}
        const res = createResponse()
        const next = jest.fn()

        await medicoController.listar(req, res, next)

        expect(models.medico.findAll).toHaveBeenCalledWith({
            attributes: { exclude: ['password'] }
        })
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: { medicos }
        })
        expect(next).not.toHaveBeenCalled()
    })

    test('listarInfo excluye password en la consulta', async () => {
        const medico = {
            id: 1,
            nombre: 'Ana',
            apellido: 'Gomez',
            email: 'ana.gomez@example.com'
        }
        models.medico.findOne.mockResolvedValue(medico)

        const req = { params: { idMedico: '1' } }
        const res = createResponse()
        const next = jest.fn()

        await medicoController.listarInfo(req, res, next)

        expect(models.medico.findOne).toHaveBeenCalledWith({
            where: { id: '1' },
            attributes: { exclude: ['password'] }
        })
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: { medico }
        })
        expect(next).not.toHaveBeenCalled()
    })

    test('crear responde 201 y Location', async () => {
        const medico = { id: 7 }
        models.medico.create.mockResolvedValue(medico)

        const req = {
            body: {
                nombre: 'Ana',
                apellido: 'Gomez',
                email: 'ana.gomez@example.com',
                password: '123456'
            }
        }
        const res = createResponse()
        const next = jest.fn()

        await medicoController.crear(req, res, next)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.location).toHaveBeenCalledWith('/medicos/7')
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: { id: 7 }
        })
    })
})

describe('Pacientes', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('eliminar responde 204 sin body', async () => {
        const paciente = {
            id: 3,
            destroy: jest.fn()
        }
        models.paciente.findOne.mockResolvedValue(paciente)

        const req = { params: { idPaciente: '3' } }
        const res = createResponse()
        const next = jest.fn()

        await pacienteController.eliminar(req, res, next)

        expect(paciente.destroy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(204)
        expect(res.send).toHaveBeenCalledWith()
    })
})

describe('Includes con medicos', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('tratamientos.listar excluye password del medico incluido', async () => {
        models.tratamiento.findAll.mockResolvedValue([])

        const req = {}
        const res = createResponse()
        const next = jest.fn()

        await tratamientoController.listar(req, res, next)

        expect(models.tratamiento.findAll).toHaveBeenCalledWith({
            include: [
                {
                    model: models.paciente
                },
                {
                    model: models.medico,
                    attributes: { exclude: ['password'] }
                }
            ]
        })
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: { tratamientos: [] }
        })
    })

    test('pacienteMedico.listar excluye password del medico incluido', async () => {
        models.paciente_medico.findAll.mockResolvedValue([])

        const req = {}
        const res = createResponse()
        const next = jest.fn()

        await pacienteMedicoController.listar(req, res, next)

        expect(models.paciente_medico.findAll).toHaveBeenCalledWith({
            include: [
                {
                    model: models.paciente
                },
                {
                    model: models.medico,
                    attributes: { exclude: ['password'] }
                }
            ]
        })
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: { relaciones: [] }
        })
    })
})

describe('Relaciones pacientes-medicos', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('listarMedicosPorPaciente devuelve medicos del paciente', async () => {
        const paciente = { id: 1 }
        const medico = { id: 2, nombre: 'Ana' }
        models.paciente.findOne.mockResolvedValue(paciente)
        models.paciente_medico.findAll.mockResolvedValue([{ medico }])

        const req = { params: { idPaciente: '1' } }
        const res = createResponse()
        const next = jest.fn()

        await pacienteMedicoController.listarMedicosPorPaciente(req, res, next)

        expect(models.paciente_medico.findAll).toHaveBeenCalledWith({
            where: { pacienteId: '1' },
            include: [
                {
                    model: models.medico,
                    attributes: { exclude: ['password'] }
                }
            ]
        })
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: {
                pacienteId: '1',
                medicos: [medico]
            }
        })
    })

    test('crear relacion responde 201 y Location', async () => {
        models.paciente.findOne.mockResolvedValue({ id: 1 })
        models.medico.findOne.mockResolvedValue({ id: 2 })
        models.paciente_medico.findOne.mockResolvedValue(null)
        models.paciente_medico.create.mockResolvedValue({ id: 9 })

        const req = { params: { idPaciente: '1', idMedico: '2' } }
        const res = createResponse()
        const next = jest.fn()

        await pacienteMedicoController.crear(req, res, next)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.location).toHaveBeenCalledWith('/pacientes/1/medicos/2')
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: {
                id: 9,
                pacienteId: '1',
                medicoId: '2'
            }
        })
    })

    test('crear relacion duplicada responde con conflicto', async () => {
        models.paciente.findOne.mockResolvedValue({ id: 1 })
        models.medico.findOne.mockResolvedValue({ id: 2 })
        models.paciente_medico.findOne.mockResolvedValue({ id: 9 })

        const req = { params: { idPaciente: '1', idMedico: '2' } }
        const res = createResponse()
        const next = jest.fn()

        await pacienteMedicoController.crear(req, res, next)

        expect(next).toHaveBeenCalledWith(errors.RelacionPacienteMedicoExistente)
    })
})

describe('Turnos', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('crear responde 201 y Location', async () => {
        models.paciente.findOne.mockResolvedValue({ id: 1 })
        models.medico.findOne.mockResolvedValue({ id: 2 })
        models.turno.findOne.mockResolvedValue(null)
        models.turno.create.mockResolvedValue({ id: 4 })

        const req = {
            body: {
                pacienteId: 1,
                medicoId: 2,
                fecha: '2026-07-14',
                hora: '10:00'
            }
        }
        const res = createResponse()
        const next = jest.fn()

        await turnoController.crear(req, res, next)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.location).toHaveBeenCalledWith('/turnos/4')
    })

    test('eliminar responde 204 sin body', async () => {
        const turno = {
            id: 4,
            destroy: jest.fn()
        }
        models.turno.findOne.mockResolvedValue(turno)

        const req = { params: { idTurno: '4' } }
        const res = createResponse()
        const next = jest.fn()

        await turnoController.eliminar(req, res, next)

        expect(turno.destroy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(204)
        expect(res.send).toHaveBeenCalledWith()
    })
})
