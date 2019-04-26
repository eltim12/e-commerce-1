const router = require("express").Router();
const userController = require("../controllers/userController");
const { authenticate, authorizationUser } = require('../middlewares/verify')

//
// ─── GET ALL USERS DATA ─────────────────────────────────────────────────────────
router.get("/", userController.findAll);
//

//
// ─── GET ONE USER DATA FIND BY ANY ──────────────────────────────────────────────
router.get("/:id", userController.find);
//

//
// ─── UPDATE A USER ──────────────────────────────────────────────────────────────
router.patch("/:id", authenticate, authorizationUser, userController.update)
//

//
// ─── DELETE A USER ──────────────────────────────────────────────────────────────
router.delete("/:id", userController.delete)
//

//
// ─── ADD NEW ITEM TO USERS CART ─────────────────────────────────────────────────
router.patch("/addToCart/:id", authenticate, authorizationUser, userController.addToCart)
//

//
// ─── REMOVE AN ITEM FROM USERS CART ─────────────────────────────────────────────
router.patch("/removeFromCart/:id", authenticate, authorizationUser, userController.removeFromCart)
//

//
// ─── REGISTER NEW USER ──────────────────────────────────────────────────────────
router.post("/register", userController.create);
//

//
// ─── LOGIN A USER ───────────────────────────────────────────────────────────────
router.post("/login", userController.login);
//

//
// ─── VERIFY A USER ──────────────────────────────────────────────────────────────
router.post("/verify", userController.verify)
//

module.exports = router;