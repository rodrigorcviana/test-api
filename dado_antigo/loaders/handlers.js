exports.logradouro = (data) => {
    const group = data.map((d) => {
        const element = d.map((e) => {
            if (e.hasOwnProperty('logradouro') && e.hasOwnProperty('tipo_logradouro')) {
                e.logradouro = e.tipo_logradouro + ' ' + e.logradouro;
                delete e.tipo_logradouro;
            }

            return e;
        });

        return element;
    })

    return group
};

exports.endereco = (data) => {
    const group = data.map((d) => {
        const element = d.map((e) => {
            if (e.hasOwnProperty('logradouro') && e.hasOwnProperty('numero') && e.hasOwnProperty('bairro')
            && e.hasOwnProperty('complemento') && e.hasOwnProperty('cidade') && e.hasOwnProperty('estado')
            && e.hasOwnProperty('cep')) {
                e.endereco = `${e.logradouro}, ${e.numero}, ${e.bairro}, ${e.complemento} - ${e.cidade}-${e.estado}, ${e.cep}`;
                delete e.logradouro;
                delete e.numero;
                delete e.bairro;
                delete e.complemento;
                delete e.cidade;
                delete e.estado;
                delete e.cep;
            }

            return e;
        });

        return element;
    })

    return group
};

exports.ocupacao = (value) => {
    /*
        Edificado
        Vago
        Construção em Andamento
        Paralizada,
        Ruínas,
        Em Reforma,
        Em Demolição,
        Praça,
        Construção Paralisada,
    */

    if (value === 'Construção') {
        return 'Construção em Andamento'
    }
    if (value === 'Paralizada') {
        return 'Paralizada'
    }
    if (value === 'Construido') {
        return 'Edificado';
    }
    if (value === 'Em Construção') {
        return 'Construção em Andamento';
    }
    if (value === 'Não Edificado') {
        return 'Vago';
    }
    if (value === 'Reforma/Demolição') {
        return 'Em Reforma';
    }
    if (value === 'Ruínas') {
        return 'Ruínas';
    }

    return 'Vago';
};

exports.patrimonio = (value) => {
    /*
        Particular,
        Federal,
        Estadual,
        Municipal,
        Religioso,
        Outros
    */

    if (value === 'Estadual') return 'Estadual';
    if (value === 'Municipal') return 'Municipal';
    if (value === 'Particular') return 'Particular';
    if (value === 'Religioso') return 'Religioso'

    return 'Outros';
}

exports.muroPasseio = (muro, passeio) => {
    /*
        Muro e Passeio,
        Só Muro,
        Só Passeio,
        Inexistente,
    */

    if (muro === 'Sim' && passeio === 'Sim') {
        return 'Muro e Passeio';
    }
    if (muro === 'Sim' && (passeio === 'Não' || passeio === 'Sem Info.')) {
        return 'Só Muro';
    }
    if ((muro === 'Não' || muro === 'Sem Info.') && passeio === 'Sim') {
        return 'Só Passeio';
    }
    if ((muro === 'Não' || muro === 'Sem Info.') && (passeio === 'Não' || passeio === 'Sem Info.')) {
        return 'Inexistente';
    }

    return 'Inexistente';
};

exports.situacaoLote = (value) => {
    /*
        Esquina/+ de 1 frente,
        Meio de Quadra,
        Encravado,
        Gleba,
        Vila/Condomínio,
        Sítio Rec.,
    */

    if (value === 'Encravado') return 'Encravado';
    if (value === 'Mais de uma Frente') return 'Esquina/+ de 1 frente';
    if (value === 'Gleba') return 'Gleba';
    if (value === 'Uma Frente') return 'Meio de Quadra';
    if (value === 'Vila') return 'Vila/Condomínio';

    return 'Meio de Quadra';
};

exports.isencaoIptu = (value) => {
    /*
        NÃO, IMUNE, ISENTO
    */

    if (value === 'imune') return 'IMUNE';
    if (value === 'tributavel') return 'NÃO';
    if (value === 'isento') return 'ISENTO';

    return 'NÃO';
};

exports.isencaoTaxas = (value) => {
    /* SIM, NÃO */

    if (value === 'imune') return 'SIM';
    if (value === 'isento') return 'SIM';
    if (value === 'tributavel') return 'NÃO';

    return 'NÃO';
};

exports.areaConstruidaTotal = (data) => {
    const groups = data.map((d) => {
        const element = d.map((e) => {
            if (e.hasOwnProperty('area_construida_unid') && e.hasOwnProperty('area_edicula')) {
                e.area_construida_total = parseFloat(e.area_construida_unid) + parseFloat(e.area_edicula);
                delete e.area_edicula;
            }

            return e;
        });

        return element;
    });

    return groups;
};

exports.topografia = (value) => {
    /* 
        "Plano",
        "Aclive",
        "Declive",
        "Irregular",
        "Difícil Aproveitamento",
        "Difícil",
        "Aproveitamento",
    */

    return 'Plano';
}

exports.pedologia = (value) => {
    /*
        "NÃO ATRIBUÍDO",
        "FIRME",
        "INUNDÁVEL"
    */

    return 'NÃO ATRIBUÍDO';
}

exports.utilizacao = (value) => {
    /*
        Residencial,
        Comercial,
        Serviços,
        Industrial,
        Religioso,
        Pública,
        Mista,
        Agropecuária,
        Terreno sem Uso,
        Outros
    */

    if (value === 'Comercial') return 'Comercial';
    if (value === 'Escolar' || value === 'Hospitalar'
    || value === 'Hotelaria' || value === 'Prestação de Serviços') return 'Serviços';
    if (value === 'Serv. Público') return 'Pública';
    if (value === 'Ind. Agropecuária') return 'Agropecuária';
    if (value === 'Terreno Vago') return 'Terreno sem Uso';
    
    return 'Outros';
};

exports.tipo = (value) => {
    /*
        Casa/Sobrado,
        Apartamento,
        Sala/Loja,
        Fábrica/Indústria,
        Galpâo,
        Telheiros,
        Misto,
        Outros
    */

    if (value === 'APARTAMENTO') return 'Apartamento';
    if (value === 'CASA') return 'Casa/Sobrado';
    if (value === 'ESPECIAL') return 'Outros';
    if (value === 'GALPAO') return 'Galpão';
    if (value === 'Industria') return 'Fábrica/Indústria';
    if (value === 'LOJA') return 'Sala/Loja';
    if (value === 'TELHEIRO') return 'Telheiros';

    return 'Outros';
};

exports.alinhamento = (value) => {
    /* 
        Frente Alinhada,
        Frente Recuada,
        Fundos
    */
   if (value === 'FRENTE') return 'Frente Alinhada';
   if (value === 'FUNDOS') return 'Fundos';

   return 'Frente Recuada';
};

exports.posicao = (value) => {
    /*
        Isolada,
        Geminada,
        Conjugada,
        Cond. Vertical,
        Cond. Horizontal,
    */
   if (value === 'CONJUGADA') return 'Conjugada';
   if (value === 'GEMINADA') return 'Geminada';
   if (value === 'ISOLADA') return 'Isolada';

   return 'Geminada';
};

exports.cobertura = (value) => {
    /*
        Fibrociamento,
        Cerâmica,
        Laje,
        Metálica,
        Palha/Zinco,
        Especial
    */
   
    if (value === 'ESPECIAL') return 'Especial';
    if (value === 'LAJE') return 'Laje';
    if (value === 'TELHA BARR') return 'Cerâmica';
    if (value === 'TELHA FIBR') return 'Fibrocimento';
    if (value === 'ZINCO/PALH') return 'Palha/Zinco';

    return 'Metálica';
};

exports.sanitaria = (value) => {
    /*
        NÃO ATRIBUÍDO,
        INTERNA COMPLETA,
        INTERNA SIMPLES,
        MAIS DE UMA INTERNA,
    */

    if (value === '+1 INTERNA') return 'MAIS DE UMA INTERNA';
    if (value === 'EXTERNA') return 'NÃO ATRIBUÍDO';
    if (value === 'INEXISTENTE') return 'NÃO ATRIBUÍDO';
    if (value === 'INT.COMPL') return 'INTERNA COMPLETA';
    if (value === 'INT.SIMPL') return 'INTERNA SIMPLES';

    return 'NÃO ATRIBUÍDO';
}

exports.eletrica = (value) => {
    /*
        NÃO ATRIBUÍDO,
        EMBUTIDA,
        APARENTE,
        SEMI-EMBUTIDA,
    */

    if (value === 'APARENTE') return 'APARENTE';
    if (value === 'EMBUTIDA') return 'EMBUTIDA';
    if (value === 'INEXISTENTE') return 'NÃO ATRIBUÍDO';

    return 'NÃO ATRIBUÍDO';
};

exports.estrutura = (value) => {
    // "Madeira","Alvenaria","Concreto","Metálico"
    if (value === 'ALVENARIA') return 'Madeira';
    if (value === 'CONCRETO') return 'Alvenaria';
    if (value === 'METALICA') return 'Concreto';
    if (value === 'MADEIRA') return 'Metálico';

    return 'Alvenaria';
}

exports.paredes = (value) => {
    // "Nenhuma","Madeira","Taipa","Alvenaria","Concreto","Especial"

    if (value === 'ALVENARIA') return 'Alvenaria';
    if (value === 'TAIPA') return 'Taipa';
    if (value === 'CHOÇA/BARRACO') return 'Nenhuma';
    if (value === 'MADEIRA') return 'Madeira'
    
    return 'Nenhuma';
}

exports.conservacao = (value) => {
    // "Má","Regular","Boa","Ótimo/Novo"

    return 'Regular';
}