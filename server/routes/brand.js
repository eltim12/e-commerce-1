const router = require('express').Router()
const brandController = require('../controllers/brandController')

//
// ─── GET ALL BRANDS WITH  PRODUCTS IN IT ────────────────────────────────────────
router.get('/', brandController.findAll)
//

//
// ─── FIND A BRAND BY NAME AND GET PRODUCTS WITH SEARCHED NAME ───────────────────
router.get('/search', brandController.findByName)
//


module.exports = router