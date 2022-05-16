require('dotenv').config();

const express = require('express');
const cors = require('cors');
const colors = require('colors');
const mongoose = require('mongoose');

const morgan = require('morgan');
const connectDB = require('./models/config');
const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const stripe = require('stripe')(
  'sk_test_51KxYJVLr9g73Dg8UznlQbSHxIr4jfF9Gm0YPI25DWkcTxvFpUhtvusyi0DlicbYGRTTmdGdvcvNDdVCFokjX2MNT00Nd9amqYj',
);

const PORT = 5200;

connectDB();
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId === socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

///************SOCKET */
io.on('connection', (socket) => {
  console.log('someone connected');

  socket.on('addUser', (userId) => {
    // console.log('fired', userId);

    addUser(userId, socket.id);
   
    io.emit('getUsers', users);
  });

  //receiving a sent message from client
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    //fetch the targets sockets id
    const user = getUser(receiverId);

    //send him the message
    io.to(user.socketId).emit('getMessage', { senderId, text });
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

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
