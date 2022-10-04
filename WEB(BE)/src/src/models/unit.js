const { Sequelize } = require('sequelize');

module.exports = class Unit extends Sequelize.Model {
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
          unique: true,
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
        modelName: 'Unit',
        tableName: 'units',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Unit.belongsToMany(db.User, { through: 'UserUnit' });
    db.Unit.hasMany(db.Warehouse, {
      foreignKey: 'storedUnit',
      targetKey: 'id',
    });
  }
};
