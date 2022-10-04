const { Sequelize } = require('sequelize');

module.exports = class Warehouse extends Sequelize.Model {
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
        comment: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underScore: false,
        modelName: 'Warehouse',
        tableName: 'warehouses',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Warehouse.belongsTo(db.Unit, {
      foreignKey: 'storedUnit',
      targetKey: 'id',
    });
    db.Warehouse.hasMany(db.Rack, {
      foreignKey: 'storedWarehouse',
      targetKey: 'id',
    });
  }
};
