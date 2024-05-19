const ApiError = require("../error/ApiError");
const { Collection, Category } = require("../models/models");
const uuid = require("uuid");
const cloudinary = require("../cloudinaryConfig");

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
