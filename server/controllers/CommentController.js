const ApiError = require("../error/ApiError");
const { User, Comment } = require("../models/models");

class CommentController {
    async create(req, res, next) {
        try {
            const { itemId, userId, content } = req.body;
            const comment = await Comment.create({ itemId, userId, content });
            const createdComment = await Comment.findOne({
                where: { id: comment.id },
                include: [
                    {
                        model: User,
                        attributes: ["id", "name", "email"],
                    },
                ],
            });
            return res.json(createdComment);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getItemAll(req, res) {
        const { itemId } = req.query;

        const comments = await Comment.findAndCountAll({
            where: { itemId },
            include: [
                {
                    model: User,
                    attributes: ["name", "email"],
                },
            ],
        });

        return res.json(comments);
    }
}

module.exports = new CommentController();
