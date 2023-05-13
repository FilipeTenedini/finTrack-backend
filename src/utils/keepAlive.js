import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { KEEPALIVE_URL } = process.env;
const INTERVAL_DURATION = 30000;

async function keepAlive() {
  try {
    await axios.get(KEEPALIVE_URL);
  } catch (error) {
    console.log(`Error sending keep-alive request to ${KEEPALIVE_URL}:`, error);
  }
}

function startKeepAlive() {
  if (KEEPALIVE_URL) {
    console.log(`Starting keep-alive requests to ${KEEPALIVE_URL} every ${INTERVAL_DURATION}ms.`);
    setInterval(keepAlive, INTERVAL_DURATION);
  } else {
    console.log('KEEPALIVE_URL is not defined. Keep-alive requests will not be sent.');
  }
}

export default startKeepAlive;
