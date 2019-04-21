const router = require('express').Router()
const productController = require('../controllers/productController')
const upload = require('../helpers/googleUpload')
const { authenticate, adminCheck } = require('../middlewares/verify')

//
// ─── FIND ALL PRODUCTS ──────────────────────────────────────────────────────────
router.get("/", productController.findAll)
//

//
// ─── FIND ONE PRODUCT BY ID ─────────────────────────────────────────────────────
router.get("/:id", productController.findOne)
//

//
// ─── ADD A NEW PRODUCT ──────────────────────────────────────────────────────────
router.post("/", authenticate, adminCheck, upload.uploads, upload.goToGCS, productController.create)
//

//
// ─── UPDATE A PRODUCT INFO ──────────────────────────────────────────────────────
router.patch("/:id", authenticate, adminCheck, upload.uploads, upload.goToGCS, productController.update)
//

//
// ─── DELETE A PRODUCT ───────────────────────────────────────────────────────────
router.delete("/:id", authenticate, adminCheck, productController.delete)
//




module.exports = router