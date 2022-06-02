const User = require('../models/user.model');

const { generateToken } = require('../utils/generatewebtoken');



const createCategories = async (req, res) => {
  
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.params.id },
      { categories: req.body.categories },
      { new: true }
    );

    if (user) res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const userExists = await User.findOne({ userId }).populate('following')
    
    if (!userExists) {
      const userCreated = await User.create(req.body);
      const token = generateToken(userId);

      res.status(201).send({
        image: userCreated.image,
        categories: userCreated.categories,
        name: userCreated.name,
        userId: userCreated.userId,
        newUser: true,
        following: userCreated.following,
        description: userCreated.description,
        notifications: userCreated.notifications,
        _id: userCreated._id,
        token,
      });
    } else {
      const token = generateToken({ userId });
  
      res.status(201).send({
        image: userExists.image,
        categories: userExists.categories,
        name: userExists.name,
        userId: userExists.userId,
        description: userExists.description,
        notifications: userExists.notifications,
        following: userExists.following,
        _id: userExists._id,
        token,
      });
      
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const registerUser = async (req, res) => {
 
  try {
    const userCreated = await User.create(req.body);
    res.status(201).send({
      image: userCreated.image,
      categories: userCreated.categories,
      userId: userCreated.userId,
    });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const createNotification = async (req, res) => {

  try {
    const userFoundandUpdated = await User.findOneAndUpdate(
      { userId: req.body.targetUser },
      { $push: { notifications: req.body } }
    );
    res.status(201).send({
      success: true,
    });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};


const getUserDetails = async (req, res) => {
 
  try {
    const userFound = await User.findOne({ userId: req.params.id })
      .populate('following')
      .populate('bookmarked');

    res.status(201).send(userFound);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const respondToNotification = async (req, res) => {
  
  try {
    if (req.body.response === 'accept') {
      const senderUpdated = await User.findOneAndUpdate(
        { userId: req.body.senderId },
        { $push: { following: req.body._id } }
      );

      const myProfileUpdated = await User.findOneAndUpdate(
        { userId: req.user.userId },
        {
          $pull: {
            notifications: {
              typeof: req.body.typeof,
              senderId: req.body.senderId,
            },
          },
        },
        { new: true }
      );


      if (myProfileUpdated) res.status(201).send(myProfileUpdated);
    }

    if (req.body.response === 'reject' || req.body.response === 'dismiss') {
      const myProfileUpdated = await User.findOneAndUpdate(
        { userId: req.user.userId },
        {
          $pull: {
            notifications: {
              typeof: req.body.typeof,
              senderId: req.body.senderId,
            },
          },
        },
        { new: true },
      );

      if (myProfileUpdated) res.status(201).send(myProfileUpdated);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAccountDetails = async (req, res) => {

  try {
    const userFound = await User.findOne({ userId: req.user }).populate(
      'following'
    ).populate('bookmarked')

    res.status(201).send(userFound);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const getUserDetailsTest = async (req, res) => {

  try {
    let val;
    for (let i = 0; i < 10000; i++) {
      
      if (i === 7000) val = i;
    }

    if (val) {
      const userFound = await User.findOneAndUpdate(
        { userId: req.params.id },
        { $inc: { test: 1 } },
        { new: true }
      );
      res.status(201).send({ count: userFound.test });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};


const updateAvatarPicture = async (req, res) => {
  try {
    const userFound = await User.findOneAndUpdate(
      { userId: req.user.userId },
      { image: req.body.image },
      { new: true }
    );

    res.status(201).send(userFound);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }

};

  



module.exports = {
  
  respondToNotification,
  registerUser,
  loginUser,
  getUserDetails,
  createCategories,
  createNotification,
  getUserDetails,
  getAccountDetails,
  getUserDetailsTest,
  
  
  updateAvatarPicture,
};
