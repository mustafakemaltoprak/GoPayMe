const router = require("express").Router();
const controller = require("../controllers/user.controller")

// Show all the fundraisers

router.route("/").get(controller.getAllUsers);

// Create a fundraiser

router.route("/add").post(controller.createUser)

// Delete a fundraiser

router.route("/:id").delete(controller.deleteUser)



module.exports = router;