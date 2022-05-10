const router = require('express').Router();
const controller = require('../controllers/fundraiser.controller');
const { authMiddleware } = require('../middlewares/auth');


router.route('/find/:id').get(controller.findSpecificFundraiser);
router.get('/', authMiddleware, controller.getAllFundraisers);

// Create a fundraiser
router.post('/create', authMiddleware, controller.createFundraiser);

router.route('/delete/:id').delete(controller.deleteFundraiser);

module.exports = router;