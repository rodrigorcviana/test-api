var DataTypes = require("sequelize").DataTypes;
var _endereco = require("./endereco");
var _lote = require("./lote");
var _proprietario = require("./proprietario");
var _quadras = require("./quadras");
var _testada = require("./testada");
var _unidade_imobiliaria = require("./unidade_imobiliaria");

function initModels(sequelize) {
  var endereco = _endereco(sequelize, DataTypes);
  var lote = _lote(sequelize, DataTypes);
  var proprietario = _proprietario(sequelize, DataTypes);
  var quadras = _quadras(sequelize, DataTypes);
  var testada = _testada(sequelize, DataTypes);
  var unidade_imobiliaria = _unidade_imobiliaria(sequelize, DataTypes);

  lote.belongsTo(endereco, { as: "endereco", foreignKey: "endereco_id"});
  endereco.hasMany(lote, { as: "lotes", foreignKey: "endereco_id"});
  unidade_imobiliaria.belongsTo(endereco, { as: "endereco", foreignKey: "endereco_id"});
  endereco.hasMany(unidade_imobiliaria, { as: "unidade_imobiliaria", foreignKey: "endereco_id"});
  unidade_imobiliaria.belongsTo(lote, { as: "lote", foreignKey: "lote_id"});
  lote.hasMany(unidade_imobiliaria, { as: "unidade_imobiliaria", foreignKey: "lote_id"});
  lote.belongsTo(proprietario, { as: "proprietario", foreignKey: "proprietario_id"});
  proprietario.hasMany(lote, { as: "lotes", foreignKey: "proprietario_id"});
  unidade_imobiliaria.belongsTo(proprietario, { as: "proprietario", foreignKey: "proprietario_id"});
  proprietario.hasMany(unidade_imobiliaria, { as: "unidade_imobiliaria", foreignKey: "proprietario_id"});

  return {
    endereco,
    lote,
    proprietario,
    quadras,
    testada,
    unidade_imobiliaria,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
