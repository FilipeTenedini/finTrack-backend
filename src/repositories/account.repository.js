import { db } from '../config/database.js';

const createAccount = (body) => db.collection('').insertOne(body);

export default {
  createAccount,
};
