let Fundraiser = require("../models/fundraiser.model");

function getAll (req, res) {
    Fundraiser.find()
    .then(fundraisers => res.json(fundraisers))
    .catch(err => res.status(400).json("Error: " + err));
}

module.exports = {
    getAll
};