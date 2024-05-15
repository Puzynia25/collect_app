const Router = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = new Router();

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getOne);

module.exports = router;
