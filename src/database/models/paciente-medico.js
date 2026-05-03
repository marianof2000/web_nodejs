'use strict'

module.exports = (sequelize, DataTypes) => {

  let PacienteMedico = sequelize.define('paciente_medico', {
    medicoId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    pacienteId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
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
  })

  PacienteMedico.associate = models => {
    PacienteMedico.belongsTo(models.medico, {
      foreignKey: 'medicoId',
      as: 'medico'
    })

    PacienteMedico.belongsTo(models.paciente, {
      foreignKey: 'pacienteId',
      as: 'paciente'
    })
  }

  return PacienteMedico
}