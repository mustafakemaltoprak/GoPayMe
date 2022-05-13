const Conversations = require('../models/Conversations.model');
const createMessage = async (req, res) => {
  try {
    // console.log('Avatar Updating', req.body, req.user);
    
    const convoExists = await Conversations.find({ members: { $in: req.body.members } });

    if (!convoExists) {
      const convoCreated = await Conversations.create(req.body).populate('members');

      console.log('was created', convoExists)
      res.status(201).send(convoCreated);
      return;
    }

    const convoUpdated = await Conversations.findOneAndUpdate(
      {
        members: { $in: req.body.members },
      },
      { $push: { 'chats.messages': req.body.chats.messages } },

      { new: true },
    ).populate('members')
    console.log('was updated', convoUpdated);
    res.status(201).send(convoUpdated);
    // console.log('avatar img', req.body.image);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const fetchMessages = async (req, res) => {
  try {
    // console.log('Avatar Updating', req.body, req.user);
    console.log('fetching messages', req.params)
    const convoFound = await Conversations.find({
      members: { $in: [req.params.id, req.params.uid] },
    }).populate('members')

    res.status(200).send(convoFound);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
module.exports = {
  createMessage,
  fetchMessages,
};
