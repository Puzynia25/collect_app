const ApiError = require("../error/ApiError");
const { Item } = require("../models/models");

class TagController {
    async getAll(req, res, next) {
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

module.exports = new TagController();
