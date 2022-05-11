require('dotenv').config();

const express = require('express');
const cors = require('cors');
const colors = require('colors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const connectDB = require('./models/config');
const app = express();
const bodyParser = require('body-parser');
const stripe = require('stripe')(
  'sk_test_51KxYJVLr9g73Dg8UznlQbSHxIr4jfF9Gm0YPI25DWkcTxvFpUhtvusyi0DlicbYGRTTmdGdvcvNDdVCFokjX2MNT00Nd9amqYj'
);

const PORT = 5200;

connectDB();
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes

const fundraiserRouter = require('./routes/fundraiser');
const userRouter = require('./routes/user');

app.use('/fundraiser', fundraiserRouter);
app.use('/users', userRouter);

app.post('/payment', cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Fundraiser',
      payment_method: id,
      confirm: true,
    });
    console.log('Payment', payment);
    res.json({
      message: 'Payment successful',
      success: true,
    });
  } catch (error) {
    console.log('Error', error);
    res.json({
      message: 'Payment failed',
      success: false,
    });
  }
});

// Server

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} 🚀`.green.inverse);
});
