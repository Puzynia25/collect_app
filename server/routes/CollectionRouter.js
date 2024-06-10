const Router = require("express");

const ItemRouter = require("./ItemRouter");
const CollectionController = require("../controllers/CollectionController");
const authMiddleware = require("../middleware/authMiddleware");
const CustomFieldController = require("../controllers/CustomFieldController");
const router = new Router();

// router.use("/item", ItemRouter);
router.post("/", authMiddleware, CollectionController.create);
router.patch("/", authMiddleware, CollectionController.update);
router.get("/biggest", CollectionController.getBiggest);
router.delete("/custom-fields", authMiddleware, CustomFieldController.delete);
router.get("/", CollectionController.getAll);
router.get("/:id", CollectionController.getOne);
router.delete("/:id", authMiddleware, CollectionController.remove);
router.post("/:id/custom-fields", authMiddleware, CustomFieldController.create);
router.get("/:id/custom-fields", CustomFieldController.getAll);
router.patch("/:id/custom-fields-values", authMiddleware, CustomFieldController.updateValues);
router.patch("/:id/custom-fields-names", authMiddleware, CustomFieldController.updateNames);

router.use("/:collectionId/item", ItemRouter);
module.exports = router;
