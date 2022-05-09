const Fundraiser = require('../models/fundraiser.model');

function getAllFundraisers(req, res) {
  Fundraiser.find()
    .then((fundraisers) => res.json(fundraisers))
    .catch((err) => res.status(400).json('Error: ' + err));
}

const  createFundraiser = async(req, res)=> {
//   const title = req.body.title;
//   const targetAmount = req.body.targetAmount;
//   const currentAmount = req.body.currentAmount;
//   const deadlineDate = req.body.deadlineDate;
//   const description = req.body.description;
//   const categories = req.body.categories;
//   // const backers = req.body.backers;
//   const image = req.body.image;

//   const newFundraiser = new Fundraiser({
//     title,
//     targetAmount,
//     currentAmount,
//     deadlineDate,
//     description,
//     categories,
//     image,
//   });

//   newFundraiser
//     .save()
try {
       const createdFundraiser = await Fundraiser.create(req.body)
   res.status(201).send(JSON.stringify(createFundraiser))
} catch (error) {
    res.status(400).send({error: error.message})
}

}

function deleteFundraiser(req, res) {
  Fundraiser.findByIdAndDelete(req.params.id)
    .then(() => res.json('Fundraiser deleted'))
    .catch((err) => res.status(400).json('Error: ' + err));
}

module.exports = {
  getAllFundraisers,
  createFundraiser,
  deleteFundraiser,
};
