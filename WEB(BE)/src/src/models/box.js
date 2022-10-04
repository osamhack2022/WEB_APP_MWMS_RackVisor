const { sequelize } = require('sequelize');

module.exports = class Box extends sequelize.Model {
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

  static associate(db) {
    db.Box.belongsTo(db.Rack);
    db.Box.hasMany(db.Stock);
  }
};
