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

    const userExists = await User.findOne({ userId });

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
        token,
      });
    } else {
      const token = generateToken({ userId });
      // JSON.stringify(userExists);

      console.log('userexists new', userExists)

      res.status(201).send({
        image: userExists.image,
        categories: userExists.categories,
        name: userExists.name,
        userId: userExists.userId,
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
  registerUser,
  loginUser,
  createCategories,
};
