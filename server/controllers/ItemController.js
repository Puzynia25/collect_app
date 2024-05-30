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
                order: [["createdAt", "ASC"]],
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
                order: [["createdAt", "ASC"]],
            });
        }

        return res.json(items);
    }

    async remove(req, res, next) {
        const { id } = req.body;
        const deletedItem = await Item.destroy({ where: { id } });

        if (deletedItem === 0) {
            return next(ApiError.badRequest("Item not found"));
        }

        return res.status(204).send();
    }

    async getPopularTags(req, res, next) {
        const items = await Item.findAll();

        if (!items) {
            return next(ApiError.badRequest("Items are not found"));
        }

        const tags = items.map((item) => item.tags).flat();

        let popularTags = {};
        for (let i = 0; i < tags.length; i++) {
            if (popularTags[tags[i]]) {
                popularTags[tags[i]] += 1;
            } else {
                popularTags[tags[i]] = 1;
            }
        }

        const sortedTags = Object.entries(popularTags).sort((a, b) => b[1] - a[1]);
        const top50Tags = sortedTags.slice(0, 50).map((tag) => tag[0]);
        return res.json(top50Tags);
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
