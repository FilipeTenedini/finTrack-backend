import { db } from '../config/database.js';

const createAccount = (body) => db.collection('accounts').insertOne(body);

export default {
  createAccount,
};
