import userRepository from '../repositories/user.repository.js';

async function validToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ message: 'Token not sent' });

  const [tokenType, token] = authorization.split(' ');

  if (tokenType !== 'Bearer' || !token) return res.status(401).send({ message: 'Send invalid Bearer token' });

  try {
    const user = await userRepository.findByToken(token);

    if (!user) return res.status(404).send({ message: 'User not found.' });

    req.user = user;
  } catch (err) {
    console.log(err.message);
  }

  next();
}

export default validToken;
