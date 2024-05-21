const Router = require("express");
const CommentRouter = require("./CommentRouter");
const ItemController = require("../controllers/ItemController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.use("/comment", CommentRouter);
router.post("/", ItemController.create);
router.use("/tags", ItemController.getPopularTags);
router.get("/", ItemController.getAll);
router.get("/:id", ItemController.getOne);
router.delete("/:id", authMiddleware, ItemController.remove);

// router.patch("/:id", ItemController.update);

module.exports = router;
