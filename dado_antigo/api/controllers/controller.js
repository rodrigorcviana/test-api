const csv2json = require('csvtojson');
const path = require('path');
const { endereco, lote, proprietario, quadras, testada, unidade_imobiliaria } = require('../../models');
const dao = require('../../database/dao/dao');
const asyncHandler = require('../../../helpers/handlers/asyncHandler');


exports.findAll = asyncHandler(async (req, res) => {
  const result = await dao.findAll(lote);
  const result2 = await dao.findAll(proprietario);
  const result3 = await dao.findAll(quadras);
  const result4 = await dao.findAll(testada);
  const result5 = await dao.findAll(unidade_imobiliaria);

  if (!result) {
    console.error(result);
  }

  return res.json({ Status: true, data: { result, result2, result3, result4, result5 } }).end();
});

const loadQuadras = async () => {
  const csv = path.join(__dirname, '../../database/backup/quadras.csv');

  const json = await csv2json({ delimiter: ";" }).fromFile(csv);

  console.log(json);
  console.log(json.length);

  await Promise.all(json.map(async (q) => {
    await dao.create(quadras, q);
  }));
};

const loadTestada = async () => {
  const csv = path.join(__dirname, '../../database/backup/testada.csv');

  const json = await csv2json({ delimiter: ";" }).fromFile(csv);

  console.log(json);
  console.log(json.length);

  await Promise.all(json.map(async (t) => {
    await dao.create(testada, t);
  }));
}


const loadData = async () => {
  const csv = path.join(__dirname, '../../database/backup/dado_setor_teste.csv');

  const json = await csv2json({ delimiter: ";" }).fromFile(csv);
  // console.log(json);
  console.log(json.length, 'rows extracted');

  const distrito = new Map();
  const setor = new Map();
  json.forEach((row) => {
    if (setor.has(row.setor)) {
      setor.set(row.setor, [...setor.get(row.setor), row.quadra]);
    } else {
      setor.set(row.setor, [row.quadra]);
    }

    distrito.set(row.distrito, setor);

  });

  const distritos = [];
  distrito.forEach((s, codigo) => {
    const setores = [];

    s.forEach((q, codigo) => {
      const quadras = [];

      q.forEach((codigo) => {
        quadras.push({ codigo });
      });

      setores.push({ codigo, quadras });
    });

    distritos.push({ codigo, setores });
  });

  console.log(distritos);
  const carga_distritos = await Promise.all(distritos.map(async (distrito) => {
    const c1 = await dao.create(Distrito, { codigo: distrito.codigo });
    const d = c1.dataValues;

    const c2 = await Promise.all(distrito.setores.map(async (setor) => {
      const c2p = await dao.create(Setor, { codigo: setor.codigo, distrito: d.id });
      const s = c2p.dataValues;

      const c3 = await Promise.all(setor.quadras.map(async (quadra) => {
        const c3p = await dao.create(Quadra, { codigo: quadra.codigo, setor: s.id });
        
        return c3p;
      }));
      console.log(c3);

      return c2p;
    }));
    console.log(c2);

    return c1;
  }));

  console.log(c1);
  /*const carga_distritos = await Promise.all(distritos.map(async (distrito) => {
    const c1 = await dao.create(Distrito, { codigo: distrito.codigo });
     const c1_json = c1.dataValues;
     console.log(c1_json);
     const c2 = await Promise.all(distrito.setores.map(async (setor) => {
      const s = await dao.createOneToMany(Setor, Quadra, { ...setor, distrito: c1_json.id });

      return s;
    }));

    console.log(c2);
  }));*/

  console.log(carga_distritos);

}

exports.load = asyncHandler(async (req, res) => {
  loadData();

  return res.json({ Status: true });
});

exports.loadQ = asyncHandler(async (req, res) => {
  loadQuadras();

  return res.json({ Status: true });
});

exports.loadT = asyncHandler(async (req, res) => {
  loadTestada();

  return res.json({ Status: true });
});
