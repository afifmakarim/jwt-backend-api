var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var productsRouter = require("./routes/products");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/cms/api/v1/contents", usersRouter);
app.use("/cms/api/v1/auth", authRouter);
app.use("/cms/api/v1", productsRouter);

// const { Products } = require("./models/associations");
// Products.sync({ force: true });
// console.log("The table for the User model was just (re)created!");

module.exports = app;
