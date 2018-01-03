//根据文章id获取所有评论
async function getComments(v, post_id) {
    let data;
    await v({
        url: "/comment",
        method: "GET",
        params: {
            post_id: post_id,
        },

    }).then((res) => {
        data = res.body
    });

    //时间格式化
    data.forEach(function(item) {
        item.time = new Date(item.time).toLocaleString();
    });

    console.log(data);

    return data;
}


//添加评论
async function addComment(v, comment, comment_num) {
    let success = false;
    await v({
        url: "/comment/addcomment",
        method: "GET",
        params: {
            comment: comment,
            comment_num: comment_num,
        },
    }).then((res) => {
        console.log(res);
        if (res.body == "success") {
            success = true;
        }
        else{
            alert(res.body);
        }
    }, (res) => {
        console.log(res);
    });

    return success;
}


export { getComments, addComment }
