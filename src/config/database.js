import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient();

async function connectMongoDb() {
  try {
    await mongoClient.connect();
  } catch (err) {
    console.log(err.message);
  }
}

export const db = mongoClient.db();

export default connectMongoDb;
