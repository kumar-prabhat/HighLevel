const mongoose = require("mongoose");
const Config = require("../config");

/**
 * For MongoDB Connection
 */

class MongoDB {
  connection;
  constructor() {
    this.connection = null;
  }
  async connect() {
    try {
      mongoose.Promise = global.Promise;
      await mongoose.connect(Config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.connection = mongoose.connection;
      console.info("MongoDB Connection has been established successfully.");
    } catch (err) {
      console.error("Unable to connect to the database:", err);
      throw err;
    }
  }

  async init() {
    try {
      if (!this.connection) await this.connect();
      console.info("DBService initialized successfully.");
    } catch (ex) {
      console.error("Error: ", ex);
      throw ex;
    }
  }

  async getConnection() {
    try {
      await this.init();
      return this.connection;
    } catch (ex) {
      console.error("Error: ", ex);
      process.exit(1);
    }
  }
}
const DBService = new MongoDB();

module.exports = DBService;
