const Router = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const CommentController = require("../controllers/CommentController");
const router = new Router();

router.post("/", authMiddleware, CommentController.create);
router.get("/", CommentController.getItemAll);

// router.patch("/:id", ItemController.update);

module.exports = router;
