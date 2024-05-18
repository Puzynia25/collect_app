const ApiError = require("../error/ApiError");
const { Collection, Category, User, Item } = require("../models/models");
const uuid = require("uuid");
const path = require("path");

class CollectionController {
    async create(req, res, next) {
        try {
            const { name, description, userId, categoryId } = req.body;
            const { img } = req.files;
            console.log(img, "!!!!!!!!!!!!!!!!!!!!!!!");
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));

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
        const collection = await Collection.findOne({
            where: { id },
            include: {
                model: Category,
            },
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
                include: Category,
                limit,
                offset,
            });
        }
        if (!categoryId && userId) {
            collections = await Collection.findAndCountAll({
                where: { userId },
                include: Category,
                limit,
                offset,
            });
        }

        if (categoryId && userId) {
            collections = await Collection.findAndCountAll({
                where: { categoryId, userId },
                include: Category,
                limit,
                offset,
            });
        }
        if (!categoryId && !userId) {
            collections = await Collection.findAndCountAll({
                include: Category,
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
}

module.exports = new CollectionController();
