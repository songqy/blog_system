
/**
 * 获取指定id的文章
 * @param  {vue.$http}
 * @param  {id} post id
 * @return {post} 文章信息
 */
async function getPostById(v, id) {
    let data;
    await v({
        url: "/posts/getPostById",
        params: {
            id: id,
        },
        method: "get",

    }).then((res) => {
        console.log("success");
        data = res.body;
    }, (res) => {
        console.log(res);
    });

    data.time = new Date(data.time).toLocaleString();


    console.log(data);
    return data;
}


/**
 * 删除指定id的文章
 * @param  {vue.$http}
 * @param  {id} post id
 * @return {}
 */
async function deletePost(v, id) {
    console.log("delete post");

    await v({
        url: "/posts/delPostById",
        method: "get",
        params: {
            id: id,
        },
    }).then((res) => {
        console.log(res);
    }, (res) => {
        console.log(res);
    });
}

//根据pageSize和page获取文章
async function getPosts(v, pageSize, page) {
    let data;
    await v({
        url: "/posts",
        method: "GET",
        params: {
            pageSize: pageSize,
            page: page,
        }

    }).then((res) => {
        console.log("refresh success");
        data = res.body
    });

    //时间格式化
    data.forEach(function(item) {
        item.time = new Date(item.time).toLocaleString();
    });

    console.log(data);

    return data;
}


//根据pageSize和page获取指定用户id的文章
async function getPostsByUser(v, pageSize, page) {
    let data;
    await v({
        url: "/posts/getPostsByUser",
        method: "GET",
        params: {
            pageSize: pageSize,
            page: page,
        }

    }).then((res) => {
        console.log("refresh success");
        data = res.body
    });

    //时间格式化
    data.forEach(function(item) {
        item.time = new Date(item.time).toLocaleString();
    });

    console.log(data);

    return data;
}




//更新指定id的文章
async function updatePostById(v, id, modify_data) {
    let success = false;
    await v({
        url: "/posts/updatePostById",
        method: "post",
        params: {
            id: id,
            modify_data: modify_data,
        },
    }).then((res) => {
        console.log(res);
        if (res.status == 200) {
            success = true;
        }
    }, (res) => {
        console.log(res);
    });

    return success;
}


//新建一篇文章
async function createPost(v, post, user_id) {
    let success = false;
    await v({
        url: "/posts/create",
        method: "post",
        params: {
            title: post.title,
            content: post.content,
            tag_ids: post.tag_ids,
            user_id: user_id
        },
    }).then((res) => {
        console.log(res);
        if (res.status == 200) {

            success = true;
        }
    }, (res) => {
        console.log(res);
    });

    return success;
}


export { getPosts, deletePost, getPostById, getPostsByUser, updatePostById, createPost };
