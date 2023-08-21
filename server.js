const express = require("express");
const Config = require("./config");
const DBService = require("./services/DBService");
const walletRoutes = require("./routes/WalletRoutes");
const transactionRoutes = require("./routes/TransactionRoutes");

//App
const app = express();

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

//Routes middleware
app.use("/api", walletRoutes);
app.use("/api", transactionRoutes);

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/** Server listen and database connection */
const start = async () => {
  await DBService.getConnection();
  app.listen(Config.SERVER_PORT, () => {
    console.info(`Server running on port ${Config.SERVER_PORT}`);
  });
};
start();
