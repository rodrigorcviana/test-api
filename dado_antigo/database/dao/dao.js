const path = require('path');
const logHandler = require('../../../helpers/handlers/logHandler');

exports.create = async (model, object) => {
    // const logFilePath = path.join(__dirname, '../../logs/dao.log');
    // const action = `create ${model.name}`;
    try {
        const result = await model.bulkCreate(object);
       // logHandler.success(logFilePath, action);
        return result;
    } catch (e) {
        // logHandler.failure(logFilePath, action, e);
        return e;
    }
};

exports.findAll = async (model) => {
    const logFilePath = path.join(__dirname, '../../logs/dao.log');
    const action = `findAll ${model.name}`;
    try {
        const result = await model.findAll({
            include: [
                {
                    model: Quadra,
                    as: 'quadras',
                    required: true,
                }
            ]
        });
        logHandler.success(logFilePath, action);
        return result;
    } catch (e) {
        logHandler.failure(logFilePath, action, e);
        return e;
    }
};

exports.createOneToMany = async (modelOne, modelMany, data) => {
    const logFilePath = path.join(__dirname, '../../logs/dao.log');
    const action = `create One ${modelOne.name} to Many ${modelMany.name}`;
    try {
        const result = await modelOne.create(data, {
            includes:[{
                model: modelMany,
                as: 'Quadras',
            }] 
        });

        logHandler.success(logFilePath, action);
        return result;
    } catch (e) {
        logHandler.failure(logFilePath, action, e);
        return e;
    }
};