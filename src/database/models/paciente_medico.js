'use strict'

module.exports = (sequelize, DataTypes) => {

  let Paciente_Medico = sequelize.define('paciente_medico', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at'
    }
  }, {
    paranoid: true,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['pacienteId', 'medicoId'],
        where: {
          deleted_at: null
        }
      }
    ]
  })

  Paciente_Medico.associate = models => {
    Paciente_Medico.belongsTo(models.paciente)
    Paciente_Medico.belongsTo(models.medico)
  }

  return Paciente_Medico
}
