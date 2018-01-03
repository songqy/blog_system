var TagModel = require('../models/tag');
var express = require('express');
var app = express();


app.get("/", function(req, res) {
    TagModel.getTags().then(function(req_) {
        var text = req_;
        console.log(text);
        res.send(text);
    });

});

app.get("/create", function(req, res) {
    var tag_name = req.query.tag_name;
    console.log("Create Tag:" + tag_name);

    TagModel.getTagsSum().then(function(num) {
        var new_tag = {
            tag_id: num + 1,
            tag_name: tag_name,
        };
        TagModel.create(new_tag).then(function(req_) {
            var text = req_;
            console.log(text);
            res.send(text);
        });
    });


});

app.get("/getTagById", function(req, res) {
    var tag_id = req.query.tag_id;
    console.log("getTag:" + tag_id);

    TagModel.getTagById(tag_id).then(function(req_) {
        var text = req_;
        console.log(text);
        res.send(text);
    })
});


app.get("/getTagByName", function(req, res) {
    var tag_name = req.query.tag_name;
    console.log("getTag:" + tag_name);

    TagModel.getTagByName(tag_name).then(function(req_) {
        var text = req_;
        console.log(text);
        res.send(text);
    })
});

module.exports = app;
