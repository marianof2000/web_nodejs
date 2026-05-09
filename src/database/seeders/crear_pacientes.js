'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pacientes = [
      {
        nombre: 'Maria',
        apellido: 'Gonzalez',
        email: 'maria.gonzalez@email.com',
        edad: 34,
        obra_social: 'OSDE',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Pedro',
        apellido: 'Martinez',
        email: 'pedro.martinez@email.com',
        edad: 42,
        obra_social: 'Swiss Medical',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Ana',
        apellido: 'Lopez',
        email: 'ana.lopez@email.com',
        edad: 27,
        obra_social: 'Galeno',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Diego',
        apellido: 'Sanchez',
        email: 'diego.sanchez@email.com',
        edad: 51,
        obra_social: 'Medife',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Lucia',
        apellido: 'Ramirez',
        email: 'lucia.ramirez@email.com',
        edad: 19,
        obra_social: 'PAMI',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    await queryInterface.bulkInsert('paciente', pacientes, {})

    const pacientesCreados = await queryInterface.sequelize.query(
      "SELECT id, email FROM paciente WHERE email IN (:emails)",
      {
        replacements: {
          emails: pacientes.map(paciente => paciente.email)
        },
        type: Sequelize.QueryTypes.SELECT
      }
    )

    const relaciones = pacientesCreados.map((paciente, index) => ({
      pacienteId: paciente.id,
      medicoId: index + 1,
      created_at: new Date(),
      updated_at: new Date()
    }))

    await queryInterface.bulkInsert('paciente_medico', relaciones, {})
  },

  down: async (queryInterface, Sequelize) => {
    const emails = [
      'maria.gonzalez@email.com',
      'pedro.martinez@email.com',
      'ana.lopez@email.com',
      'diego.sanchez@email.com',
      'lucia.ramirez@email.com'
    ]

    const pacientes = await queryInterface.sequelize.query(
      "SELECT id FROM paciente WHERE email IN (:emails)",
      {
        replacements: { emails },
        type: Sequelize.QueryTypes.SELECT
      }
    )

    await queryInterface.bulkDelete('paciente_medico', {
      pacienteId: pacientes.map(paciente => paciente.id)
    }, {})

    await queryInterface.bulkDelete('paciente', {
      email: emails
    }, {})
  }
}
