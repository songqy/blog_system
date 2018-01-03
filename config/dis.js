//服务器
module.exports = {
    port: 80,
    session: {
        secret: 'blog_system',
        key: 'blog_system',
        name: 'blog_system',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie: {maxAge: 6000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
        resave: false,
        saveUninitialized: true,
    },
    mongodb: 'mongodb://song:06050015@localhost:27017/blog_system'
};
