const categoriesList = require("../categoriesList");
const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Collection = sequelize.define("collection", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: true, defaultValue: "" },
    category: { type: DataTypes.ENUM(...categoriesList), allowNull: false },
});

const Item = sequelize.define("item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    like: { type: DataTypes.INTEGER, defaultValue: 0 },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
});

const Like = sequelize.define("like", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    like: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasMany(Collection);
Collection.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

Collection.hasMany(Item);
Item.belongsTo(Collection);

Item.hasMany(Like);
Like.belongsTo(Item);

module.exports = { User, Collection, Item, Like };
