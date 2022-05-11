const router = require('express').Router();
const {
  registerUser,
  loginUser,
  createCategories,
  selectCategories,
  getUserDetails,
  createNotification,
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


router.post('/notification', authMiddleware, createNotification);
router.get('/:id', authMiddleware, getUserDetails);



// createCategories

// router.post('/createCategories', createCategories)

module.exports = router;
