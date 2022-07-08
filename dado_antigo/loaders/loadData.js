const csv2json = require('csvtojson');
const path = require('path');
const { endereco, lote, proprietario, quadras, testada, unidade_imobiliaria } = require('../models');
const dao = require('../database/dao/dao');
const handlers = require('./handlers');

const sliceData = (data, slice) => {
    let bottomSlicer = 0;
    let groups = [];
    let run = true;

    while (run) {
        if (slice === data.length) run = false;

        groups.push(data.slice(bottomSlicer, slice));
        bottomSlicer = slice;

        if (slice + 100 > data.length) {
            slice = data.length;
        } else {
            slice += 100;
        }
    }

    return groups;
}

const loadFromBackup = async () => {
    const quadrasBackup = path.join(__dirname, '../database/backup/quadras.csv'); 
    const testadaBackup = path.join(__dirname, '../database/backup/testada.csv'); 
    const loteBackup = path.join(__dirname, '../database/backup/lote.csv'); 
    const enderecoBackup = path.join(__dirname, '../database/backup/lote.csv'); 
    const proprietarioBackup = path.join(__dirname, '../database/backup/proprietario.csv'); 
    const unidade_imobiliariaBackup = path.join(__dirname, '../database/backup/unidade_imobiliaria.csv');
    
    const toInsertQuadras = sliceData(quadrasBackup, 100);
    const insertedQuadras = await Promise.all(toInsertQuadras.map((async (q) => {
        const result = await dao.create(quadras, q);

        return result;
    })));
    console.log(insertedQuadras.length, 'x 100 Quadras Inserted');

    const toInsertTestada = handlers.logradouro(sliceData(testadaBackup, 100));
    const insertedTestada = await Promise.all(toInsertTestada.map((async (t) => {
        const result = await dao.create(testada, t);

        return result;
    })));
    console.log(insertedTestada.length, 'x 100 Testada Inserted');

    const toInsertEndereco = handlers.logradouro(sliceData(enderecoBackup, 100));
    const insertedEndereco = await Promise.all(toInsertEndereco.map((async (e) => {
        const result = await dao.create(endereco, e);

        return result;
    })));
    console.log(insertedEndereco.length, 'x 100 Endereco Inserted');

    const endereco_ids = insertedEndereco.map((e) => e.map(d => d.dataValues.id));

    const toInsertProprietario = handlers.endereco(handlers.logradouro(sliceData(proprietarioBackup, 100)));
    
    const insertedProprietario = await Promise.all(toInsertProprietario.map((async (p) => {
        const result = await dao.create(proprietario, p);

        return result;
    })));
    console.log(insertedProprietario.length, 'x 100 Proprietario Inserted');

    const proprietario_ids = insertedEndereco.map((p) => p.map(d => d.dataValues.id));


}

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