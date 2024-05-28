const Router = require("express");

const ItemRouter = require("./ItemRouter");
const checkRole = require("../middleware/checkRoleMiddleware");
const CollectionController = require("../controllers/CollectionController");
const authMiddleware = require("../middleware/authMiddleware");
const CustomFieldController = require("../controllers/CustomFieldController");
const router = new Router();

router.use("/item", ItemRouter);
router.post("/", authMiddleware, CollectionController.create);
router.get("/biggest", CollectionController.getBiggest);
router.get("/", CollectionController.getAll);
router.get("/:id", CollectionController.getOne);
router.delete("/:id", authMiddleware, CollectionController.remove);
router.post("/:id/custom-fields", authMiddleware, CustomFieldController.create);
router.get("/:id/custom-fields", CustomFieldController.getAll);
router.patch("/:id/custom-fields", CustomFieldController.update);

// router.patch("/:id", checkRole("ADMIN"), CollectionController.update);

module.exports = router;
