const User = require('../models/user.model');

const { generateToken } = require('../utils/generatewebtoken');

const createCategories = async (req, res) => {
  // User.findOne(req.params.id)
  //   .then((user) => {
  //     user.categories = req.body.categories;
  //     user.save().then(() => res.status(201).send({ success: true }));
  //   })
  //   .catch((err) => res.status(400).send({ error: err.message }));

  try {
    const user = await User.findOneAndUpdate(
      { userId: req.params.id },
      { categories: req.body.categories },
      { new: true },
    );

    if (user) res.status(201).send({ success: true });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const userExists = await User.findOne({ userId }).populate('following')

    if (!userExists) {
      //has not signed in before
      //uses google sign-in

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
        _id: userCreated._id,
        token,
      });
    } else {
      const token = generateToken({ userId });
      // JSON.stringify(userExists);
      // console.log('userexists new', userExists);
      console.log('userexists new', userExists);

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
      // jwt.sign({ _id }, process.env.SECRET, { expiresIn: '10d' }),
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

//users/register
const registerUser = async (req, res) => {
  //   const { userId } = req.body;
  try {
    //conso
    console.log('registering', req.body);
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
  //   const { userId } = req.body;
  try {
    //conso
    console.log('registering', req.body, req.user);
    // const payload = {...req.body, senderName: , senderId: req.user.userId}

    const userFoundandUpdated = await User.findOneAndUpdate(
      { userId: req.body.targetUser },
      { $push: { notifications: req.body } },
    );

    console.log('user', userFoundandUpdated);
    res.status(201).send({
      success: true,
    });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  //   const { userId } = req.body;
  try {
    console.log('registering', req.body, req.user);

    const userFound = await User.findOne({ userId: req.params.id });

    console.log('user', userFound);
    res.status(201).send(userFound);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const respondToNotification = async (req, res) => {
  //   const { userId } = req.body;
  try {
    // console.log('registering', req.body, req.user);

    if (req.body.response === 'accept') {
      const senderUpdated = await User.findOneAndUpdate(
        { userId: req.body.senderId },
        { $push: { following: req.body._id } },
      );

      const myProfileUpdated = await User.findOneAndUpdate(
        { userId: req.user.userId },
        { $pull: { notifications: { typeof: req.body.typeof, senderId: req.body.senderId } } },
        { new: true },
      );

      console.log('myprofile', myProfileUpdated);
      if (myProfileUpdated) res.status(201).send(myProfileUpdated);
    }

    if (req.body.response === 'reject') {
      const myProfileUpdated = await User.findOneAndUpdate(
        { userId: req.user.userId },
        { $pull: { notifications: { typeof: req.body.typeof, senderId: req.body.senderId } } },
        { new: true },
      );

      if (myProfileUpdated) res.status(201).send(myProfileUpdated);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAccountDetails = async (req, res) => {
  //   const { userId } = req.body;
  try {
    // console.log('registering', req.body, req.user);

    const userFound = await User.findOne({ userId: req.user }).populate('following')

    res.status(201).send(userFound);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const getUserDetailsTest = async (req, res) => {
  //   const { userId } = req.body;
  try {
    // console.log('registering', req.body, req.user);

    let val;
    for (let i = 0; i < 10000; i++) {
      // const element = array[i];
      if (i === 7000) val = i;
    }

    if (val) {
      const userFound = await User.findOneAndUpdate(
        { userId: req.params.id },
        { $inc: { test: 1 } },
        { new: true },
      );
      res.status(201).send({ count: userFound.test });
    }
    // console.log(userFound);
    
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

// "proxy": "http://127.0.0.1:5200",

// function getAllUsers(req, res) {
//   User.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json('Error: ' + err));
// }

// function createUser(req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//   const categories = req.body.categories;
//   const image = req.body.image;

//   const newUser = new User({
//     username,
//     password,
//     categories,
//     image,
//   });

//   newUser
//     .save()
//     .then(() => res.json('User added'))
//     .catch((err) => res.status(400).json('Error: ' + err));
// }

// function deleteUser(req, res) {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => res.json('User deleted'))
//     .catch((err) => res.status(400).json('Error: ' + err));
// }

module.exports = {
  //   getAllUsers,
  //   createUser,
  //   deleteUser,
  respondToNotification,
  registerUser,
  loginUser,
  getUserDetails,
  createCategories,
  createNotification,
  getUserDetails,
  getAccountDetails,
  getUserDetailsTest,
};
