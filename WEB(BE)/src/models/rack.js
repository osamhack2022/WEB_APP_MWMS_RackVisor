const { sequelize } = require("sequelize");

module.exports = class Rack extends sequelize.Model {
    static init(sequelize){
        super.init({
            id: {
                type: sequelize.UUID,
                defaltValue: sequelize.UUIDV4,
                primaryKey: true,
            },
            locationX: {
                type: sequelize.INTEGER,
            },
            locationY: {
                type: sequelize.INTEGER,
            },
        }, {
            sequelize,
            timestamps: true,
            underScore: false,
            modelName: 'Rack',
            tableName: 'racks',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.Rack.belongsTo(db.Warehouse);
        db.Rack.hasMany(db.Box);
    }
};