// import { Vue } from "./main.js";

// import { user_login, user_register } from "./users.js";

// let login_register = new Vue({
//     el: "#login_register",
//     data: {
//         user_name: "",
//         user_password: "",
//     },
//     created: function() {;
//     },
//     methods: {
//         login: async function() {
//             if (this.user_name == "" || this.user_password == "") {
//                 alert("请填写用户名或密码");
//                 return;
//             }
//             let success = await user_login(this.$http, this.user_name, this.user_password);
//             if (success) {
//                 window.location.reload();
//             }
//         },
//         register: async function() {
//             if (this.user_name == "" || this.user_password == "") {
//                 alert("请填写用户名或密码");
//                 return;
//             }
//             let success = await user_register(this.$http, this.user_name, this.user_password);
//             if (success) {
//                 window.location.reload();
//             }
//         },
//     }
// })

import l_r from "./login_register.js"

let login_register = l_r();
