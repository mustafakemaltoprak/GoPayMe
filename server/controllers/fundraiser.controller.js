const Fundraiser = require('../models/fundraiser.model');
const { db } = require('../models/user.model');
const User = require('../models/user.model');

const getAllFundraisers = async (req, res) => {
  const skip = req.body.skip && parseInt(req.body.skip);
  const limit = req.body.limit && parseInt(req.body.limit);
  //   Fundraiser.find()
  //     .then((fundraisers) => res.json(fundraisers))
  //     .catch((err) => res.status(400).json('Error: ' + err));

  // try {
  // console.log('fired', req.body, 'user', req.user.userId);
  // const foundUser = await User.findOne({ userId: req.user.userId })
  // console.log('user', req.body);

  if (req.body.following) {
    // const foundUser = await User.findOne({ userId: req.user.userId });
    console.log('fired');
    const foundWriters = await User.find({
      _id: {
        $in: req.body.following,
      },
    });
    const writers = foundWriters.map((user) => user.userId);
    Fundraiser.find({
      writer: {
        $in: writers,
      },
    })
      .skip(skip)
      .limit(limit)
      .exec((err, docs) => {
        if (err) res.status(400).send({ error: error.message });
        res.status(201).send({ docs, count: docs.length });
      });
    return;
  }

  Fundraiser.find()
    .skip(skip)
    .limit(limit)
    .exec((err, docs) => {
      if (err) res.status(400).send({ error: error.message });
      res.status(201).send({ docs, count: docs.length });
    });
  // console.log('created', allFundraisers);
  // } catch (error) {}
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
    .populate('writerId')
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

function addPrevDonation(req, res) {
  Fundraiser.findById(req.params.id)
    .then((fundraiser) => {
      fundraiser.prevDonations = req.body.prevDonations;

      fundraiser
        .save()
        .then(() => res.json('Fundraiser previous donations updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
}

function getAllComments(req, res) {
  Fundraiser.findById(req.params.id)
    .then((fundraiser) => res.json(fundraiser.comments))
    .catch((err) => res.status(400).json('Error' + err));
}

function getPrevDonations(req, res) {
  Fundraiser.findById(req.params.id)
    .then((fundraiser) => res.json(fundraiser.prevDonations))
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

const searchbyTerm = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  try {
    const allFundraisers = await Fundraiser.find({
      title: new RegExp(searchTerm, 'i'),
    });
    const allUsers = await User.find({ name: new RegExp(searchTerm, 'i') });

    console.log('testing', allFundraisers);
    console.log('search', searchTerm, req.url);
    res.status(200).send({ users: allUsers, fundraisers: allFundraisers });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
function addView(req, res) {
  Fundraiser.findById(req.params.id)
    .then((fundraiser) => {
      fundraiser.views = fundraiser.views + req.body.views;

      fundraiser
        .save()
        .then(() => res.json('Fundraiser view added'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
}

const fetchUserCreatedFundraisers = async (req, res) => {
  const createdFundraisers = await Fundraiser.find({ writer: req.params.id });

  res.status(200).send(createdFundraisers);
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

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
  searchbyTerm,
  addView,
  addPrevDonation,
  getPrevDonations,
  fetchUserCreatedFundraisers,
};
