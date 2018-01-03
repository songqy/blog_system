var express = require('express');
var app = express();
var moment = require('moment');
moment.locale('zh-cn');

var PostModel = require('../models/posts');






// 处理所有的Get请求
app.get('/', function(req, res) {
    var user_name = "";
    var head_img_url = "";
    if (req.session.user) {
        user_name = req.session.user.name;
        head_img_url = req.session.user.head_img_url || "img/head_img.jpg";
    }
    else{
        head_img_url = "img/head_img.jpg";
    }

    var pageSize = req.query.pageSize || 10;
    var page = req.query.page || 1;
    var target_user = req.query.target_user;

    var posts_num = 0;
    var posts = []

    var p1 = PostModel.getPostsNum(target_user, 0).then(function(req_) {
        posts_num = req_;
    })

    var p2 = PostModel.getPostsByUser(pageSize, page, target_user).then(function(req_) {
        posts = req_;
        //时间格式化
        var date_now = new Date();
        posts.forEach(function(item) {
            var tmp_time = null;
            var diff = date_now - item.time;
            var diff_minutes = Math.floor(diff / (60 * 1000));
            if (diff_minutes == 0) {
                tmp_time = "刚刚";
            } else if (diff_minutes < 60) {
                tmp_time = diff_minutes + "分钟前";
            } else if (diff_minutes < 24 * 60) {
                var diff_hours = Math.floor(diff_minutes / 60);
                tmp_time = diff_hours + "小时前";
            } else if (diff_minutes <= 24 * 60 * 10) {
                var diff_days = Math.floor(diff_minutes / (60 * 24));
                tmp_time = diff_days + "天前";
            } else {
                tmp_time = moment(item.time).format("YYYY年M月D日，HH:mm:ss");
            }
            item.date = tmp_time;
        });

        console.log("posts:" + posts);

    });

    Promise.all([p1, p2]).then(function(res_) {
        res.render("posts_user", { posts: posts, user_name: user_name, target_user: target_user, posts_num: posts_num, pageSize: pageSize, page: page, head_img_url: head_img_url });
    });
})



module.exports = app;
