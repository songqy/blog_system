var express = require('express');
var app = express();
var CommentModel = require('../models/comment');
var PostModel = require('../models/posts');

var moment = require('moment');
moment.locale('zh-cn');


//获取文章的所有评论
app.get("/", function(req, res) {
    console.log(req.query);
    var post_id = req.query.post_id

    var comments = [];

    CommentModel.getCommentsByPostId(post_id).then(function(req_) {
        comments = req_;
        if (!comments) {
            res.send("没有评论");
            console.log("没有评论");
        } else {
            comments.forEach(function(item) {
                var tmp_time = moment(item.time).format("YYYY年M月D日，HH:mm:ss");
                console.log(tmp_time);
                item.date = tmp_time;
                console.log(item.date);
            });
            console.log(comments);
            res.send(comments);
            
        }
    });
});


//添加一条评论
app.get("/addcomment", function(req, res) {
    if (!req.session.user) {
        res.send("请先登录");
        return;
    }
    console.log(req.query);
    var comment = req.query.comment;
    var comment_num = req.query.comment_num;

    var user_name = req.session.user.name;
    comment.user_name = user_name;

    console.log(comment, comment_num);

    var p1 = CommentModel.addComment(comment).then(function(res_) {
        console.log(res_);
    });

    var p2 = PostModel.updateCommentNumById(comment.post_id, comment_num).then(function(res_) {
        console.log(res_);
    })

    Promise.all([p1, p2]).then(function(res_) {
        res.send("success");
    });

});



module.exports = app;
