const dotenv = require("dotenv");

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 80;
const MONGODB_URL = process.env.MONGODB_URL || "";

const Config = {
  SERVER_PORT,
  MONGODB_URL,
};

module.exports = Config;
