const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('testada', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lote_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    logradouro_cod: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    logradouro: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    secao: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    extensao: {
      type: DataTypes.REAL,
      allowNull: false
    },
    face: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'testada',
    schema: 'dado_antigo',
    timestamps: false,
    indexes: [
      {
        name: "testada_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
