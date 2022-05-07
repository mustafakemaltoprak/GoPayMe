const User = require("../models/user.model");

function getAllUsers (req, res) {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
}

function createUser (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const categories = req.body.categories;
    const image = req.body.image;

    const newUser = new User({
        username,
        password,
        categories,
        image
    });

    newUser.save()
    .then(() => res.json("User added"))
    .catch(err => res.status(400).json("Error: " + err));
}

function deleteUser (req, res) {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch(err => res.status(400).json("Error: " + err))
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser
};