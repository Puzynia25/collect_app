const Router = require("express");
const router = new Router();

const UserRouter = require("./UserRouter");
const CollectionRouter = require("./CollectionRouter");
const CategoryRouter = require("./CategoryRouter");

router.use("/user", UserRouter);
router.use("/collection", CollectionRouter);
router.use("/category", CategoryRouter);

module.exports = router;
