const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unidade_imobiliaria', {
    id: {
      type: DataTypes.INTEGER,
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
    unidade_cod: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    matricula: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    inscricao_anterior: {
      type: DataTypes.STRING(50),
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
    area_construida_unid: {
      type: DataTypes.REAL,
      allowNull: true
    },
    area_construida_total: {
      type: DataTypes.REAL,
      allowNull: true
    },
    utilizacao: {
      type: DataTypes.ENUM(
        "Residencial",
        "Comercial",
        "Serviços",
        "Industrial",
        "Religioso",
        "Pública",
        "Mista",
        "Agropecuária",
        "Terreno sem Uso",
        "Outros",
      ),
      allowNull: true
    },
    tipo: {
      type: DataTypes.ENUM(
        "Casa/Sobrado",
        "Apartamento",
        "Sala/Loja",
        "Fábrica/Indústria",
        "Galpão",
        "Telheiros",
        "Misto",
        "Outros",
      ),
      allowNull: true
    },
    alinhamento: {
      type: DataTypes.ENUM(
        "Frente Alinhada",
        "Frente Recuada",
        "Fundos",
      ),
      allowNull: true
    },
    posicao: {
      type: DataTypes.ENUM(
        "Isolada",
        "Geminada",
        "Conjugada",
        "Cond. Vertical",
        "Cond. Horizontal",
      ),
      allowNull: true
    },
    classificacao: {
      type: DataTypes.ENUM(
        "Rústica",
        "Popular",
        "Média",
        "Boa",
        "Luxo",
      ),
      allowNull: true
    },
    estrutura: {
      type: DataTypes.ENUM("Madeira","Alvenaria","Concreto","Metálico"),
      allowNull: true
    },
    cobertura: {
      type: DataTypes.ENUM(
        "Fibrocimento",
        "Cerâmica",
        "Laje",
        "Metálica",
        "Palha/Zinco",
        "Especial",
      ),
      allowNull: true
    },
    esquadrias: {
      type: DataTypes.ENUM("Madeira","Ferro","Alumínio","Especial"),
      allowNull: true
    },
    paredes: {
      type: DataTypes.ENUM("Nenhuma","Madeira","Taipa","Alvenaria","Concreto","Especial"),
      allowNull: true
    },
    revest_externo: {
      type: DataTypes.ENUM("Sem Acabamento","Argamassa","Pintura","Aparente","Cerâmico","Pedra/Granito","Especial"),
      allowNull: true
    },
    acesso: {
      type: DataTypes.ENUM("Permitido","Não Permitido","Imóvel Vazio"),
      allowNull: true
    },
    piso_externo: {
      type: DataTypes.ENUM("Terra","Cimento","Cerâmica","Pedra/Granito"),
      allowNull: true
    },
    conservacao: {
      type: DataTypes.ENUM("Má","Regular","Boa","Ótimo/Novo"),
      allowNull: true
    },
    endereco_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'endereco',
        key: 'id'
      }
    },
    lote_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'lote',
        key: 'id'
      }
    },
    isencao_iptu: {
      type: DataTypes.ENUM("NÃO","IMUNE","ISENTO"),
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
    andares: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    inst_sanitaria: {
      type: DataTypes.ENUM("NÃO ATRIBUÍDO","INTERNA COMPLETA","INTERNA SIMPLES","MAIS DE UMA INTERNA"),
      allowNull: true
    },
    inst_eletrica: {
      type: DataTypes.ENUM("NÃO ATRIBUÍDO","EMBUTIDA","APARENTE","SEMI-EMBUTIDA"),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'unidade_imobiliaria',
    schema: 'dado_antigo',
    timestamps: false,
    indexes: [
      {
        name: "unidade_imobiliaria_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
