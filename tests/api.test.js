jest.mock('../src/database/models/index', () => ({
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
        create: jest.fn()
    },
    tratamiento: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn()
    }
}))

const validate = require('../src/middlewares/validate')
const authScheme = require('../src/middlewares/schemes/auth.scheme')
const medicoController = require('../src/controllers/medico.controller')
const pacienteMedicoController = require('../src/controllers/paciente_medico.controller')
const tratamientoController = require('../src/controllers/tratamiento.controller')
const models = require('../src/database/models/index')

const createResponse = () => ({
    json: jest.fn()
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
