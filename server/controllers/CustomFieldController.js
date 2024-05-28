const ApiError = require("../error/ApiError");
const { Collection, Category, User, Item, CustomField, CustomFieldValue } = require("../models/models");
const sequelize = require("../db");

class CustomFieldController {
    async create(req, res, next) {
        try {
            const { collectionId, customFields } = req.body;
            console.log(collectionId, customFields);

            const collection = await Collection.findByPk(collectionId);
            if (!collection) {
                return next(ApiError.badRequest("Collection not found"));
            }

            const items = await Item.findAll({ where: { collectionId } });

            for (const field of customFields) {
                const newField = await CustomField.create({ collectionId, name: field.name, type: field.type });

                for (const item of items) {
                    await CustomFieldValue.create({
                        customFieldId: newField.id,
                        itemId: item.id,
                        value: "",
                    });
                }
            }

            return res.status(204).send();
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        const { id } = req.params;

        if (!id) {
            return next(ApiError.badRequest("Collection ID is required"));
        }

        const fields = await CustomField.findAll({
            where: { collectionId: id },
            include: [{ model: CustomFieldValue, as: "values" }],
        });
        return res.json(fields);
    }

    async update(req, res, next) {
        try {
            const customFields = req.body;
            const promises = customFields.map((field) =>
                CustomFieldValue.update({ value: field.value }, { where: { customFieldId: field.id } })
            );

            await Promise.all(promises);
            return res.status(204).send();
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new CustomFieldController();
