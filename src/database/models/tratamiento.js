'use strict'

module.exports = (sequelize, DataTypes) => {

  let Tratamiento = sequelize.define('tratamiento', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
    },
    observaciones: {
      type: DataTypes.STRING,
    },
    paciente_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    medico_id: {
      type: DataTypes.BIGINT,
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
  })

  Tratamiento.associate = models => {
    Tratamiento.belongsTo(models.paciente, {
      foreignKey: 'paciente_id',
      as: 'paciente'
    })

    Tratamiento.belongsTo(models.medico, {
      foreignKey: 'medico_id',
      as: 'medico'
    })
  }

  return Tratamiento
}