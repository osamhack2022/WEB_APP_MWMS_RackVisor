const { sequelize } = require("sequelize");

module.exports = class User extends sequelize.Model {
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
            type: {
                //todo 타입 정의 필요
                type: sequelize.ENUM(),
                allowNull: false,
            },
            barcode: {
                type: sequelize.STRING(100),
                allowNull: true,
            },
            comment: {
                type: sequelize.STRING(100),
                allowNull: true,
            },
            expirationDate: {
                type: sequelize.DATE,
                allowNull: true,
            },
            //todo stock info 추가 필요
        }, {
            sequelize,
            timestamps: true,
            underScore: false,
            modelName: 'Stock',
            tableName: 'stocks',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.Stock.belongsTo(db.Box);
    }
};