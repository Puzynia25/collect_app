const Router = require("express");
const TagController = require("../controllers/TagController");
const router = new Router();

router.get("/", TagController.getAll);

module.exports = router;
