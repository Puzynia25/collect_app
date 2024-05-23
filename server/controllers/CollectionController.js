const ApiError = require("../error/ApiError");
const { Collection, Category, User, Item } = require("../models/models");
const uuid = require("uuid");
const cloudinary = require("../cloudinaryConfig");
const sequelize = require("../db");

class CollectionController {
    async create(req, res, next) {
        try {
            const { name, description, userId, categoryId } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            const resultFile = await cloudinary.uploader.upload(img.tempFilePath, {
                public_id: fileName,
                folder: "collections",
                use_filename: true,
                unique_filename: false,
                overwrite: true,
            });

            const collection = await Collection.create({
                name,
                description,
                img: resultFile.secure_url,
                userId,
                categoryId,
            });

            const resultCollection = await Collection.findOne({
                where: { id: collection.id },
                include: Category,
            });
            return res.json(resultCollection);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        const collection = await Collection.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    attributes: ["id", "name"],
                },
                {
                    model: Category,
                },
            ],
        });
        return res.json(collection);
    }

    async getAll(req, res) {
        let { categoryId, userId, page, limit } = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let collections;

        if (categoryId && !userId) {
            collections = await Collection.findAndCountAll({
                where: { categoryId },
                include: [
                    {
                        model: User,
                        attributes: ["id", "name"],
                    },
                    {
                        model: Category,
                    },
                ],
                limit,
                offset,
            });
        }
        if (!categoryId && userId) {
            collections = await Collection.findAndCountAll({
                where: { userId },
                include: [
                    {
                        model: User,
                        attributes: ["id", "name"],
                    },
                    {
                        model: Category,
                    },
                ],
                limit,
                offset,
            });
        }

        if (categoryId && userId) {
            collections = await Collection.findAndCountAll({
                where: { categoryId, userId },
                include: [
                    {
                        model: User,
                        attributes: ["id", "name"],
                    },
                    {
                        model: Category,
                    },
                ],
                limit,
                offset,
            });
        }
        if (!categoryId && !userId) {
            collections = await Collection.findAndCountAll({
                include: [
                    {
                        model: User,
                        attributes: ["id", "name"],
                    },
                    {
                        model: Category,
                    },
                ],
                limit,
                offset,
            });
        }

        return res.json(collections);
    }

    async remove(req, res, next) {
        const { id } = req.body;
        const deletedCollection = await Collection.destroy({ where: { id } });

        if (deletedCollection === 0) {
            return next(ApiError.badRequest("Collection is not found"));
        }

        return res.status(204).send();
    }

    async getBiggest(req, res) {
        const collections = await Collection.findAll({
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("items.id")), "item_count"]],
            },
            include: [
                {
                    model: Item,
                    attributes: [],
                },
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Category,
                    attributes: ["name"],
                },
            ],
            group: ["collection.id", "user.id", "category.id"],
            order: [[sequelize.literal("item_count"), "DESC"]],
            limit: 5,
            subQuery: false,
        });

        if (!collections) {
            return next(ApiError.badRequest("Collections are not found"));
        }

        return res.json(collections);
    }
}

module.exports = new CollectionController();
