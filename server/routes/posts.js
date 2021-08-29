const router = require("express").Router();
const passport = require("passport");
const Post = require("../models/Post");
const User = require("../models/User");
var ObjectID = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");

//upload slike
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

router.route("/add").post(
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const text = req.body.text.trim();

    const newPost = new Post({
      user: {
        id: req.user.id,
        login: req.user.login,
        userImage: req.user.userImage,
      },
      imageUrl: req.body.imageUrl,
      text,
    });

    newPost
      .save()
      .then((posts) => res.json(posts))
      .catch((err) => console.log(err));
  }
);

router.route("/").get((req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

router
  .route("/following")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    Post.find({
      "user.id": { $in: req.user.following },
    })
      .sort({ createdAt: -1 })
      .then((posts) => res.json(posts))
      .catch((err) => console.log(err));
  });

//
router
  .route("/liked")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    Post.find({
      _id: { $in: req.user.liked },
    })
      .sort({ createdAt: -1 })
      .then((posts) => res.json(posts))
      .catch((err) => console.log(err));
  });

//

router.route("/:userId").get((req, res) => {
  Post.find({ "user.id": req.params.userId })
    .sort({ createdAt: -1 })
    .then((posts) => res.json(posts)) //kad se uspjesno nadu onda ih saljemo klijentu
    .catch((err) => console.log(err));
});

router.route("/post/:id").get((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        return res.json({
          id: post._id,
          text: post.text,
          userId: post.user.id,
          likes: post.likes,
        });
      } else {
        return res.status(404).json({ msg: "Post not found" });
      }
    })
    .catch((err) => console.log(err));
});
router
  .route("/liked")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    Post.find({
      _id: { $in: req.user.liked },
    })
      .sort({ createdAt: -1 })
      .then((posts) => res.json(posts))
      .catch((err) => console.log(err));
  });

/*
//like
router
  .route("/like")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    Post.findOneAndUpdate(
      {
        _id: req.post.id,
      },
      {
        $push: { likes: req.body.userId },
      },
      { new: true }
    )
      .then((post) => {
        User.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          {
            $push: { liked: req.post.id },
          },
          { new: true }
        )
          .then((user) => res.json({ userId: req.body.userId }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

//unlike
router
  .route("/unlike")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    Post.findOneAndUpdate(
      {
        _id: req.post.id,
      },
      {
        $pull: { likes: req.body.userId },
      },
      { new: true }
    )
      .then((user) => {
        User.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          {
            $pull: { liked: req.post.id },
          },
          { new: true }
        )
          .then((user) => res.json({ userId: req.body.userId }))
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err));
  });
*/
router
  .route("/user/:_id/like")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $push: { liked: req.body.postId },
      },
      { new: true }
    )
      .then((post) => {
        Post.findOneAndUpdate(
          {
            _id: req.body.postId,
          },
          {
            $push: { likes: req.user.id },
          },
          { new: true }
        )
          .then((post) => res.json({ postId: req.body.postId }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

router
  .route("/user/:_id/unlike")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $pull: { liked: req.body.postId },
      },
      { new: true }
    )
      .then((post) => {
        Post.findOneAndUpdate(
          {
            _id: req.body.postId,
          },
          {
            $pull: { likes: req.user.id },
          },
          { new: true }
        )
          .then((post) => res.json({ postId: req.body.postId }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

//delete
router.delete("/post/:_id", async (req, res) => {
  await Post.findByIdAndDelete(req.params._id)
    .then((post) => {
      if (post) {
        return res.json({
          msg: "Post is deleted",
          text: post.text,
        });
      } else {
        return res.status(404).json({ msg: "Post not found" });
      }
    })

    .catch((err) => console.log(err));
});

//--Update
router.route("/post/:_id").put(function (req, res) {
  Post.findByIdAndUpdate(req.params._id, { text: req.body.text }, function (
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  }).catch((err) => console.log(err));
});

module.exports = router;
