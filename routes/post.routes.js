const router = require("express").Router();
const mongoose = require("mongoose");
const { uploader, cloudinary } = require("../config/cloudinary");
const Post = require("../models/Post.model");
const Event = require("../models/User.model");

// .get() route ==> to display the signup form to users
router.get("/post", isLoggedIn, (req, res) => res.render("/post-form"));

router.post(
  "/post-form",
  isLoggedIn,
  uploader.single("img"),
  (req, res, next) => {
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
  }
);
