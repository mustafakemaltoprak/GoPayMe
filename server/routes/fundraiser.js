const router = require("express").Router();
const controller = require("../controllers/fundraiser.controller")

// Show all the fundraisers

router.route("/").get(controller.getAllFundraisers);

// Create a fundraiser

router.route("/create").post(controller.createFundraiser);

// Delete a fundraiser

router.route("/:id").delete(controller.deleteFundraiser)

module.exports = router;


/fundraisers/create