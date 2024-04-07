const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post")
module.exports = {
  getPost: async (req, res) => {
    try {
      //id parameter comes from the post routes
      //router.get("/:id", ensureAuth, postsController.getPost);
      //http://localhost:2121/post/631a7f59a3e56acfc7da286f
      //id === 631a7f59a3e56acfc7da286f
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      
      await Post.create({
        title: req.body.title,
    
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
     
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/");
    } catch (err) {
      res.redirect("/");
    }
  },
};
