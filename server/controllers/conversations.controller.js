const Conversations = require('../models/Conversations.model');
const createMessage = async (req, res) => {
  try {
    // console.log('Avatar Updating', req.body, req.user);

    const convoCreated = await Conversations.create(
     req.body
    );
    console.log('avatar img', req.body.image);

    res.status(201).send(convoCreated);
  } catch (error) {
    res.status(500).send({ error: error.message });
  } 
};

module.exports = {
  createMessage,
};
