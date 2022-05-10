const router = require('express').Router();
const controller = require('../controllers/fundraiser.controller');

// Show all the fundraisers

router.route('/').get(controller.getAllFundraisers);

// Get specific fundraiser

router.route('/find/:id').get(controller.findSpecificFundraiser);

// Create a fundraiser

router.route('/add').post(controller.createFundraiser);

// Delete a fundraiser

router.route('/delete/:id').delete(controller.deleteFundraiser);

module.exports = router;
