const router = require("express").Router();
const mongoose = require("mongoose");
const { uploader, cloudinary } = require("../config/cloudinary");
const Post = require("../models/Post.model");
const Event = require("../models/User.model");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

router.get("/posts", isLoggedIn, (req, res) => {
  Post.find()
    .then((posts) => {
      console.log(posts)
      res.render("posts/posts", { posts });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/post-details/:id", isLoggedIn, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      console.log(post)
      res.render("posts/post-details", { post });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/post-form", (req, res) => res.render("posts/post-form"));

router.post("/post-form", uploader.single("img"), isLoggedIn, (req, res, next) => {
  const creatorId = req.session.currentUser._id;
  console.log(creatorId)
  console.log(req.file);
  const { content, title } = req.body;
  const imgName = req.file.originalname;
  const imgPath = req.file.path;
  const publicId = req.file.filename;
  Post.create({ content, imgName, imgPath, publicId, creatorId, title })
    .then((img) => {
      console.log(img);
      res.redirect("/posts");
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;