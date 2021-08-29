const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Post = require("../models/Post");
const multer = require("multer");
const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.route("/register").post((req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email was used!";
      return res.status(404).json(errors);
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        const newUser = new User({
          email: req.body.email,
          login: req.body.login,
          password: hash,
          userImage: req.body.userImage,
        });

        newUser
          .save()
          .then((newUser) => res.json(newUser))
          .catch((err) => console.log(err));
      });
    });
  });
});

router.route("/login").post((req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          const token = jwt.sign(
            { id: user._id },
            process.env.SECRET,
            { expiresIn: "1d" },
            function (err, token) {
              return res.json({
                success: true,
                token: token,
              });
            }
          );
        } else {
          errors.password = "Password is incorrect";
          return res.status(404).json(errors);
        }
      });
    } else {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
  });
});

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
      _id: req.user._id,
      email: req.user.email,
      login: req.user.login,
      userImage: req.user.userImage,
      followers: req.user.followers,
      following: req.user.following,
      liked: req.user.liked,
    });
  });

router
  .route("/follow")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $push: { following: req.body.userId },
      },
      { new: true }
    )
      .then((user) => {
        User.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          {
            $push: { followers: req.user.id },
          },
          { new: true }
        )
          .then((user) => res.json({ userId: req.body.userId }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
router
  .route("/unfollow")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $pull: { following: req.body.userId },
      },
      { new: true }
    )
      .then((user) => {
        User.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          {
            $pull: { followers: req.user.id },
          },
          { new: true }
        )
          .then((user) => res.json({ userId: req.body.userId }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
////----------------------
/*router
  .route("/like")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $push: { liked: req.body.userId },
      },
      { new: true }
    )
      .then((user) => {
        Post.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          {
            $push: { likes: req.user.id },
          },
          { new: true }
        )
          .then((user) => res.json({ userId: req.body.userId }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

router
  .route("/unlike")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $pull: { liked: req.body.userId },
      },
      { new: true }
    )
      .then((user) => {
        Post.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          {
            $pull: { likes: req.user.id },
          },
          { new: true }
        )
          .then((user) => res.json({ userId: req.body.userId }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
*/
////-----------------------
router.route("/search").post((req, res) => {
  User.findOne({
    //pretraga po login ili emailu
    $or: [{ email: req.body.text }, { login: req.body.text }],
  })
    .then((user) => res.json({ userId: user._id }))
    .catch((err) => res.status(404).json({ msg: "User not found" }));
});

//liked posts
/*
router.route("/:id/liked").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.json({
          _id: user._id,
          email: user.email,
          login: user.login,
          userImage: user.userImage,
          followers: user.followers,
          following: user.following,
          liked: user.liked,
        });
      } else {
        return res.status(404).json({ msg: "User not found" });
      }
    })
    .catch((err) => console.log(err));
});
*/

//

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.json({
          _id: user._id,
          email: user.email,
          login: user.login,
          userImage: user.userImage,
          followers: user.followers,
          following: user.following,
          liked: user.liked,
        });
      } else {
        return res.status(404).json({ msg: "User not found" });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
