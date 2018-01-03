// import Vue from "vue";
// import VueResource from "vue-resource";

import { getPostById, updatePostById } from "./posts.js";
import { getTags, createTag, getTagById } from "./tag.js";

// Vue.use(VueResource);

import { Vue } from "./main.js";

function GetQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    return r[2];
}



var textarea = "";

const post_id = GetQueryString("id");

var modify = new Vue({
    el: "#modify",
    data: {
        id: post_id,
        title: "",
        content: "",
        modify: 0,
        time: "",
        new_tag: "",
        chooseTags: [],
        tags: [],
        isShow : false,
    },
    created: async function() {
        await this.refresh_tag();

        console.log(this.id);

        let data = await getPostById(this.$http, this.id);

        this.title = data.title;
        document.title = this.title;
        this.content = data.content;
        this.modify = data.modify;
        this.time = data.time;
        let tag_ids = data.tag_ids;

        tag_ids = tag_ids.split(",");
        if(tag_ids[0] == "")
            tag_ids.shift();
        console.log(tag_ids);

        let tags = [];
        let v = this;
        for(let tag_id of tag_ids){
            let tag = await getTagById(v.$http, tag_id)
            tags.push(tag);
        };
        this.chooseTags = tags;

        textarea = data.content;
        editor.$txt.html(textarea);
    },
    methods: {
        update: async function() {
            if (this.title == "" || this.chooseTags.length == 0 || editor.$txt.text() == "") {
                alert("请补充内容");
                return;
            }
            textarea = editor.$txt.html();
            let tag_ids = [];
            this.chooseTags.forEach(function(tag) {
                tag_ids.push(tag.tag_id);
            });
            tag_ids = tag_ids.join(',');

            var modify_data = {
                title: this.title,
                // content: this.content,
                // content: editor.$txt.html();
                content: textarea,
                modify: this.modify + 1,
                time: Date.now,
                tag_ids: tag_ids,
            };

            let success = await updatePostById(this.$http, this.id, modify_data);
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
            if(this.chooseTags.includes(tag)) return ;
            this.chooseTags.push(tag);
        },
        choose_not: function(tag) {
            var index = 0;
            for(let item of this.chooseTags){
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
    },
});


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


var editor = new wangEditor('text');
editor.create();
