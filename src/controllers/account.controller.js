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
    opValue, type, desc, data,
  } = req.locals;

  try {
    const acc = await accountRepository.findUserAccount({ userId: req.user._id });

    const { modifiedCount } = await accountRepository.deleteMovement({ _id: acc._id }, {
      type, opValue, desc, data,
    });

    if (!modifiedCount) return res.status(400).send({ message: 'Item Not deleted or not found' });

    return res.status(202).send('Deleted');
  } catch (err) {
    console.log(err.message);
  }
}

async function updateTransaction(req, res) {
  const { user } = req;

  const {
    error, value: {
      opValue, type, desc, data, newValue, newDesc,
    },
  } = accountMovement.validate({
    opValue: req.body.opValue,
    type: req.body.type,
    desc: req.body.desc,
    data: req.body.data,
    newValue: req.body.newValue,
    newDesc: req.body.newDesc,
  });
  if (error) {
    return res.status(422).send({ message: error.details.map((detail) => detail.message) });
  }
  console.log(newDesc);
  try {
    const t = await accountRepository.updateMovement(user._id, {
      type, opValue, desc, data,
    }, newValue, newDesc);
    console.log(t);
    res.status(200).send('Movement has been made.');
  } catch (err) {
    console.log(err.message);
  }
}
export default {
  newTransaction, listMovements, deleteTransaction, updateTransaction,
};
