import { Vue } from "./main.js";

import { user_login, user_register, user_logout } from "./users.js";

export default function() {
    return new Vue({
        el: "#header",
        data: {
            user_name: "",
            user_password: "",
            logout: false,
            set_up : false,
        },
        created: function() {;
        },
        methods: {
            login: async function() {
                if (this.user_name == "" || this.user_password == "") {
                    alert("请填写用户名或密码");
                    return;
                }
                let success = await user_login(this.$http, this.user_name, this.user_password);
                if (success) {
                    window.location.reload();
                }
            },
            register: async function() {
                if (this.user_name == "" || this.user_password == "") {
                    alert("请填写用户名或密码");
                    return;
                }
                let success = await user_register(this.$http, this.user_name, this.user_password);
                if (success) {
                    window.location.reload();
                }
            },
            click_name: function() {
                this.logout = this.logout ? false : true;
                this.set_up = this.set_up ? false : true;
            },
            logout_click: function() {
                let c = confirm("确定退出！");
                if (c) {
                    user_logout(this.$http);
                }
            },
            set_up_click:function(){
                window.location.href = "/user_set_up.html";
            }
        }
    })
}
