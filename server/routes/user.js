const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/user.controller');

// Show all the fundraisers

// router.route("/").get(controller.getAllUsers);

// // Create a fundraiser

// router.route("/add").post(controller.createUser)

// // Delete a fundraiser

// router.route("/:id").delete(controller.deleteUser)

// login
router.post('/login', loginUser);

//register
router.post('/register', registerUser);

module.exports = router;
