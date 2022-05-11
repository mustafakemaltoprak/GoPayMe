const router = require("express").Router();
const {
  getAllFundraisers,
  createFundraiser,
  deleteFundraiser,
  searchbyTerm,
} = require('../controllers/fundraiser.controller');
const { authMiddleware } = require('../middlewares/auth');

// Show all the fundraisers
// console.log('authh', authMiddleware)

router.get('/', authMiddleware, getAllFundraisers);

// Create a fundraiser
router.post('/create', authMiddleware, createFundraiser);
router.get('/search', authMiddleware, searchbyTerm);
// router.route("/create").post(createFundraiser);

// Delete a fundraiser

// router.route("/:id").delete(controller.deleteFundraiser)

module.exports = router;


