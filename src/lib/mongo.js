var config = require('config-lite');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


// var mongoose = new Mongoose();
mongoose.connect(config.mongodb);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


//admin 管理员
// var adminSchema = new Schema({
//     name: String,
//     password: String,
// });

// adminSchema.index({
//     name: 1
// }, {
//     unique: true
// });

// exports.Admin = mongoose.model('Admin', adminSchema);


//users 用户
var usersSchema = new Schema({
    name: String,
    password: String,
    head_img_url: String,
});

usersSchema.index({
    name: 1
}, {
    unique: true
});

exports.Users = mongoose.model('Users', usersSchema);



//post 文章
var postSchema = new Schema({
    user_name: String, //创建文章的用户名
    head_img_url : String,//用户头像
    title: String,
    content: String,
    time: { //创建或最后一次修改时间
        type: Date,
        default: Date.now
    },
    modify: { //修改次数
        type: Number,
        default: 0,
    },
    tag_ids: String, //文章tag的id
    comment_num: { //评论数
        type: Number,
        default: 0,
    }

});


postSchema.index({
    _id: -1
});

exports.Post = mongoose.model('Post', postSchema);



//tag 标签
var tagSchema = new Schema({
    tag_id: String,
    tag_name: String
});

exports.Tag = mongoose.model('Tag', tagSchema);


//comment 评论
var commentSchema = new Schema({
    post_id: ObjectId,
    user_name: String,
    content: String,
    time: {
        type: Date,
        default: Date.now
    }
});

exports.Comment = mongoose.model('Comment', commentSchema);
