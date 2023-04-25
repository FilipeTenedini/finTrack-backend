function validToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ message: 'Token not sent' });

  const [tokenType, token] = authorization.split(' ');

  if (tokenType !== 'Bearer' || !token) return res.status(401).send({ message: 'Send valid Bearer token' });

  req.tokenType = tokenType;
  req.token = token;

  next();
}

export default validToken;
