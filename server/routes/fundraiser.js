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
  searchbyTerm,
} = require('../controllers/fundraiser.controller');
const { authMiddleware } = require('../middlewares/auth');

router.get('/', authMiddleware, getAllFundraisers);

router.post('/create', authMiddleware, createFundraiser);

router.route('/find/:id').get(findSpecificFundraiser);
router.get('/search', authMiddleware, searchbyTerm);
// router.route("/create").post(createFundraiser);

router.route('/change/:id').put(updatePriceFundraiser);

router.route('/comment/add/:id').put(addComments);

router.route('/comment/get/:id').get(getAllComments);

router.route('/like/:id').put(addLike);

router.route('/like/amount/:id').get(getAllLikes);

module.exports = router;
