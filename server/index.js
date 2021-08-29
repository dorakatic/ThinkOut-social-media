const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const users = require("./routes/users");
const posts = require("./routes/posts");

//setup enviroment
dotenv.config();
mongoose.Promise = global.Promise;
//mongo db connection
//mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
mongoose.connect(
  "mongodb+srv://twitterAD:" +
    process.env.MONGO_ATL_PASS +
    "@twitter-clone-nwt.rj5zf.mongodb.net/twitter-clone-nwt?retryWrites=true&w=majority",

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("useFindAndModify", false);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/posts", posts);

//run app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sever is running on port ${PORT}`));
