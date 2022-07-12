const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('endereco', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    logradouro: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    logradouro_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bairro: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    numero: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    complemento: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    apartamento: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    loteamento: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'endereco',
    schema: 'dado_antigo',
    timestamps: false,
    indexes: [
      {
        name: "endereco_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
