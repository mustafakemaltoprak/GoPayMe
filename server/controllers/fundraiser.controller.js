const Fundraiser = require('../models/fundraiser.model');

const getAllFundraisers = async(req, res) =>{
  Fundraiser.find()
    .then((fundraisers) => res.json(fundraisers))
    .catch((err) => res.status(400).json('Error: ' + err));


    try {
    console.log('fired', req.body)
       const foundUser = await Fundraiser.findOne({writer: req.user})
       await
       Fundraiser.find({categories: {"$in": foundUser.categories}})
       console.log('created' , createdFundraiser)
//    res.status(201).send(JSON.stringify(createFundraiser))
} catch (error) {
    res.status(400).send({error: error.message})
}

}

const createFundraiser = async(req, res)=> {
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
    console.log('fired', req.body)
       const createdFundraiser = await Fundraiser.create(req.body)
       console.log('created' , createdFundraiser)
   res.status(201).send(createdFundraiser)
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
