const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const app = express();
const appConfig = require("./src/config/config");
const PORT = appConfig.appPort || 3001;
const authRoutes = require('./src/routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, POST, PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/auth",authRoutes);

const server = http.createServer(app);
require("./src/socket/socket")(server);
mongoose
  .connect(appConfig.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
