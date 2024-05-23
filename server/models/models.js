const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: "active" },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    lastLogin: { type: DataTypes.DATE, allowNull: true },
});

const Category = sequelize.define("category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Collection = sequelize.define("collection", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true, defaultValue: "" },
    img: { type: DataTypes.STRING, allowNull: false },
});

const Item = sequelize.define("item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    like: { type: DataTypes.INTEGER, defaultValue: 0 },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
});

const Like = sequelize.define("like", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    like: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

const Comment = sequelize.define("comment", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Collection);
Collection.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Category.hasMany(Collection);
Collection.belongsTo(Category);

Collection.hasMany(Item);
Item.belongsTo(Collection);

Item.hasMany(Like);
Like.belongsTo(Item);

Item.hasMany(Comment);
Comment.belongsTo(Item);

module.exports = { User, Category, Collection, Item, Like, Comment };
