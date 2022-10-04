const { Sequelize } = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaltValue: sequelize.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        type: {
          //todo 타입 정의 필요
          type: Sequelize.ENUM('test'),
          allowNull: false,
        },
        barcode: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        comment: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        expirationDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        //todo stock info 추가 필요
      },
      {
        sequelize,
        timestamps: true,
        underScore: false,
        modelName: 'Stock',
        tableName: 'stocks',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Stock.belongsTo(db.Box, {
      foreignKey: 'storedBox',
      targetKey: 'id',
    });
  }
};
