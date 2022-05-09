require('dotenv').config()

const express = require("express")
const cors = require("cors")
const colors = require('colors')
const mongoose = require("mongoose")
const morgan = require('morgan');
const connectDB = require('./models/config')
const app = express()

const PORT = 5200

connectDB()
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))


// Routes


const fundraiserRouter = require("./routes/fundraiser");
const userRouter = require("./routes/user")

app.use("/fundraiser", fundraiserRouter);
app.use("/users", userRouter);


// Server

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT} 🚀`.green.inverse)
})