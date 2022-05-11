const Fundraiser = require('../models/fundraiser.model');
const User = require('../models/user.model');

const getAllFundraisers = async (req, res) => {
  //   Fundraiser.find()
  //     .then((fundraisers) => res.json(fundraisers))
  //     .catch((err) => res.status(400).json('Error: ' + err));

  try {
    console.log('fired', req.body, 'user', req.user.userId);
    const foundUser = await User.findOne({ userId: req.user.userId });
    console.log('user', foundUser.categories);
    const allFundraisers = await Fundraiser.find({});
    console.log('created', allFundraisers);
    res.status(201).send(allFundraisers);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const createFundraiser = async (req, res) => {
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
    console.log('fired', req.body);
    const createdFundraiser = await Fundraiser.create(req.body);
    console.log('created', createdFundraiser);
    res.status(201).send(createdFundraiser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

function deleteFundraiser(req, res) {
  Fundraiser.findByIdAndDelete(req.params.id)
    .then(() => res.json('Fundraiser deleted'))
    .catch((err) => res.status(400).json('Error: ' + err));
}

function findSpecificFundraiser(req, res) {
  Fundraiser.findById(req.params.id)
    .then((fundraiser) => res.json(fundraiser))
    .catch((err) => res.status(400).json('Error' + err));
}

function updatePriceFundraiser(req, res) {
  Fundraiser.findById(req.params.id)
    .then((fundraiser) => {
      fundraiser.currentAmount = req.body.currentAmount;
      fundraiser.backers = req.body.backers;

      fundraiser
        .save()
        .then(() => res.json('Fundraiser price updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
}

function addComments(req, res) {
  Fundraiser.findById(req.params.id)
    .then((fundraiser) => {
      fundraiser.comments = req.body.comments;

      fundraiser
        .save()
        .then(() => res.json('Fundraiser comments updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
}

function getAllComments(req, res) {
  Fundraiser.findById(req.params.id)
    .then((fundraiser) => res.json(fundraiser.comments))
    .catch((err) => res.status(400).json('Error' + err));
}

function addLike(req, res) {
  Fundraiser.findById(req.params.id)
    .then((fundraiser) => {
      fundraiser.likes = req.body.likes;

      fundraiser
        .save()
        .then(() => res.json('Fundraiser liked'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
}

function getAllLikes(req, res) {
  Fundraiser.findById(req.params.id)
    .then((fundraiser) => res.json(fundraiser.likes))
    .catch((err) => res.status(400).json('Error' + err));
}

module.exports = {
  getAllFundraisers,
  createFundraiser,
  deleteFundraiser,
  findSpecificFundraiser,
  updatePriceFundraiser,
  addComments,
  getAllComments,
  addLike,
  getAllLikes,
};
