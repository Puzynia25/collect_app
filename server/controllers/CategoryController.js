const ApiError = require("../error/ApiError");
const { Category } = require("../models/models");

class CategoryController {
    async createCategory(req, res, next) {
        try {
            const { name } = req.body;

            const category = await Category.create({
                name,
            });
            return res.json(category);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        const category = await Category.findOne({ where: { id } });
        return res.json(category);
    }

    async getAll(req, res) {
        const categoriesList = await Category.findAll();
        return res.json(categoriesList);
    }
}

module.exports = new CategoryController();
