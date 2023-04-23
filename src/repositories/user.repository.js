import { db } from '../config/database.js';

const createUser = (body) => db.collection('users').insertOne(body);

const findByEmail = (body) => db.collection('users').findOne(body);

export default {
  createUser, findByEmail,
};
