import sha1 from "sha1";

//登录
async function user_login(v, name, password) {
    let success = false;
    password = sha1(password);
    console.log(password);
    await v({
        url: "/users",
        method: "POST",
        body: {
            name: name,
            password: password,
        },

    }).then((res) => {
        if (res.data == "没有此用户") {
            alert("没有此用户");
        } else if (res.data == "密码错误") {
            alert("密码错误");
        } else if (res.data == "登录成功") {
            alert("登录成功");
            success = true;
        }
    });

    return success;
}


//注册
async function user_register(v, name, password) {
    let success = false;
    password = sha1(password);
    await v({
        url: "/users/register",
        method: "POST",
        body: {
            name: name,
            password: password,
        },

    }).then((res) => {
        if (res.data == "用户名已存在") {
            alert("用户名已存在");
        } else if (res.data == "注册成功") {
            alert("注册成功");
            success = true;
        }
    });

    return success;
}

//退出登录
async function user_logout(v) {
    await v({
        url: "/users/logout",
        method: "GET",
    }).then((res) => {
        if (res.data == "success") {
            alert("退出成功");
            window.location.reload();
        }
    })
}


async function updatepassword(v, password, new_password) {
    password = sha1(password);
    new_password = sha1(new_password);
    await v({
        url: "/users/updatepassword",
        method: "POST",
        body: {
            password: password,
            new_password: new_password,
        },
    }).then((res) => {
        alert(res.data);
    })
}



export { user_login, user_register, user_logout, updatepassword }
