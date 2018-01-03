var express = require('express');
var app = express();
var moment = require('moment');
moment.locale('zh-cn');

var PostModel = require('../models/posts');
var TagModel = require('../models/tag');


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

    var post_id = req.query.id || 10;

    console.log("getPost:" + post_id);

    PostModel.getPostById(post_id).then(function(res_) {
        console.log(res_);

        //时间格式化
        var tmp_time = moment(res_.time).format("YYYY年M月D日，HH:mm:ss");
        res_.date = tmp_time;

        var tag_ids = res_.tag_ids.split(",");
        if (tag_ids[0] == "")
            tag_ids.shift();

        var tags = [];
        var p = [];
        for (let tag_id of tag_ids) { //获取tag
            tag_id = Number(tag_id);
            var tmp_p = TagModel.getTagById(tag_id).then(function(tag) {
                tags.push(tag[0]);
            });
            p.push(tmp_p);
        };
        Promise.all(p).then(function() {
            res.render("post_detail", { post: res_, tags: tags, user_name: user_name, head_img_url: head_img_url });
        })
    });
})



module.exports = app;
