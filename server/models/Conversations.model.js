const mongoose = require('mongoose');
const geocoder = require('../utils/geocoderConfig');

const Schema = mongoose.Schema;

const conversationsSchema = new Schema({
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  chats: {
    messages: [
      {
        msg: { type: String, required: true },
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date },
      },
    ],
  },
});

const Conversations = mongoose.model('Conversations', conversationsSchema);

module.exports = Conversations;
