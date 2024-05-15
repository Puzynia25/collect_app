const Router = require("express");
const CollectionController = require("../controllers/CollectionController");
const checkRole = require("../middleware/checkRoleMiddleware");
// const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/", checkRole("ADMIN"), CollectionController.create);
router.get("/", CollectionController.getAll);
router.get("/:id", CollectionController.getOne);
// router.delete("/", checkRole("ADMIN"), CollectionController.delete);
// router.patch("/:id", checkRole("ADMIN"), CollectionController.update);

module.exports = router;
