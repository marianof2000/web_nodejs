'use strict'

module.exports = (sequelize, DataTypes) => {

  let Turno = sequelize.define('turno', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    motivo: {
      type: DataTypes.STRING
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'pendiente',
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
        fields: ['medicoId', 'fecha', 'hora'],
        where: {
          deleted_at: null
        }
      }
    ]
  })

  Turno.associate = models => {
    Turno.belongsTo(models.paciente)
    Turno.belongsTo(models.medico)
  }

  return Turno
}
