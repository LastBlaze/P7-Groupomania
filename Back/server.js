const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || "3001";
const userRouter = require("./routes/userRoute");
const mongoose = require("mongoose");
const msgRouter = require("./routes/msgRoute");
const path = require("path");
const cookiesParser = require("cookie-parser");

dotenv.config();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, withCredentials"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(cookiesParser());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/msg", msgRouter);

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => {
    console.log("Connexion à MongoDB échouée !");
    console.error(error);
  });

app.listen(port);
