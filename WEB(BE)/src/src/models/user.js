const { Sequelize } = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaltValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        rank: {
          type: Sequelize.ENUM(
            'PV2',
            'PFC',
            'SPC',
            'SGT', //각 이병, 일병, 상병, 병장
            'SSG',
            'SFC',
            'MSG',
            'SGM',
            'WO1', //각 하사, 중사, 상사, 원사, 준위
            '2LT',
            '1LT',
            'CPT', //각 소위, 중위, 대위
            'MAJ',
            'LTC',
            'COL', //각 소령, 중령, 대령
            'BG',
            'MG',
            'LTG',
            'GEN' //각 준장, 소장, 중장, 대장
          ),
          allowNull: false,
        },
        reigment: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        position: {
          type: Sequelize.String(20),
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underScore: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.User.belongsToMany(db.Unit, { through: 'UserUnit' });
  }
};
