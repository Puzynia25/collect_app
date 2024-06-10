const Router = require("express");
const CommentRouter = require("./CommentRouter");
const ItemController = require("../controllers/ItemController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/", authMiddleware, ItemController.create);
router.get("/", ItemController.getAll);
router.get("/:itemId", ItemController.getOne);
router.delete("/:itemId", authMiddleware, ItemController.remove);
router.patch("/:itemId", authMiddleware, ItemController.updateOne);
router.use("/:itemId/comment", CommentRouter);
router.post("/:itemId/like", authMiddleware, ItemController.addLike);
router.delete("/:itemId/unlike", authMiddleware, ItemController.removeLike);
router.get("/:itemId/checklike", authMiddleware, ItemController.checkLike);

module.exports = router;
