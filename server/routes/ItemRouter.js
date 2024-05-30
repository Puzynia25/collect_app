const Router = require("express");
const CommentRouter = require("./CommentRouter");
const ItemController = require("../controllers/ItemController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.use("/comment", CommentRouter);
router.post("/", authMiddleware, ItemController.create);
router.get("/tags", ItemController.getPopularTags);
router.get("/", ItemController.getAll);
router.get("/:id", ItemController.getOne);
router.delete("/:id", authMiddleware, ItemController.remove);
router.patch("/:id", authMiddleware, ItemController.updateOne);
router.post("/:id/like", authMiddleware, ItemController.addLike);
router.delete("/:id/unlike", authMiddleware, ItemController.removeLike);
router.get("/:id/checklike", authMiddleware, ItemController.checkLike);

module.exports = router;
