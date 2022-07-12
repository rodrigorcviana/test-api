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
    const quadrasBackupCsv = path.join(__dirname, '../database/backup/quadras.csv');
    const testadaBackupCsv = path.join(__dirname, '../database/backup/testada.csv');
    const loteBackupCsv = path.join(__dirname, '../database/backup/lote.csv');
    const enderecoBackupCsv = path.join(__dirname, '../database/backup/endereco.csv');
    const proprietarioBackupCsv = path.join(__dirname, '../database/backup/proprietario.csv');
    const unidade_imobiliariaBackupCsv = path.join(__dirname, '../database/backup/unidade_imobiliaria.csv');

    const quadrasBackup = await csv2json({ delimiter: ";" }).fromFile(quadrasBackupCsv);
    const testadaBackup = await csv2json({ delimiter: ";" }).fromFile(testadaBackupCsv);
    const loteBackup = await csv2json({ delimiter: ";" }).fromFile(loteBackupCsv);
    const enderecoBackup = await csv2json({ delimiter: ";" }).fromFile(enderecoBackupCsv);
    const proprietarioBackup = await csv2json({ delimiter: ";" }).fromFile(proprietarioBackupCsv);
    const unidade_imobiliariaBackup = await csv2json({ delimiter: ";" }).fromFile(unidade_imobiliariaBackupCsv);

    const toInsertQuadras = sliceData(quadrasBackup, 100);
    const insertedQuadras = await Promise.all(toInsertQuadras.map((async (q) => {
        const result = await dao.create(quadras, q);

        return result;
    })));
    console.log(insertedQuadras.length, 'x 100 Quadras Inserted');

    const toInsertEndereco = handlers.logradouro(sliceData(enderecoBackup, 100));
    const insertedEndereco = await Promise.all(toInsertEndereco.map((async (e) => {
        const result = await dao.create(endereco, e);

        return result;
    })));
    console.log(insertedEndereco.length, 'x 100 Endereco Inserted');

    const endereco_ids = insertedEndereco.map((e) => e.map(d => d.dataValues.id));

    const toInsertProprietario = handlers.endereco(sliceData(proprietarioBackup, 100));
    const insertedProprietario = await Promise.all(toInsertProprietario.map((async (p) => {
        const result = await dao.create(proprietario, p);

        return result;
    })));
    console.log(insertedProprietario.length, 'x 100 Proprietario Inserted');

    const proprietario_ids = insertedProprietario.map((p) => p.map(d => d.dataValues.id));

    const slicedLoteBackup = sliceData(loteBackup, 100);
    const completeLoteBackup = slicedLoteBackup.map((loteGroup, i) => {
        return loteGroup.map((l, j) => {
            l.proprietario_id = proprietario_ids[i][j];
            l.endereco_id = endereco_ids[i][j];

            return l
        });
    });

    const toInsertLote = completeLoteBackup.map((loteGroup) => {
        return loteGroup.map((l) => {
            l.ocupacao = handlers.ocupacao(l.ocupacao);
            l.patrimonio = handlers.patrimonio(l.patrimonio);
            l.muro_passeio = handlers.muroPasseio(l.muro, l.passeio);
            l.situacao_lote = handlers.situacaoLote(l.situacao_lote);
            l.isencao_iptu = handlers.isencaoIptu(l.isencao_iptu);
            l.isencao_taxas = handlers.isencaoTaxas(l.isencao_taxas);
            l.topografia = handlers.topografia(l.topografia);
            l.pedologia = handlers.pedologia(l.pedologia);

            if (l.area_total === "") {
                l.area_total = null;
            } else {
                l.area_total = parseFloat(l.area_total);
            }

            if (l.fracao_ideal === "") {
                l.fracao_ideal = null;
            } else {
                l.fracao_ideal = parseFloat(l.fracao_ideal);
            }

            if (l.valor_venal_informado === "") {
                l.valor_venal_informado = null;
            } else {
                l.valor_venal_informado = parseFloat(l.valor_venal_informado);
            }

            if (l.valor_venal_2020 === "") {
                l.valor_venal_2020 = null;
            } else {
                l.valor_venal_2020 = parseFloat(l.valor_venal_2020);
            }

            delete l.muro;
            delete l.passeio;

            return l;
        });
    });

    const insertedLote = await Promise.all(toInsertLote.map((async (l) => {
        const result = await dao.create(lote, l);

        return result;
    })));

    console.log(insertedLote.length, 'x 100 Lote Inserted');
    // console.log(insertedLote);
    const lote_ids = insertedLote.map((l) => l.map(d => d.dataValues.id));

    const handledTestada = handlers.logradouro(sliceData(testadaBackup, 100));
    const handledFloatTestada = handledTestada.map((testadaGroup) => {
        return testadaGroup.map((t) => {
            if (t.extensao === "") {
                t.extensao = null;
            } else {
                t.extensao = parseFloat(t.extensao);
            }
            if (t.extensao2 === "") {
                t.extensao2 = null;
            } else {
                t.extensao2 = parseFloat(t.extensao2);
            }
            if (t.extensao3 === "") {
                t.extensao3 = null;
            } else {
                t.extensao3 = parseFloat(t.extensao3);
            }
            if (t.extensao4 === "") {
                t.extensao4 = null;
            } else {
                t.extensao4 = parseFloat(t.extensao4);
            }

            t.face = 1;
            t.logradouro_cod = parseInt(t.logradouro_cod);

            return t;
        });
    });

    const toInsertTestada = handledFloatTestada.map((testadaGroup, i) => {
        return testadaGroup.map((t, j) => {
            t.lote_id = lote_ids[i][j];

            return t;
        });
    });

    const insertedTestada = await Promise.all(toInsertTestada.map((async (t) => {
        const result = await dao.create(testada, t);

        return result;
    })));

    console.log(insertedTestada.length, 'x 100 Testada Inserted');

    const slicedUnidadeBackup = sliceData(unidade_imobiliariaBackup, 100);
    const completeUnidadeBackup = slicedUnidadeBackup.map((unidadeGroup, i) => {
        return unidadeGroup.map((u, j) => {
            u.proprietario_id = proprietario_ids[i][j];
            u.endereco_id = endereco_ids[i][j];
            u.lote_id = lote_ids[i][j];

            return u;
        });
    });
    console.log(completeUnidadeBackup[0][0]);

    const areaHandledUnidade = handlers.areaConstruidaTotal(completeUnidadeBackup);
    console.log(areaHandledUnidade[0][0]);
    const toInsertUnidade = areaHandledUnidade.map((unidadeGroup) => {
        return unidadeGroup.map((u) => {
            u.utilizacao = handlers.utilizacao(u.utilizacao);
            u.tipo = handlers.tipo(u.tipo);
            u.alinhamento = handlers.alinhamento(u.alinhamento);
            u.posicao = handlers.posicao(u.posicao);
            u.cobertura = handlers.cobertura(u.cobertura);
            u.estrutura = handlers.estrutura(u.estrutura);
            u.paredes = handlers.paredes(u.paredes);
            u.conservacao = handlers.conservacao(u.conservacao);
            u.isencao_iptu = handlers.isencaoIptu(u.isencao_iptu);
            u.isencao_taxas = handlers.isencaoTaxas(u.isencao_taxas);
            u.inst_sanitaria = handlers.sanitaria(u.inst_sanitaria);
            u.inst_eletrica = handlers.eletrica(u.inst_eletrica);
            
            if (u.area_total === "") {
                u.area_total = null;
            } else {
                u.area_total = parseFloat(u.area_total);
            }

            if (u.fracao_ideal === "") {
                u.fracao_ideal = null;
            } else {
                u.fracao_ideal = parseFloat(u.fracao_ideal);
            }

            if (u.valor_venal_informado === "") {
                u.valor_venal_informado = null;
            } else {
                u.valor_venal_informado = parseFloat(u.valor_venal_informado);
            }

            if (u.valor_venal_2020 === "") {
                u.valor_venal_2020 = null;
            } else {
                u.valor_venal_2020 = parseFloat(u.valor_venal_2020);
            }

            return u;
        });
    });
    console.log(toInsertUnidade[0][0]);
    const insertedUnidade = await Promise.all(toInsertUnidade.map((async (u) => {
        const result = await dao.create(unidade_imobiliaria, u);

        return result;
    })));
    console.log(insertedUnidade);
    console.log(insertedUnidade.length, 'x 100 Unidade_Imobiliaria Inserted');
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
    loadFromBackup
}