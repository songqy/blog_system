var express = require('express');
var app = express();

var PostModel = require('../models/posts');




app.get('/', function(req, res) {
    console.log(req.session);
    if (req.session.user) {
        var user_name = req.session.user.name;
        var head_img_url = req.session.user.head_img_url || "img/head_img.jpg";
        var pageSize = 10;
        PostModel.getPostsNum(user_name, 0).then(function(req_) {
            posts_num = req_;
            res.render("posts_list", { user_name: user_name, posts_num: posts_num, pageSize: pageSize, head_img_url: head_img_url });
        })

    } else {
        console.log("redirect");
        res.redirect("/home.html");
    }
})



module.exports = app;
