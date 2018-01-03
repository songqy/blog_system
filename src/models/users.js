var Users = require('../lib/mongo').Users;


module.exports = {
    // 通过用户名获取用户信息
    getUserByName: function(name) {
        return Users.findOne({
            name: name
        }).exec();
    },

    //新增用户
    addUser: function(user) {
        return Users.create(user);
    },

    //通过用户名修改密码
    updatePasswordByName: function(name, new_password) {
        return Users.where({ name: name }).update({ password: new_password }).exec();
    },

    updataHeadImgUrl: function(name, url) {
        return Users.where({ name: name }).update({ head_img_url: url }).exec();
    }
}
