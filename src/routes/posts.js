var PostModel = require('../models/posts');
var CommentModel = require('../models/comment');
var express = require('express');
var app = express();

app.get("/", function(req, res) {
    var pageSize = req.query.pageSize;
    var page = req.query.page;


    PostModel.getPosts(pageSize, page).then(function(req_) {
        var post = req_;
        console.log("post:" + post);
        res.send(post);
    });

});

app.get("/getPostsByUser", function(req, res) {
    var pageSize = req.query.pageSize;
    var page = req.query.page;
    var user_name = req.session.user.name;
    console.log("user_name:" + user_name + "getPosts");


    PostModel.getPostsByUser(pageSize, page, user_name).then(function(req_) {
        var post = req_;
        console.log("post:" + post);
        res.send(post);
    });

});

app.post("/create", function(req, res) {
    var post = req.query;
    post.user_name = req.session.user.name;
    post.head_img_url = req.session.user.head_img_url;
    console.log("createPost:\n" + post)

    PostModel.create(post).then(function(res_) {
        console.log(res_);
        res.send(res_);
    });

});


app.get("/getPostById", function(req, res) {
    var post_id = req.query.id;
    console.log("getPost" + post_id);

    PostModel.getPostById(post_id).then(function(res_) {
        console.log(res_);
        res.send(res_);
    })
});

app.post("/updatePostById", function(req, res) {
    var data = req.query;
    console.log("updatePost:" + data.id);

    PostModel.updatePostById(data.id, data.modify_data).then(function(res_) {
        console.log(res_);
        res.send(res_);
    });
});

app.get("/delPostById", function(req, res) {
    var post_id = req.query.id;
    console.log("deletePost:" + post_id);

    //删除文章
    var p1 = PostModel.delPostById(post_id).then(function(res_) {
        console.log(res_);
    });

    //删除文章评论
    var p2 = CommentModel.delCommentsByPostId(post_id).then(function(res_) {
        console.log(res_);
    });

    Promise.all([p1, p2]).then(function(res_) {
        res.send("success");
    });
});






module.exports = app;
