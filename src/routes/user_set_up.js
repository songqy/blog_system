var express = require('express');
var app = express();

var UsersModel = require('../models/users');
var PostModel = require("../models/posts.js");

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var formidable = require('formidable');

app.get("/", function(req, res) {
    if (!req.session.user) res.redirect("/home.html");

    var head_img_url = req.session.user.head_img_url || "img/head_img.jpg";

    var user_name = req.session.user.name;

    res.render("user_set_up", { user_name: user_name, head_img_url: head_img_url })

});

var userDirPath = "./dist/img"



app.post("/img_upload", function(req, res) {
    if (!req.session.user) res.redirect("/home.html");

    var user_name = req.session.user.name;

    console.log(user_name);

    var file = req.body.file;

    // console.log(file);

    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = userDirPath; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.type = true;
    var displayUrl;


    // req
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        // console.log(files.head_img);

        var img_url = files.head_img.path;

        res.send(img_url);

    });
});



app.get("/head_img_upload", function(req, res) {
    if (!req.session.user) res.send("请先登录");
    var user_name = req.session.user.name;

    var url = req.query.url;

    var p1 = UsersModel.updataHeadImgUrl(user_name, url).then(function(res_) {
        console.log("head_img_upload");

        // p1 = UsersModel.getUserByName(user_name).then(function(user) {
        //     req.session.user = user;
        //     console.log(req.session.user);
        // });
        req.session.user = { name: user_name, head_img_url: url };
    });

    var p2 = PostModel.upadtePostsUserHeadImg(user_name, url).then(function(res_) {;
    });

    Promise.all([p1, p2]).then(function(res_) {
        res.send("success");
    })

});



module.exports = app;
