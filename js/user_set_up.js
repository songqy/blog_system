import l_r from "./login_register.js"

let login_register = l_r();


import { Vue } from "./main.js";
import { updatepassword } from "./users.js"



let modify_password = new Vue({
    el: "#modify_password",
    data: {
        password: "",
        new_password: "",
        new_password_again: "",
    },
    created: function() {

    },
    methods: {
        modify_password: async function() {
            if (this.new_password != this.new_password_again){
                alert("确认密码不相同");
                return;
            }
            await updatepassword(this.$http, this.password, this.new_password);
            this.password = "";
            this.new_password = "";
            this.new_password_again = "";
        },
    }
});
