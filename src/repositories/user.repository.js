import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';

const createUser = (body) => db.collection('users').insertOne(body);

const findByEmail = (body) => db.collection('users').findOne(body);

const updateTokens = (id, token) => db.collection('users').updateOne({ _id: new ObjectId(id) }, { $push: { tokens: token } });

export default {
  createUser, findByEmail, updateTokens,
};
