const Router = require("express");
const ItemController = require("../controllers/ItemController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/", ItemController.create);
router.get("/", ItemController.getAll);
router.get("/:id", ItemController.getOne);
router.delete("/:id", authMiddleware, ItemController.remove);

// router.patch("/:id", ItemController.update);

module.exports = router;
