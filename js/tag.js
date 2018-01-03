async function getTags(v) {
    let data;
    await v({
        url: "/tag",
        method: "GET",

    }).then((res) => {
        data = res.body
    });


    console.log(data);

    return data;
}

async function getTagById(v, tag_id) {
    let data;
    await v({
        url: "/tag/getTagById",
        params: {
            tag_id: tag_id,
        },
        method: "get",

    }).then((res) => {
        console.log("success");
        data = res.body;
    }, (res) => {
        console.log(res);
    });

    console.log(data[0]);
    return data[0];
}


async function getTagByName(v, tag_name) {
    let data;
    await v({
        url: "/tag/getTagById",
        params: {
            tag_name: tag_name,
        },
        method: "get",

    }).then((res) => {
        console.log("success");
        data = res.body;
    }, (res) => {
        console.log(res);
    });

    console.log(data);
    return data;
}


async function createTag(v, tag_name) {
    if(tag_name == "") return;
    let success = false;
    await v({
        url: "/tag/create",
        method: "GET",
        params: {
            tag_name: tag_name,
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


export { getTags, getTagById, getTagByName, createTag }
