const router = require("express").Router();
const mongoose = require("mongoose");
const { uploader, cloudinary } = require("../config/cloudinary");
const Post = require("../models/Post.model");
const Event = require("../models/User.model");
// const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

router.get("/posts", (req, res) => {
  Post.find()
    .then((posts) => {
      res.render("/posts", { posts });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/post-form", (req, res) => res.render("/post-form"));

router.post("/post-form", uploader.single("img"), (req, res, next) => {
  const creatorId = req.session.currentUser._id;
  console.log(req.file);
  const { content } = req.body;
  const imgName = req.file.originalname;
  const imgPath = req.file.path;
  const publicId = req.file.filename;
  Post.create({ content, imgName, imgPath, publicId, creatorId })
    .then((img) => {
      console.log(img);
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/post-details", (req, res) => res.render("/post-details"));

module.exports = router;
