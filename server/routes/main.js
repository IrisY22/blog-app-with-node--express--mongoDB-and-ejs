const express = require("express");
const router = express.Router();
const Post = require('../models/Post')

// Routes

// GET Home

router.get("", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple blog created with NodeJs, Express & MongoDB.",
    };

    let perPage = 6;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);


    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null
    });
  } catch (error) {
    console.log(error);
  }

});

// GET Post :id

router.get("/post/:id", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple blog created with NodeJs, Express & MongoDB.",
    };

    let slug = req.params.id;

    const data = await Post.findById({ _id: slug })
    res.render('post', { locals, data });
  } catch (error) {
    console.log(error);
  }

});

// POST Post searchTerm

router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple blog created with NodeJs, Express & MongoDB.",
    };

    let searchTerm = req.body.searchTerm;
    const searchSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchSpecialChar, 'i') } },
        { body: { $regex: new RegExp(searchSpecialChar, 'i') } }
      ]
    })

    res.render('search', {
      data, locals
    });
  } catch (error) {
    console.log(error);
  }

});







// router.get("", async (req, res) => {
//   const locals = {
//     title: "NodeJs Blog",
//     description: "Simple blog created with NodeJs, Express & MongoDB.",
//   };

//   try {
//     const data = await Post.find()
//     res.render("index", { locals, data });
//   } catch (error) {
//     console.log(error);
//   }

// });

// function insertPostData() {
//   Post.insertMany([
//     {
//       title: 'Building a Blog',
//       body: 'This is the body text'
//     },
//   ])
// }
// insertPostData();




router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
