var express = require('express');
var app = express();
var UsersModel = require('../models/users');

var sha1 = require('sha1');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//用户登录
app.post("/", function(req, res) {
    console.log(req.body);
    var name = req.body.name;
    var password = req.body.password;
    // password = sha1(password);

    UsersModel.getUserByName(name).then(function(user) {
        if (!user) {
            res.send("没有此用户");
            console.log("没有此用户");
        } else if (user.password != password) {
            res.send("密码错误");
            console.log("密码错误");
        } else {
            if (req.session.user) {
                console.log("已登录");
            } else {
                console.log("未登录");
                req.session.user = user;
            }

            res.send("登录成功");
            console.log("登录成功");
            // res.redirect("../views/backEdit.html");
        }
    })

});


//用户注册
app.post("/register", function(req, res) {
    console.log(req.body);
    var name = req.body.name;
    var password = req.body.password;
    // password = sha1(password);

    UsersModel.getUserByName(name).then(function(user) {
        if (user) {
            res.send("用户名已存在");
            console.log("用户名已存在");
        } else {
            var new_user = {
                name: name,
                password: password,
            };
            UsersModel.addUser(new_user).then(function(res_) {
                res.send("注册成功");
                console.log("注册成功");
                req.session.user = user;
            });
        }
    })

});


//用户修改密码
app.post("/updatepassword", function(req, res) {
    console.log(req.body);
    var name = req.session.user.name;
    var password = req.body.password;
    // password = sha1(password);
    var new_password = req.body.new_password;
    // new_password = sha1(new_password);

    UsersModel.getUserByName(name).then(function(user) {
        if (!user) {
            res.send("没有此用户");
            console.log("没有此用户");
        } else if (user.password != password) {
            res.send("密码错误");
            console.log("密码错误");
        } else {
            UsersModel.updatePasswordByName(name, new_password).then(function(res_) {
                res.send("密码修改成功");
                console.log("密码修改成功");
            })
        }
    })

});


//用户退出
app.get("/logout", function(req, res) {
    if (req.session.user) {
        req.session.user = null;
        res.send("success");
    } else {
        res.send("fail");
    }


});










module.exports = app;
