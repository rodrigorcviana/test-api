const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quadras', {
    cod: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    setor_cod: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    distrito_cod: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'quadras',
    schema: 'dado_antigo',
    timestamps: false,
  });
};
