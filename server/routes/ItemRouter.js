const Router = require("express");
const ItemController = require("../controllers/ItemController");
const router = new Router();

router.post("/", ItemController.create);
router.get("/", ItemController.getAll);
router.get("/:id", ItemController.getOne);
// router.delete("/", ItemController.delete);
// router.patch("/:id", ItemController.update);

module.exports = router;
