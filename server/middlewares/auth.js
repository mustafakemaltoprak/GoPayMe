const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    res.status(401);
    res.send({ error: 'Unauthorized' });
    return;
  }

  const token = authHeaders.split(' ')[1];
  const user = jwt.verify(token, process.env.SECRET);

  if (!user) {
    res.status(401);
    res.json({ error: 'Unauthorized' });
    return;
  }

  req.user = user;
  await next();
};

export { authMiddleware };
