const Conversations = require('../models/Conversations.model');



const createMessage = async (req, res) => {
  try {
    const convoExists = await Conversations.findOne({ members: { $all: req.body.members } });
    if (!convoExists) {
      const convoCreated = await Conversations.create(req.body);

      if (convoCreated) {
        const convo = await Conversations.findOne({
          members: { $all: req.body.members },
        }).populate('members');

        res.status(201).send(convo);
      }
      return;
    }

   
    const convoUpdated = await Conversations.findOneAndUpdate(
      {
        members: { $all: req.body.members },
      },
      { $push: { 'chats.messages': req.body.chats.messages } },

      { new: true },
    ).populate('members')
    
    res.status(201).send(convoUpdated);
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const fetchMessages = async (req, res) => {
  try {
    const convoFound = await Conversations.findOne({
      members: { $all: [req.params.id, req.params.uid] },
    }).populate('members');

    convoFound ? res.status(200).send(convoFound) : res.status(200).send({});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};



const fetchAllConversations = async (req, res) => {
  try {
    const convoFound = await Conversations.find({
      members: { $in: [req.params.id] },
    }).sort({'chats.messages.date': -1}).populate('members')
  
    convoFound ? res.status(200).send(convoFound) : res.status(200).send({});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
module.exports = {
  createMessage,
  fetchMessages,
  fetchAllConversations,
};
