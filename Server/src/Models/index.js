const { Sequelize, DataTypes } = require("sequelize");
const process = require("process");
const db = new Sequelize({
  dialect: "sqlite",
  storage: __dirname + "/" + process.env.db_file,
  logging: false,
});

const Users = db.define("users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "member",
    allowNull: false,
  },

});

const Events = db.define("events", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

Users.hasMany(Events), {
  foreignKey: 'userId',
};
Events.belongsTo(Users, {
  foreignKey: 'userId',
  constraints: false,
  allowNull: true,
});

const Rewards = db.define("rewards", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  claimed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = { db, Users, Events, Rewards };
