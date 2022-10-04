const { sequelize } = require('sequelize');

module.exports = class Box extends sequelize.Model {
<<<<<<< HEAD
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
            width: {
                type: sequelize.INTEGER,
            },
            height: {
                type: sequelize.INTEGER,
            },
        }, {
            sequelize,
            timestamps: true,
            underScore: false,
            modelName: 'Box',
            tableName: 'boxes',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
=======
  static init(sequelize) {
    super.init(
      {
        id: {
          type: sequelize.UUID,
          defaltValue: sequelize.UUIDV4,
          primaryKey: true,
        },
        floor: {
          type: sequelize.INTEGER,
        },
        order: {
          type: sequelize.INTEGER,
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
>>>>>>> 048e33cfc77b1224e3b739136ed3f57b8592b431

  static associate(db) {
    db.Box.belongsTo(db.Rack);
    db.Box.hasMany(db.Stock);
  }
};
