const ApiError = require("../error/ApiError");
const { Item, User, Collection, Category, Like } = require("../models/models");
const sequelize = require("../db");

class ItemController {
    async create(req, res, next) {
        try {
            const { name, tags, collectionId } = req.body;
            const item = await Item.create({ name, tags, collectionId });
            return res.json(item);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        const item = await Item.findOne({
            where: { id },
            include: [
                {
                    model: Collection,
                    include: [
                        {
                            model: User,
                            attributes: ["id", "name"],
                        },
                        {
                            model: Category,
                        },
                    ],
                },
            ],
        });
        return res.json(item);
    }

    async getAll(req, res) {
        let { collectionId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let items;
        if (!collectionId) {
            items = await Item.findAndCountAll({
                include: [
                    {
                        model: Collection,
                        include: [
                            {
                                model: User,
                                attributes: ["id", "name"],
                            },
                            {
                                model: Category,
                            },
                        ],
                    },
                ],
                limit,
                offset,
            });
        } else {
            items = await Item.findAndCountAll({
                where: { collectionId },
                include: [
                    {
                        model: Collection,
                        include: [
                            {
                                model: User,
                                attributes: ["id", "name"],
                            },
                            {
                                model: Category,
                            },
                        ],
                    },
                ],
                limit,
                offset,
            });
        }

        return res.json(items);
    }

    // async update(req, res, next) {
    //     const { ids, status } = req.body;
    //     await Item.update({ status }, { where: { id: ids } });
    //     return res.status(204).send();
    // }

    async remove(req, res, next) {
        const { id } = req.body;
        const deletedItem = await Item.destroy({ where: { id } });

        if (deletedItem === 0) {
            return next(ApiError.badRequest("Item not found"));
        }

        return res.status(204).send();
    }

    async getPopularTags(req, res, next) {
        try {
            const tags = await Item.findAll({
                attributes: [[sequelize.fn("unnest", sequelize.col("tags")), "tag"]],
                group: ["tag"],
                order: [[sequelize.fn("COUNT", sequelize.col("tags")), "DESC"]],
                limit: 50,
                raw: true,
            });

            const formattedTags = tags.map((el) => el.tag);
            return res.json(formattedTags);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal("Internal server error"));
        }
    }

    async addLike(req, res, next) {
        const { userId } = req.body;
        const { id } = req.params;
        try {
            const existLike = await Like.findOne({
                where: { id, userId },
            });

            if (existLike) {
                return next(ApiError.badRequest("User already liked it"));
            }

            await Like.create({ itemId: id, userId, like: 1 });
            const item = await Item.findByPk(id);
            item.like += 1;
            await item.save();

            return res.json(item.like);
        } catch (e) {
            console.error(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async removeLike(req, res, next) {
        const { userId } = req.body;
        const { id } = req.params;

        try {
            const existLike = await Like.findOne({
                where: { itemId: id, userId },
            });

            if (!existLike) {
                return next(ApiError.badRequest("User has not liked it yet"));
            }
            await existLike.destroy();

            const item = await Item.findByPk(id);
            item.like -= 1;
            await item.save();

            return res.json(item.like);
        } catch (e) {
            console.error(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async checkLike(req, res, next) {
        const { userId } = req.query;
        const { id } = req.params;
        try {
            const existLike = await Like.findOne({ where: { userId, itemId: id } });
            return res.json(!!existLike);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ItemController();
