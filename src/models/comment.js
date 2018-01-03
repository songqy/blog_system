var Comment = require('../lib/mongo').Comment;


module.exports = {
    // 通过文章id和用户名获取一条评论
    getSingleComment: function getSingleComment(post_id, user_name) {
        return Comment.findOne({ post_id: post_id, user_id: user_name }).exec();
    },

    //根据评论id获取一条评论
    getSingleCommentById: function getSingleCommentById(id) {
        return Comment.findById(id).exec();
    },


    //根据文章id获取所有评论
    getCommentsByPostId: function getCommentsByPostId(post_id) {
        return Comment.find({ post_id: post_id }).sort({ time: -1 }).exec();
    },

    //通过文章id和用户id添加一条评论
    addComment: function addComment(comment) {
        return Comment.create(comment);
    },

    //删除指定文章的评论
    delCommentsByPostId: function delCommentsByPostId(post_id) {
        return Comment.remove({ post_id: post_id }).exec();
    }
}
