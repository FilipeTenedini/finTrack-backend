import accountRepository from '../repositories/account.repository.js';
import accountMovement from '../schemas/accountMovement.schema.js';

async function newTransaction(req, res) {
  const { user } = req;

  const {
    error, value: {
      opValue, type, desc, data,
    },
  } = accountMovement.validate({
    opValue: req.body.opValue,
    type: req.params.type,
    desc: req.body.desc,
    data: req.body.data,
  });

  if (error) {
    return res.status(422).send({ message: error.details.map((detail) => detail.message) });
  }

  try {
    const userAccount = await accountRepository.findUserAccount({ userId: user._id });

    if (!userAccount) return res.sendStatus(400);

    await accountRepository.updateAccountMovements(userAccount, {
      type, opValue, desc, data,
    });

    res.status(200).send('Movement has been made.');
  } catch (err) {
    console.log(err.message);
  }
}

async function listMovements(req, res) {
  const { user } = req;

  try {
    const accountMovements = await accountRepository.findUserAccount({ userId: user._id });

    res.status(200).send(accountMovements.movements);
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteTransaction(req, res) {
  const {
    error, value: {
      opValue, type, desc, data,
    },
  } = accountMovement.validate({
    opValue: req.body.opValue,
    type: req.body.type,
    desc: req.body.desc,
    data: req.body.data,
  });

  if (error) {
    return res.status(422).send({ message: error.details.map((detail) => detail.message) });
  }
  try {
    const acc = await accountRepository.findUserAccount({ userId: req.user._id });

    const { modifiedCount } = await accountRepository.deleteMovement({ _id: acc._id }, {
      type, opValue, desc, data,
    });

    if (modifiedCount) return res.status(202).send('Deleted');
  } catch (err) {
    console.log(err.message);
  }
}
export default {
  newTransaction, listMovements, deleteTransaction,
};
