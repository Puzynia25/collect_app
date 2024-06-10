const Router = require("express");
const router = new Router();

const UserRouter = require("./UserRouter");
const CollectionRouter = require("./CollectionRouter");
const CategoryRouter = require("./CategoryRouter");
const ItemController = require("../controllers/ItemController");
const JiraRouter = require("./JiraRouter");

router.use("/user", UserRouter);
router.use("/collection", CollectionRouter);
router.use("/category", CategoryRouter);
router.use("/tags", ItemController.getPopularTags);
router.use("/create-ticket", JiraRouter);

module.exports = router;
