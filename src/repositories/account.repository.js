import { db } from '../config/database.js';

const createAccount = (body) => db.collection('accounts').insertOne(body);

const findUserAccount = (body) => db.collection('accounts').findOne(body);

const updateAccountMovements = (account, value) => db.collection('accounts').updateOne(account, { $push: { movements: value } });

const listAccountMovements = (body) => db.collection('accounts').findOne(body);

const deleteMovement = (idBody, delBody) => db.collection('accounts').updateOne(idBody, { $pull: { movements: delBody } });

const updateMovement = (id, body, newValue, newDesc) => db.collection('accounts').updateOne(
  { userId: id, movements: { $elemMatch: body } },
  { $set: { 'movements.$.opValue': newValue, 'movements.$.desc': newDesc } },
);

export default {
  createAccount,
  findUserAccount,
  updateAccountMovements,
  listAccountMovements,
  deleteMovement,
  updateMovement,
};
