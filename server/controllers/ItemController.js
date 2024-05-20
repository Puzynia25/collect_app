const ApiError = require("../error/ApiError");
const { Item, User, Collection, Category } = require("../models/models");

class ItemController {
    async create(req, res, next) {
        const { name, tags, collectionId } = req.body;
        const item = await Item.create({ name, tags, collectionId });
        return res.json(item);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const item = await Item.findOne({
            where: { id },
            include: {
                model: Collection,
                include: [User, Category],
            },
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
                include: {
                    model: Collection,
                    include: [User, Category],
                },
                limit,
                offset,
            });
        } else {
            items = await Item.findAndCountAll({
                where: { collectionId },
                include: {
                    model: Collection,
                    include: [User, Category],
                },
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
            return next(ApiError.badRequest("Item is not found"));
        }

        return res.status(204).send();
    }

    async getTags(req, res, next) {
        const items = await Item.findAll();

        if (!items) {
            return next(ApiError.badRequest("Items are not found"));
        }

        const tags = items
            .map((item) => item.tags)
            .flat()
            .slice(0, 50);

        return res.json(tags);
    }
}

module.exports = new ItemController();
