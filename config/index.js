const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL || "";

const Config = {
  PORT,
  MONGODB_URL,
};

module.exports = Config;
