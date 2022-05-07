// Database Cloud
const mongoose = require('mongoose');
const colors = require('colors');
// const uri = process.env.MONGO_CLOUD;
// mongoose.connect(uri, { useNewUrlParser: true });
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('MongoDB database connection established successfully');
// });





module.exports = connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_CLOUD, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.inverse);
  } catch (error) {
    process.exit();
  }
};
