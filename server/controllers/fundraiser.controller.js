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

const searchbyTerm = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  try {
    const allFundraisers = await Fundraiser.find({ title: new RegExp(searchTerm, 'i') });
    const allUsers = await User.find({ name: new RegExp(searchTerm, 'i') });

    console.log('testing', allFundraisers)
    console.log('search', searchTerm, req.url);
    res.status(200).send({ users: allUsers, fundraisers: allFundraisers });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = {
  getAllFundraisers,
  createFundraiser,
  deleteFundraiser,
  searchbyTerm,
};
