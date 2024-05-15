const ApiError = require("../error/ApiError");
const { Item } = require("../models/models");

class ItemController {
    async create(req, res, next) {
        const { name, tags, collectionId } = req.body;
        // console.log(collectionId, "YYYYYYYYYYYYYYY");
        const item = await Item.create({ name, tags });
        return res.json(item);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const user = await Item.findOne({ where: { id } });
        return res.json(user);
    }

    async getAll(req, res) {
        let { category, limit, page } = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let items;
        if (!category) {
            items = await Item.findAndCountAll({ limit, offset });
        } else {
            items = await Item.findAndCountAll({ where: { category }, limit, offset });
        }

        return res.json(items);
    }

    // async delete(req, res, next) {
    //     const { id } = req.body;
    //     const deletedUser = await Item.destroy({ where: { id } });

    //     if (deletedUser === 0) {
    //         return next(ApiError.badRequest("User not found"));
    //     }

    //     return res.status(204).send();
    // }

    // async update(req, res, next) {
    //     const { ids, status } = req.body;
    //     await Item.update({ status }, { where: { id: ids } });
    //     return res.status(204).send();
    // }
}

module.exports = new ItemController();
