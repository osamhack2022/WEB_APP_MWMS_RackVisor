const Sequelize = require("sequelize");
const config = require("../config/config")[env];

const User = require("./user");
const Unit = require("./unit");
const Warehouse = require("./warehouse");
const Rack = require("./rack");
const Box = rqeuire("./box");
const Stock = require("./stock");

const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);

db.sequelize = sequelize;
db.User = User;
db.Unit = Unit;
db.Warehouse = Warehouse;
db.Rack = Rack;
db.Box = Box;
db.Stock = Stock;

//DB init
User.init(sequelize);
Unit.init(sequelize);
Warehouse.init(sequelize);
Rack.init(sequelize);
Box.init(sequelize);
Stock.init(sequelize);

//RDBMS associate
User.associate(db);
Unit.associate(db);
Warehouse.associate(db);
Rack.associate(db);
Box.associate(db);
Stock.associate(db);

module.exports = db;