import { db } from '../config/database.js';

const createUser = (body) => db.collection('').insertOne(body);

const findByEmail = (body) => db.collection('').findOne(body);

export default {
  createUser, findByEmail,
};
