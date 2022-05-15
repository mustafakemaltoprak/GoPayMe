const Conversations = require('../models/Conversations.model');
const createMessage = async (req, res) => {
  try {
    console.log('Avatar Updating', req.body);

    const convoExists = await Conversations.findOne({ members: { $all: req.body.members } });

    console.log('covoexists', convoExists);

    if (!convoExists) {
      // console.log('Fresh', convoExists);
      // const convoCreated = await Conversations.create(req.body).populate('members');

      const convoCreated = await Conversations.create(req.body);

      if (convoCreated) {
        const convo = await Conversations.findOne({
          members: { $all: req.body.members },
        }).populate('members');

        res.status(201).send(convo);
      }

      // const convoCreated = new Conversations(req.body);

      // convoCreated.save(function (err) {
      //   if (err) {
      //     return res.status(500).send({ error: error.message });
      //   }
      //   convoCreated.populate({ path: 'members' }, function (err, doc) {
      //     res.status(201).send(doc);
      //   });
      // });
      // const t = new MyModel(value);
      // await convoCreated.save();
      //  console.log('createdconvp', convoCreated);
      // const x = convoCreated.populate('members').execPopulate();

      // console.log('populated', x)

      return;
      // return convoCreated.save().then((t) => t.populate('members').execPopulate());

      // console.log('was created', convoCreated);
      // res.status(201).send(convoCreated);
    }

    console.log('Updating', req.body);
    const convoUpdated = await Conversations.findOneAndUpdate(
      {
        members: { $all: req.body.members },
      },
      { $push: { 'chats.messages': req.body.chats.messages } },

      { new: true },
    ).populate('members');
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
    console.log('fetching messages', req.params);
    const convoFound = await Conversations.findOne({
      members: { $all: [req.params.id, req.params.uid] },
    }).populate('members');
// console.log('convo found', convoFound);
    convoFound ? res.status(200).send(convoFound) : res.status(200).send({});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const fetchAllConversations = async (req, res) => {
  try {
    // console.log('Avatar Updating', req.body, req.user);
    console.log('fetching messages', req.user.userId);
    const convoFound = await Conversations.find({
      members: { $in: [req.params.id] },
    }).sort({'chats.messages.date': -1}).populate('members')
    // console.log('convo found', convoFound);
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
