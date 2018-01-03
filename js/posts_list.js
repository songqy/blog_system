// import Vue from "vue";
// import VueResource from "vue-resource";

import { getPostsByUser, deletePost } from "./posts.js";
import { getTagById } from "./tag.js";

// Vue.use(VueResource);

import { Vue } from "./main.js";


var list = new Vue({
    el: "#list",
    data: {
        items: [],
        page : 1,
    },
    created: async function() {
        await this.fetchData(10, 1);
    },
    methods: {
        post_detail: function(id) {
            location.href = "./post_detail.html?id=" + id;
        },
        modify_post: function(id) {
            location.href = "./modify.html?id=" + id;
        },
        delete_post: async function(id) {
            var del = confirm("确定删除");
            if (del) {
                await deletePost(this.$http, id);
                this.fetchData();
            }
        },
        get_posts_by_page: async function(page) {
            if(page == this.page) return;
            await this.fetchData(10, page);
            this.page = page;
        },
        fetchData: async function(pageSize, page) {
            //获取分页的数据，每页数据为10  pageSize  page
            let data = await getPostsByUser(this.$http, pageSize, page);

            for (let item of data) {
                let tag_ids = item.tag_ids.split(",");
                if (tag_ids[0] == "")
                    tag_ids.shift();

                let tags = [];
                let v = this.$http;
                for (let tag_id of tag_ids) {
                    let tag = await getTagById(v, tag_id)
                    tags.push(tag);
                };

                item.tags = tags;
            }

            this.items = data;
        }

    }

});

import l_r from "./login_register.js"

let login_register = l_r();
