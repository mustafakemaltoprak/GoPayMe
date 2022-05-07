const Fundraiser = require("../models/fundraiser.model");

function getAllFundraisers (req, res) {
    Fundraiser.find()
    .then(fundraisers => res.json(fundraisers))
    .catch(err => res.status(400).json("Error: " + err));
}

function createFundraiser (req, res) {
    const title = req.body.title;
    const targetAmount = req.body.targetAmount
    const currentAmount = req.body.currentAmount;
    const deadlineDate = req.body.deadlineDate;
    const description = req.body.description;
    const categories = req.body.categories;
    const backers = req.body.backers;
    const image = req.body.image

    const newFundraiser = new Fundraiser({
        title,
        targetAmount,
        currentAmount,
        deadlineDate,
        description,
        categories,
        backers,
        image
    });

    newFundraiser.save()
    .then(() => res.json("Fundraiser added"))
    .catch(err => res.status(400).json("Error: " + err));
}

function deleteFundraiser (req, res) {
    Fundraiser.findByIdAndDelete(req.params.id)
    .then(() => res.json("Fundraiser deleted"))
    .catch(err => res.status(400).json("Error: " + err))
}

module.exports = {
    getAllFundraisers,
    createFundraiser,
    deleteFundraiser
};