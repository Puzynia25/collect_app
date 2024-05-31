const ApiError = require("../error/ApiError");
const { Collection, Item, CustomField, CustomFieldValue } = require("../models/models");

class CustomFieldController {
    async create(req, res, next) {
        try {
            const { customFields } = req.body;
            const { id: collectionId } = req.params;

            if (!collectionId) {
                return next(ApiError.badRequest("Please select a collection"));
            }

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
        let { itemId } = req.query;

        if (!id) {
            return next(ApiError.badRequest("Collection ID is required"));
        }

        let fields;

        if (itemId) {
            fields = await CustomField.findAll({
                where: { collectionId: id },
                include: [{ model: CustomFieldValue, as: "values", where: { itemId }, required: true }],
                order: [["createdAt", "ASC"]],
            });
        } else {
            fields = await CustomField.findAll({
                where: { collectionId: id },
                include: [{ model: CustomFieldValue, as: "values" }],
                order: [["createdAt", "ASC"]],
            });
        }

        return res.json(fields);
    }

    async updateNames(req, res, next) {
        try {
            const customFieldNames = req.body;

            const namePromises = customFieldNames.map((field) =>
                CustomField.update({ name: field.name }, { where: { id: field.id } })
            );
            await Promise.all(namePromises);

            return res.status(204).send();
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
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

    async delete(req, res, next) {
        try {
            const { fieldsId } = req.body;

            const fieldPromises = fieldsId.map((id) => CustomField.destroy({ where: { id } }));
            await Promise.all(fieldPromises);

            return res.status(204).send();
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new CustomFieldController();
