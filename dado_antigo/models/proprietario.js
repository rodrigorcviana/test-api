const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proprietario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cpf_cnpj: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tipo: {
      type: DataTypes.ENUM("J","F","O"),
      allowNull: true
    },
    endereco: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'proprietario',
    schema: 'dado_antigo',
    timestamps: false,
    indexes: [
      {
        name: "proprietario_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
