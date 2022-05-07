const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const PORT = 3005
require('dotenv').config()

const fundraiserRouter = require("./routes/fundraiser");

app.use(cors());
app.use(express.json());
app.use("/fundraiser", fundraiserRouter);

const uri = process.env.MONGO_CLOUD;
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT} 🚀`)
})