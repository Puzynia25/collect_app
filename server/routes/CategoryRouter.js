const Router = require("express");
const CollectionController = require("../controllers/CollectionController");
const router = new Router();

router.post("/", CollectionController.createCategory);

module.exports = router;
