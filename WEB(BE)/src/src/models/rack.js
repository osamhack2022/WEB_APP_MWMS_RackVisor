const { Sequelize } = require('sequelize');

module.exports = class Rack extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaltValue: sequelize.UUIDV4,
          primaryKey: true,
        },
        locationX: {
          type: Sequelize.INTEGER,
        },
        locationY: {
          type: Sequelize.INTEGER,
        },
        width: {
          type: Sequelize.INTEGER,
        },
        height: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: true,
        underScore: false,
        modelName: 'Rack',
        tableName: 'racks',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Rack.belongsTo(db.Warehouse, {
      foreignKey: 'storedWarehouse',
      targetKey: 'id',
    });
    db.Rack.hasMany(db.Box, {
      foreignKey: 'storedRack',
      targetKey: 'id',
    });
  }
};
