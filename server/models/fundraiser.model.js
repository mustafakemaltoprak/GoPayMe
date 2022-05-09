const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fundraiserSchema = new Schema ({
    writer: String,
    title: String,
    targetAmount: Number,
    currentAmount: Number,
    deadlineDate: Date,
    description: String,
    categories: [String],
    backers: Number,
    image: String
});

const Fundraiser = mongoose.model("Fundraiser", fundraiserSchema)

module.exports = Fundraiser