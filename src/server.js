var express = require('express');
var path = require('path');
var config = require('config-lite');
var routes = require('./routes')
var pkg = require('../package');
var session = require('express-session');


var app = new express();

// 设置静态文件目录
app.use(express.static(path.join(__dirname, '../dist')));


//设置模版
app.set('views', "./dist/views");
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');


//设置session
app.use(session(config.session));

// 路由
routes(app);

// 监听端口，启动程序
app.listen(config.port, function() {
    console.log(`${pkg.name} listening on port ${config.port}`);
});
