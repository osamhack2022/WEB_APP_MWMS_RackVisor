const { sequelize } = require("sequelize");

module.exports = class User extends sequelize.Model {
    static init(sequelize){
        super.init({
            email: {
                type: sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            password: {
                type: sequelize.STRING(100),
                allowNull: false,
            },
            name: {
                type: sequelize.STRING(10),
                allowNull: false,  
            },
            rank: {
                type: sequelize.ENUM("PV2", "PFC", "SPC", "SGT", //각 이병, 일병, 상병, 병장
                "SSG", "SFC", "MSG", "SGM", "WO1",               //각 하사, 중사, 상사, 원사, 준위
                "2LT", "1LT", "CPT",                             //각 소위, 중위, 대위
                "MAJ", "LTC", "COL",                             //각 소령, 중령, 대령
                "BG", "MG", "LTG", "GEN"),                       //각 준장, 소장, 중장, 대장
                allowNull: false,
            },
            phoneNumber: {
                type: sequelize.STRING(20),
                allowNull: true,
            },


        }, {
            sequelize,
            timestamps: true,
            underScore: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.User.belongsToMany(db.Unit,
            {through: 'UserUnit'});
    }
};