const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Category = sequelize.define("category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

const Collection = sequelize.define("collection", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
});

// const Field = sequelize.define("field", {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     title: { type: DataTypes.STRING, allowNull: false },
//     desciption: { type: DataTypes.STRING, allowNull: false },
//     field: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
// });

const Item = sequelize.define("item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    like: { type: DataTypes.BOOLEAN, defaultValue: false },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
});

const Like = sequelize.define("like", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    like: { type: DataTypes.BOOLEAN, allowNull: false },
});

User.hasMany(Collection);
Collection.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

Collection.hasMany(Item);
Item.belongsTo(Collection);

// Collection.hasMany(Field);
// Field.belongsTo(Collection);

Category.hasMany(Collection);
Collection.belongsTo(Category);

Item.hasMany(Like);
Like.belongsTo(Item);

module.exports = { User, Category, Collection, Item, Like };
