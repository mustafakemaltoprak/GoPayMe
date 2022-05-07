require('dotenv').config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()

const PORT = 3005

app.use(cors());
app.use(express.json());

// Routes

const fundraiserRouter = require("./routes/fundraiser");
const userRouter = require("./routes/user")

app.use("/fundraiser", fundraiserRouter);
app.use("/user", userRouter);

// Database Cloud

const uri = process.env.MONGO_CLOUD;
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
})

// Server

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT} 🚀`)
})