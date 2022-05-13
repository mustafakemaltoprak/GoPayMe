const router = require('express').Router();
const {
  getAllFundraisers,
  createFundraiser,
  deleteFundraiser,
  findSpecificFundraiser,
  updatePriceFundraiser,
  addComments,
  getAllComments,
  addLike,
  getAllLikes,
  addView,
  addPrevDonation,
  getPrevDonations,
} = require('../controllers/fundraiser.controller');
const { authMiddleware } = require('../middlewares/auth');

router.get('/', authMiddleware, getAllFundraisers);

router.post('/create', authMiddleware, createFundraiser);

router.route('/find/:id').get(findSpecificFundraiser);

router.route('/change/:id').put(updatePriceFundraiser);

router.route('/comment/add/:id').put(addComments);

router.route('/comment/get/:id').get(getAllComments);

router.route('/prevDonation/add/:id').put(addPrevDonation);

router.route('/prevDonation/get/:id').get(getPrevDonations);

router.route('/like/:id').put(addLike);

router.route('/view/:id').put(addView);

router.route('/like/amount/:id').get(getAllLikes);

router.route('/create-tokens').post(async (req, res, next) => {
  try {
    const { code } = req.body;
    res.send(code);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
