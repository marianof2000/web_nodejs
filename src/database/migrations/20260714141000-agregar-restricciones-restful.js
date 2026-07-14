'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('medico', ['email'], {
      unique: true,
      name: 'medico_email_unique',
      where: {
        deleted_at: null
      }
    })

    await queryInterface.addIndex('paciente_medico', ['pacienteId', 'medicoId'], {
      unique: true,
      name: 'paciente_medico_paciente_medico_unique',
      where: {
        deleted_at: null
      }
    })

    await queryInterface.addIndex('turno', ['medicoId', 'fecha', 'hora'], {
      unique: true,
      name: 'turno_medico_fecha_hora_unique',
      where: {
        deleted_at: null
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('turno', 'turno_medico_fecha_hora_unique')
    await queryInterface.removeIndex('paciente_medico', 'paciente_medico_paciente_medico_unique')
    await queryInterface.removeIndex('medico', 'medico_email_unique')
  }
}
