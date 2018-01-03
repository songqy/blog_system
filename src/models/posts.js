var Post = require('../lib/mongo').Post;


module.exports = {
    // 创建一篇文章
    create: function create(post) {
        return Post.create(post);
    },

    // 通过文章 id 获取一篇文章
    getPostById: function getPostById(postId) {
        return Post
            .findById(postId)
            .exec();
    },

    // 按时间降序，pageSize和page来获取指定数量的文章
    getPosts: function getPosts(pageSize, page) {
        var query = {};
        var start = (page - 1) * pageSize;
        pageSize = Number(pageSize);
        console.log(start + "  " + pageSize);
        return Post
            .find(query)
            .sort({
                time: -1
            })
            .skip(start)
            .limit(pageSize)
            .select("-content")
            .exec();
    },


    //按时间降序，pageSize和page来获取指定用户名指定数量的文章
    getPostsByUser: function getPostsByUser(pageSize, page, user_name) {
        var query = { user_name: user_name };
        var start = (page - 1) * pageSize;
        pageSize = Number(pageSize);
        console.log(start + "  " + pageSize);
        return Post
            .find(query)
            .sort({
                time: -1
            })
            .skip(start)
            .limit(pageSize)
            .select("-content")
            .exec();
    },

    //获取文章总数
    getPostsNum: function getPostsNum(user_name, date) {
        var query = {};
        if (date != 0) {
            var start_date = new Date(date);
            var end_date = new Date(date);
            end_date.setHours(23, 59, 59, 59);
        }
        if (user_name != null && date == 0)
            query = { user_name: user_name };
        else if (user_name == null && date != 0)
            query = { time: { $gte: start_date, $lte: end_date } };
        else if (user_name != null && date != 0)
            query = { user_name: user_name, time: { $gte: start_date, $lte: end_date } };
        return Post.where(query).count().exec();
    },


    // 通过文章 id 更新一篇文章
    updatePostById: function updatePostById(postId, data) {
        return Post.update({
            _id: postId
        }, {
            $set: data
        }).exec();
    },

    // 通过文章 id 删除一篇文章
    delPostById: function delPostById(postId) {
        return Post.remove({
            _id: postId
        }).exec();
    },

    //通过文章id增加评论数
    updateCommentNumById: function updateCommentNumById(postId, comment_num) {
        console.log("updateCommentNumById:" + comment_num);
        return Post.findById(postId).update({ comment_num: comment_num }).exec();
    },

    //查询某一天的数据
    findPostsByDate: function findPostsByDate(pageSize, page, user_name, date) {

        var start = (page - 1) * pageSize;
        pageSize = Number(pageSize);
        console.log(start + "  " + pageSize);

        var start_date = new Date(date);
        var end_date = new Date(date);
        end_date.setHours(23, 59, 59, 59);

        console.log("end_date:" + end_date);

        if (user_name != null)
            var query = { user_name: user_name, time: { $gte: start_date, $lte: end_date } };
        else
            var query = { time: { $gte: start_date, $lte: end_date } };

        console.log(query);

        return Post.find(query)
            .skip(start)
            .limit(pageSize)
            .select("-content")
            .exec();
    },

    upadtePostsUserHeadImg: function upadtePostsUserHeadImg(user_name, url) {
        return Post.where({ user_name: user_name }).setOptions({ multi: true }).update({ head_img_url: url }).exec();
    }
};
