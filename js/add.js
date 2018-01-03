// import Vue from "vue";
// import VueResource from "vue-resource";

import { createPost } from "./posts.js";
import { getTags, createTag } from "./tag.js";

// Vue.use(VueResource);

import { Vue } from "./main.js";


var textarea = "";

var Add = new Vue({
    el: "#add",
    data: {
        title: "",
        content: "",
        new_tag: "",
        chooseTags: [],
        tags: [],
        isShow: false,
    },
    created: async function() {
        await this.refresh_tag();
    },
    methods: {
        submit: async function(event) {
            if (this.title == "" || this.chooseTags.length == 0 || editor.$txt.text() == "") {
                alert("请补充内容");
                return;
            }
            let tag_ids = [];
            this.chooseTags.forEach(function(tag) {
                tag_ids.push(tag.tag_id);
            });
            tag_ids = tag_ids.join(',');


            let data = {
                title: this.title,
                content: editor.$txt.html(),
                tag_ids: tag_ids,
            };
            console.log(data);
            let success = await createPost(this.$http, data);
            if (success) {
                setProgress();
            }
        },
        create_tag: async function(event) {
            await createTag(this.$http, this.new_tag);
            this.new_tag = "";
            await this.refresh_tag();
        },
        refresh_tag: async function() {
            this.tags = await getTags(this.$http);
        },
        choose: function(tag) {
            if (this.chooseTags.includes(tag)) return;
            this.chooseTags.push(tag);
        },
        choose_not: function(tag) {
            var index = 0;
            for (let item of this.chooseTags) {
                if (item.tag_id == tag.tag_id) {
                    break;
                }
                index++;
            }

            this.chooseTags.splice(index, 1);
        },
        toggle: function() {
            this.isShow = this.isShow ? false : true;
        },
    }
});



var editor = new wangEditor('text');
editor.create();



//设置进度条
function setProgress() {
    var length = 0;
    var intervalId = setInterval(function() {
        if (length > 100) {
            clearInterval(intervalId);
            location.href = "./posts_list.html";
            return;
        } else {
            document.querySelector("#progress>div").style.width = length + "%";
        }
        length += 50;
    }, 500);
}
