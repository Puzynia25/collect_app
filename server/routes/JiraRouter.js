const Router = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const JiraController = require("../controllers/JiraController");
const router = new Router();

router.post("/", authMiddleware, JiraController.create);
router.get("/", authMiddleware, JiraController.getTicketByEmail);

module.exports = router;
