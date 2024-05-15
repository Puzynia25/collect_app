const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");
const { Collection, Category } = require("../models/models");
const uuid = require("uuid");
const path = require("path");

class CollectionController {
    async create(req, res, next) {
        try {
            const { name, description, userId, categoryId } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));
            // console.log(req, "CollectionController");

            const collection = await Collection.create({
                name,
                description,
                img: fileName,
                userId,
                categoryId,
            });
            return res.json(collection);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        const collection = await Collection.findOne({ where: { id } });
        return res.json(collection);
    }

    async getAll(req, res) {
        let { category, limit, page } = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let collections;
        if (!category) {
            collections = await Collection.findAndCountAll({ limit, offset });
        } else {
            collections = await Collection.findAndCountAll({ where: { category }, limit, offset });
        }

        return res.json(collections);
    }

    // async delete(req, res, next) {
    //     const { id } = req.body;
    //     const deletedUser = await Collection.destroy({ where: { id } });

    //     if (deletedUser === 0) {
    //         return next(ApiError.badRequest("User not found"));
    //     }

    //     return res.status(204).send();
    // }

    // async update(req, res, next) {
    //     const { ids, status } = req.body;
    //     await Collection.update({ status }, { where: { id: ids } });
    //     return res.status(204).send();
    // }
}

module.exports = new CollectionController();
