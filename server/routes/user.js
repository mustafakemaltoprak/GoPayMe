const router = require('express').Router();
const {
  registerUser,
  loginUser,
  createCategories,
  selectCategories,
  getUserDetails,
  createNotification,
  respondToNotification,
  getAccountDetails,
  getUserDetailsTest
  updateAvatarPicture,
} = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth');

// Show all the fundraisers

// router.route("/").get(controller.getAllUsers);

// // Create a fundraiser

// router.route("/add").post(controller.createUser)

// // Delete a fundraiser

// router.route("/:id").delete(controller.deleteUser)

// login
router.post('/login', loginUser);

// register
router.post('/register', registerUser);
//categories
router.post('/categories/:id', createCategories);

//send notification
router.post('/notification', authMiddleware, createNotification);

//respond toNotifcation
router.post('/account', authMiddleware, respondToNotification);

//get account details
router.get('/account', authMiddleware, getAccountDetails);

//user details
router.get('/:id', authMiddleware, getUserDetails);

// createCategories

// router.post('/createCategories', createCategories)

router.post('/test/:id',  getUserDetailsTest);
//change avatar
router.put('/account', authMiddleware, updateAvatarPicture);

module.exports = router;
