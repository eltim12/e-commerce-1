const router = require('express').Router()
const transactionController = require('../controllers/transactionController')
const { getCityId } = require('../middlewares/getCityId')
const { authenticate, authorizationUser, adminCheck } = require('../middlewares/verify')

//
// ─── FIND ALL TRANSACTIONS ──────────────────────────────────────────────────────
router.get('/', authenticate, adminCheck, transactionController.findAll)
//

//
// ─── FIND TRANSACTION BY USER ID ────────────────────────────────────────────────
router.get('/user/:id', authenticate, authorizationUser, transactionController.findByUser)
//

//
// ─── GET DELIVERY FEE ───────────────────────────────────────────────────────────
router.post('/delivery', getCityId, transactionController.delivery)
//

//
// ─── FIND ONE TRANSACTION BY ID ─────────────────────────────────────────────────
router.get('/:id', transactionController.findOne)
//

//
// ─── USER CHECKOUT AND CREATE A TRANSACTION ─────────────────────────────────────
router.post('/checkout/:id', authenticate, authorizationUser, transactionController.checkout)
//

//
// ─── CHANGE TRANSACTION STATUS ──────────────────────────────────────────────────
router.patch('/:id', authenticate, transactionController.updateStatus)
//

//
// ─── DELETE A TRANSACTION ───────────────────────────────────────────────────────
router.delete('/:id', authenticate, adminCheck, transactionController.delete)
//  

module.exports = router