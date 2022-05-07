const router = require("express").Router();
const controller = require("../controllers/controller")
const Fundraiser = require("../models/fundraiser.model");


// GET all the fundraisers

router.route("/").get(controller.getAll);

// POST

router.route("/add").post((req, res) => {
    const title = req.body.title;
    const targetAmount = req.body.targetAmount
    const currentAmount = req.body.currentAmount;
    const deadlineDate = req.body.deadlineDate;
    const description = req.body.description;
    const categories = req.body.categories;
    const backers = req.body.backers;

    const newFundraiser = new Fundraiser({
        title,
        targetAmount,
        currentAmount,
        deadlineDate,
        description,
        categories,
        backers
    });

    newFundraiser.save()
    .then(() => res.json("Fundraiser added"))
    .catch(err => res.status(400).json("Error: " + err));
});

// // DELETE

router.route("/:id").delete((req, res) => {
    Fundraiser.findByIdAndDelete(req.params.id)
    .then(() => res.json("Fundraiser deleted"))
    .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router;