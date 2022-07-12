const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lote', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    distrito_cod: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    setor_cod: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    quadra_cod: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    lote_cod: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    unidade: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    vago: {
      type: DataTypes.ENUM("s","n"),
      allowNull: true
    },
    distrito_antigo: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    setor_antigo: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    quadra_antigo: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    lote_antigo: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    matricula: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    inscricao_anterior: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ocupacao: {
      type: DataTypes.ENUM(
        "Edificado",
        "Vago",
        "Construção em Andamento",
        "Construção Paralizada",
        "Ruínas",
        "Em Reforma",
        "Em Demolição",
        "Praça",
        "Construção Paralisada"
      ),
      allowNull: true
    },
    patrimonio: {
      type: DataTypes.ENUM(
        "Particular",
        "Federal",
        "Estadual",
        "Municipal",
        "Religioso",
        "Outros",
      ),
      allowNull: true
    },
    muro_passeio: {
      type: DataTypes.ENUM(
        "Muro e Passeio",
        "Só Muro",
        "Só Passeio",
        "Inexistente",
      ),
      allowNull: true
    },
    situacao_lote: {
      type: DataTypes.ENUM(
        "Esquina/+ de 1 frente",
        "Meio de Quadra",
        "Encravado",
        "Gleba",
        "Vila/Condomínio",
        "Sítio Rec.",
        "Esquina/+ de 1",
        "frente",
      ),
      allowNull: true
    },
    topografia: {
      type: DataTypes.ENUM(
        "Plano",
        "Aclive",
        "Declive",
        "Irregular",
        "Difícil Aproveitamento",
        "Difícil",
        "Aproveitamento",
      ),
      allowNull: true
    },
    area_total: {
      type: DataTypes.REAL,
      allowNull: true
    },
    fracao_ideal: {
      type: DataTypes.REAL,
      allowNull: true
    },
    proprietario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proprietario',
        key: 'id'
      }
    },
    endereco_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'endereco',
        key: 'id'
      }
    },
    pedologia: {
      type: DataTypes.ENUM(
        "NÃO ATRIBUÍDO",
        "FIRME",
        "INUNDÁVEL"
      ),
      allowNull: true
    },
    isencao_iptu: {
      type: DataTypes.ENUM(
        "NÃO",
        "IMUNE",
        "ISENTO"
      ),
      allowNull: true
    },
    isencao_taxas: {
      type: DataTypes.ENUM("SIM","NÃO"),
      allowNull: true
    },
    valor_venal_informado: {
      type: DataTypes.REAL,
      allowNull: true
    },
    valor_venal_2020: {
      type: DataTypes.REAL,
      allowNull: true
    },
    predial: {
      type: DataTypes.ENUM("s","n"),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'lote',
    schema: 'dado_antigo',
    timestamps: false,
    indexes: [
      {
        name: "lote_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
