const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  categories: [String],
  description: String,
  notifications: [
    {
      typeof: {
        type: String,
        enum: ['follow', 'reject', 'message', 'accept'],
      },
      targetUser: {
        // ref: 'User',
        // type: mongoose.Schema.ObjectId,
        type: String,
      },
      note: String,
      senderName: String,
      senderId: String
    },
  ],
  test: {
    default:  0,
    type: Number
  },
  following: [
    {type: mongoose.Schema.ObjectId,
      ref: 'User'
    
    }
    
  ],
  userId: String,
  image: {
    type: String,
    default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
