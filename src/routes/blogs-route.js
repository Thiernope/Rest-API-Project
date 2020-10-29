const express = require('express');
const router = express.Router();
const Blog = require('../database/models/blog-post-model.js');
//post a blog
router.post('/blogs', async(req, res)=>{
const blog = new Blog({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content
});

try{
const savedBlog = await blog.save()
res
.status(201)
.json({message: "The blog is created"});
}catch(err){
res
.status(400)
.json(err.message);
}

})

//Getting all blogs

router.get('/blogs', async(req, res)=>{

    try{
        const blogs = await Blog.find();
        res
        .status(200)
        .json(blogs);
    }catch(err){
      res
      .status(404)
      .json(err.message);
    }
   
});


//getting specific blog
router.get('/blogs/:blogId', async(req, res)=>{
    try{
const neededBlog = await Blog.findById(req.params.blogId);
res
.status(200)
.json(neededBlog);
    }catch(err){
res
.status(404)
.send("the blog Post is not found")
    }
})

//deleting a post 

router.delete('/blogs/:blogId', async(req, res)=>{
try{
const deletedBlog = await Blog.deleteOne({_id: req.params.blogId});
res
.status(200)
.json({message: "The blog is alread removed"})
}catch(err){
res
.status(404)
.json({message: "The blog post you want to delete is not there"});
}
});


//updating a blog elements of a chose blog by its id

router.patch('/blogs/:blogId', async(req, res)=>{
    try{
const updatedBlog = await Blog.updateOne(
    {_id: req.params.blogId},
    {$set:{
        title:req.body.title,
        author: req.body.author,
        content: req.body.content
    }});

    res
    .status(200)
    .json({message: "The blog is updated"})
    }catch(err){
    res
    .status(404)
    .json({message: "the blog is not updated"});
    }
});


//updating the as a whole blog

router.put('/blogs/:blogId', async(req, res)=>{
    try{
const updatedBlog = await Blog.updateOne(
    {_id: req.params.blogId},
    {$set:{
        title:req.body.title,
        author: req.body.author,
        content: req.body.content
    }});

    res
    .status(200)
    .send("The blog is updated");
    }catch(err){
    res
    .status(404)
    .json(err.message);
    }
});



module.exports = router;
