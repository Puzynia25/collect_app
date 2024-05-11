const Router = require("express");
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");
const router = new Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", authMiddleware, UserController.check);
router.delete("/auth", checkRole("ADMIN"), UserController.delete);

module.exports = router;
