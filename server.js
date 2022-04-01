const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//app
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
const whitelist = [`${process.env.CLIENT_URL}`];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};
//app.use(cors(corsOptions));
app.use(cors());

/* if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
 */

//routes middleware
app.use("/api/auth", require("./routes/auth"));
app.use("/api/category", require("./routes/category"));
app.use("/api/tag", require("./routes/tag"));

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});

//server configuration
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((res) => console.log("connected to database"))
    .catch((err) => console.log("not connected", err));
});
