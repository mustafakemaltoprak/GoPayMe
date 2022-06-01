const Fundraiser = require('../models/fundraiser.model');
const { db } = require('../models/user.model');
const User = require('../models/user.model');
var mongoose = require('mongoose');

const getAllFundraisers = async (req, res) => {
  console.log(req.body);
  const skip = req.body.skip && parseInt(req.body.skip);
  const limit = req.body.limit && parseInt(req.body.limit);
  

  if (req.body.following) {
    const foundWriters = await User.find({
      _id: {
        $in: req.body.following,
      },
    });
    const writers = foundWriters.map((user) => user.userId);

    const options =
      req.body.categories.length > 0
        ? {
            categories: {
              $in: req.body.categories,
            },
          }
        : {};
    Fundraiser.find({
      writer: {
        $in: writers,
      },
    })
      .find(options)
      .populate('writerId')
      .skip(skip)
      .limit(limit)
      .exec((err, docs) => {
        if (err) res.status(400).send({ error: err.message });
        res.status(201).send({ docs, count: docs.length });
      });
    return;
  }

  if (req.body.bookmarked) {

    const options =
      req.body.categories.length > 0
        ? {
            categories: {
              $in: req.body.categories,
            },
          }
        : {};
    Fundraiser.find({
      _id: {
        $in: req.body.bookmarked,
      },
    })
      .find(options)
      .populate('writerId')
      .skip(skip)
      .limit(limit)
      .exec((err, docs) => {
        if (err) res.status(400).send({ error: error.message });
        res.status(201).send({ docs, count: docs.length });
      });
    return;
  }

  const options =
    req.body.categories.length > 0
      ? {
          categories: {
            $in: req.body.categories,
          },
        }
      : {};
  console.log('body', req.body);
  Fundraiser.find(options)
    .populate('writerId')
    .skip(skip)
    .limit(limit)
    .exec((err, docs) => {
      if (err) res.status(400).send({ error: error.message });
      res.status(201).send({ docs, count: docs.length });
    });
  
};



const createFundraiser = async (req, res) => {
  try {
    
    if (req.body._id) {
      const body = req.body;
      delete body['_id'];
      delete body['__v'];
      delete body['location'];
      delete body['writerId'];
      const n = await Fundraiser.findOneAndUpdate({ title: req.body.title }, body, { new: true });
      
      res.status(201).send(n);

     
      return;
    }
    const createdFundraiser = await Fundraiser.create(req.body);
    console.log('created', createdFundraiser);
    res.status(201).send(createdFundraiser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


function deleteFundraiser(req, res) {
  Fundraiser.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send({ success: true }))
    .catch((err) => res.status(400).send({ error: err.message }));
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
      fundraiser.views = fundraiser.views + req.body.views.views;

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

const bookmarkFundraisers = async (req, res) => {
  const bookmarkedFundraiser = await User.findOneAndUpdate(
    { userId: req.user.userId },
    { $push: { bookmarked: req.body._id } },
    { new: true },
  ).populate('bookmarked');

  res.status(200).send(bookmarkedFundraiser);
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
  bookmarkFundraisers,
  getAllFundraisers,
};
