'use strict'


module.exports = (sequelize, DataTypes) => {

  let Paciente = sequelize.define('paciente', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
    },
    obra_social: {
      type: DataTypes.STRING,
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

  Paciente.associate = models => {
    Paciente.hasMany(models.paciente_medico, {
        foreignKey: 'pacienteId',
        as: 'paciente_medicos'
    })

    Paciente.belongsToMany(models.medico, {
        through: models.paciente_medico,
        foreignKey: 'pacienteId',
        otherKey: 'medicoId',
        as: 'medicos'
    })
  }

  return Paciente
}