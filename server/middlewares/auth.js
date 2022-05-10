const jwt =  require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    res.status(401);
    res.send({ error: 'Unauthorized' });
    return;
  }

  const token = authHeaders.split(' ')[1];
    console.log('Secret', process.env.SECRET, token);
  const user = jwt.verify(token, process.env.SECRET);

  if (!user) {
    res.status(401);
    res.json({ error: 'Unauthorized' });
    return;
  }

  req.user = user;
  await next();
};

 

module.exports = {
  authMiddleware,
};

