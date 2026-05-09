'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('medico', [
      {
        nombre: 'Andres',
        apellido: 'Molina',
        email: 'andres.molina@clinica.com',
        password: await bcrypt.hash('andres123', 10),
        especialidad: 'Neurologia',
        tiempo_trabajando: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Camila',
        apellido: 'Suarez',
        email: 'camila.suarez@clinica.com',
        password: await bcrypt.hash('camila123', 10),
        especialidad: 'Oftalmologia',
        tiempo_trabajando: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Federico',
        apellido: 'Castro',
        email: 'federico.castro@clinica.com',
        password: await bcrypt.hash('federico123', 10),
        especialidad: 'Kinesiologia',
        tiempo_trabajando: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Natalia',
        apellido: 'Arias',
        email: 'natalia.arias@clinica.com',
        password: await bcrypt.hash('natalia123', 10),
        especialidad: 'Ginecologia',
        tiempo_trabajando: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Hernan',
        apellido: 'Vega',
        email: 'hernan.vega@clinica.com',
        password: await bcrypt.hash('hernan123', 10),
        especialidad: 'Psiquiatria',
        tiempo_trabajando: 6,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('medico', {
      email: [
        'andres.molina@clinica.com',
        'camila.suarez@clinica.com',
        'federico.castro@clinica.com',
        'natalia.arias@clinica.com',
        'hernan.vega@clinica.com'
      ]
    }, {})
  }
}
