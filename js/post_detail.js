// import Vue from "vue";
// import VueResource from "vue-resource";

import { getPostById } from "./posts.js";
import { getTagById } from "./tag.js";
import { getComments, addComment } from "./comment.js";
import { user_login, user_register } from "./users.js";

// Vue.use(VueResource);

import { Vue } from "./main.js";

import l_r from "./login_register.js"

function GetQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    return r[2];
}

const post_id = GetQueryString("id");

var textarea = "";


var post = new Vue({
    el: "#post",
    data: {
        comment_num: 0,
        comments: [],
        // user_name: "",
        // new_user_name: "",
        // new_user_password: "",
        new_comment: "",
    },
    created: async function() {
        await this.fetchData();
    },
    methods: {
        fetchData: async function() {
            
            await this.fetchComments();
        },
        fetchComments: async function() {
            console.log("load comments");
            let data = await getComments(this.$http, post_id);

            this.comment_num = data.length;

            this.comments = data;
        },
        comment: async function() {
            if ($(".login>span:nth-child(1)").html() == "登录") {
                alert("请先登录");
                return;
            }
            if (editor.$txt.text() == "") {
                alert("请填写评论");
                return;
            }
            textarea = editor.$txt.html();

            let tmp_comment = {
                post_id: post_id,
                user_name: "",
                content: textarea,
            };
            console.log(tmp_comment);
            let success = await addComment(this.$http, tmp_comment, this.comment_num + 1);
            if (success) {
                alert("评论成功");
                await this.fetchComments();
                editor.clear();
            }
        },

    }

});

let login_register = l_r();

var editor = new wangEditor('text');
editor.config.menuFixed = false;
editor.create();

