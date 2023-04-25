import { db } from '../config/database.js';

const createAccount = (body) => db.collection('accounts').insertOne(body);

const findUserAccount = (body) => db.collection('accounts').findOne(body);

const updateAccountMovements = (account, value) => db.collection('accounts').updateOne(account, { $push: { movements: value } });

const listAccountMovements = (body) => db.collection('accounts').findOne(body);

export default {
  createAccount, findUserAccount, updateAccountMovements, listAccountMovements,
};
