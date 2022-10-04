const { sequelize } = require("sequelize");

module.exports = class Warehouse extends sequelize.Model {
    static init(sequelize){
        super.init({
            id: {
                type: sequelize.UUID,
                defaltValue: sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: sequelize.STRING(10),
                allowNull: false,  
            },
            comment: {
                type: sequelize.STRING(100),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underScore: false,
            modelName: 'Warehouse',
            tableName: 'warehouses',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.Warehouse.belongsTo(db.Unit);
        db.Warehouse.hasMany(db.Structure);
    }
};