import accountRepository from '../repositories/account.repository.js';
import userRepository from '../repositories/user.repository.js';
import accountMovement from '../schemas/accountMovement.schema.js';

async function newTransaction(req, res) {
  const { authorization } = req.headers;
  const {
    error, value: {
      opValue, type, desc,
    },
  } = accountMovement.validate({
    opValue: req.body.opValue,
    type: req.params.type,
    desc: req.body.desc,
  });

  if (error) return res.status(422).send({ message: 'Transaction invalid format' });

  if (!authorization) return res.status(401).send({ message: 'Token not sent' });

  const [tokenType, token] = authorization.split(' ');

  if (tokenType !== 'Bearer' || !token) return res.status(401).send({ message: 'Send valid Bearer token' });

  try {
    const user = await userRepository.findByToken(token);

    if (!user) return res.status(404).send({ message: 'User not found.' });

    const userAccount = await accountRepository.findUserAccount({ userId: user._id });

    if (!userAccount) return res.sendStatus(400);

    await accountRepository.updateAccountMovements(userAccount, { type, opValue, desc });

    res.status(200).send('Movement has been made.');
  } catch (err) {
    console.log(err.message);
  }
}
export default {
  newTransaction,
};
