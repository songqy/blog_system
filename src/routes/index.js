var path = require('path');
// var UserModel = require('../models/user');
// var sha1 = require('sha1');


module.exports = function(app) {

    var getPath = function(p) {
        var _path = path.resolve(__dirname, "../../views");
        _path = path.join(_path, p);
        console.log("GET: " + _path);
        return _path;
    };

    app.get('/', function(req, res) {
        // res.sendFile(getPath("/home.html"));
        res.redirect("/home.html");
    });




    // app.get('/home(.html)?', function(req, res) {
    //     res.sendFile(getPath("/home.html"));
    // });

    app.use('/home(.html)?', require('./home'));

    app.use('/posts_user(.html)?',require('./posts_user'))

    app.use('/post_detail(.html)?', require('./post_detail'));


    app.use('/posts_list(.html)?', require('./posts_list'));

    app.use('/user_set_up(.html)?', require('./user_set_up'));

    // app.get('/post_detail(.html)?', function(req, res) {
    //     res.sendFile(getPath("/post_detail.html"));
    // });

    // app.get('/admin(.html)?', function(req, res) {
    //     res.sendFile(getPath("/admin.html"));
    // });

    app.get("/add(.html)?", function(req, res) {
        console.log(req.session);
        if (req.session.user) {
            res.sendFile(getPath("/add.html"));
        } else {
            console.log("redirect");
            res.redirect("/home.html");
        }
    });

    app.get("/modify(.html)?", function(req, res) {
        console.log(req.session);
        if (req.session.user) {
            res.sendFile(getPath("/modify.html"));
        } else {
            console.log("redirect");
            res.redirect("/home.html");
        }
    });

    // app.get('/posts_list(.html)?', function(req, res) {
    //     console.log(req.session);
    //     if (req.session.user) {
    //         res.sendFile(getPath("/posts_list.html"));
    //     } else {
    //         console.log("redirect");
    //         res.redirect("/home.html");
    //     }
    // });

    // app.use('/login_admin', require('./login_admin'));

    app.use('/tag', require('./tag'));
    app.use('/posts', require('./posts'));
    app.use('/comment', require('./comment'));
    app.use('/users', require('./users'));


    //注册管理员帐号
    // app.get('/register(.html)?', function(req, res){
    //     res.sendFile(getPath("/register.html"));
    // });

    // app.get('/routes/backRegister', function(req, res){
    //     console.log(req.query);
    //     var name = req.query.name;
    //     var password = req.query.password;

    //     UserModel.getUserByName(name).then(function(user){
    //         if(!user){
    //             password = sha1(password);
    //             var user = {
    //                 name : name,
    //                 password : password
    //             };

    //             UserModel.addUser(user).then(function(){
    //                 res.send("success");
    //             });
    //         }
    //     })
    // })

};
