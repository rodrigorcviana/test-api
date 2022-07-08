const csv2json = require('csvtojson');
const path = require('path');
const { endereco, lote, proprietario, quadras, testada, unidade_imobiliaria } = require('../models');
const dao = require('../database/dao/dao');

const loadQuadras = async () => {
    const csv = path.join(__dirname, '../database/backup/quadras.csv');

    const json = await csv2json({ delimiter: ";" }).fromFile(csv);

    console.log(json);
    console.log(json.length);

    let bottomSlicer = 0;
    let topSlicer = 100;
    let bygroup = [];
    while (topSlicer != json.length) {
        bygroup.push(json.slice(bottomSlicer, topSlicer));
        bottomSlicer = topSlicer;
        if (topSlicer + 100 > json.length) {
            topSlicer = json.length;
        } else {
            topSlicer += 100;
        }
    }

    let inserts = 0;
    await Promise.all(bygroup.map(async (g) => {
        const result = await dao.create(quadras, g);
        console.log(result);
        console.log(inserts, 'rows inserted');
        inserts += 100;
    }));
};

const loadTestada = async () => {
    const csv = path.join(__dirname, '../database/backup/testada.csv');

    const json = await csv2json({ delimiter: ";" }).fromFile(csv);

    console.log(json);
    console.log(json.length);

    await Promise.all(json.map(async (t) => {
        await dao.create(testada, t);
    }));

    console.log('Testada Loaded');
}

module.exports = {
    loadQuadras,
    loadTestada,
}