const router = require("express").Router();
const {
  getAllFundraisers,
  createFundraiser,
  deleteFundraiser,
} = require("../controllers/fundraiser.controller")

// Show all the fundraisers

// router.route("/").get(controller.getAllFundraisers);

// Create a fundraiser

router.route("/create").post(createFundraiser);

// Delete a fundraiser

// router.route("/:id").delete(controller.deleteFundraiser)

module.exports = router;


