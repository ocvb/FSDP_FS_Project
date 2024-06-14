const { Sequelize, Model, DataTypes } = require("sequelize");
const process = require("process");
const db = new Sequelize({
  dialect: "sqlite",
  storage: __dirname + "/" + process.env.db_file,
  logging: false,
}); // Example for sqlite

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



// class User extends Model {}

// class Post extends Model {}

// User.init(
//   {
//     username: DataTypes.STRING,
//     birthday: DataTypes.DATE,
//   },
//   { sequelize, modelName: "user" }
// );

// Post.init(
//   {
//     title: DataTypes.STRING,
//     body: DataTypes.TEXT,
//   },
//   { sequelize, modelName: "post" }
// );

// (async function () {
//   try {
//     await sequelize.sync();

//     const jane = await User.create({
//       username: "janedoe",
//       birthday: new Date(1980, 6, 20),
//     });
//     console.log(jane.toJSON());

//     const post = await Post.create({
//       title: "First Post",
//       body: "This is the first post in the blog",
//     });
//     console.log(post.toJSON());
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();

module.exports = { db, Users, Events };
