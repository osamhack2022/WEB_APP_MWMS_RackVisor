const { Sequelize } = require('sequelize');

module.exports = class Box extends Sequelize.Model {
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
        modelName: 'Box',
        tableName: 'boxes',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Box.belongsTo(db.Rack, {
      foreignKey: 'storedRack',
      targetKey: 'id',
    });
    db.Box.hasMany(db.Stock, {
      foreignKey: 'storedBox',
      targetKey: 'id',
    });
  }
};
