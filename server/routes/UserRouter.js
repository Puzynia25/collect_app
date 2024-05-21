const Router = require("express");
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");
const router = new Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", authMiddleware, UserController.check);
router.get("/users", checkRole("ADMIN"), UserController.getAll);
router.patch("/status", checkRole("ADMIN"), UserController.updateStatusOrRole);
router.delete("/:id", checkRole("ADMIN"), UserController.delete);

module.exports = router;
