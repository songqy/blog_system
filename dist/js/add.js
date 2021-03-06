webpackJsonp([5],{

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _posts = __webpack_require__(35);

var _tag = __webpack_require__(36);

var _main = __webpack_require__(25);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import Vue from "vue";
// import VueResource from "vue-resource";

// Vue.use(VueResource);

var textarea = "";

var Add = new _main.Vue({
    el: "#add",
    data: {
        title: "",
        content: "",
        new_tag: "",
        chooseTags: [],
        tags: [],
        isShow: false
    },
    created: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.refresh_tag();

                        case 2:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function created() {
            return _ref.apply(this, arguments);
        }

        return created;
    }(),
    methods: {
        submit: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(event) {
                var tag_ids, data, success;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!(this.title == "" || this.chooseTags.length == 0 || editor.$txt.text() == "")) {
                                    _context2.next = 3;
                                    break;
                                }

                                alert("请补充内容");
                                return _context2.abrupt("return");

                            case 3:
                                tag_ids = [];

                                this.chooseTags.forEach(function (tag) {
                                    tag_ids.push(tag.tag_id);
                                });
                                tag_ids = tag_ids.join(',');

                                data = {
                                    title: this.title,
                                    content: editor.$txt.html(),
                                    tag_ids: tag_ids
                                };

                                console.log(data);
                                _context2.next = 10;
                                return (0, _posts.createPost)(this.$http, data);

                            case 10:
                                success = _context2.sent;

                                if (success) {
                                    setProgress();
                                }

                            case 12:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function submit(_x) {
                return _ref2.apply(this, arguments);
            }

            return submit;
        }(),
        create_tag: function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(event) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return (0, _tag.createTag)(this.$http, this.new_tag);

                            case 2:
                                this.new_tag = "";
                                _context3.next = 5;
                                return this.refresh_tag();

                            case 5:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function create_tag(_x2) {
                return _ref3.apply(this, arguments);
            }

            return create_tag;
        }(),
        refresh_tag: function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return (0, _tag.getTags)(this.$http);

                            case 2:
                                this.tags = _context4.sent;

                            case 3:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function refresh_tag() {
                return _ref4.apply(this, arguments);
            }

            return refresh_tag;
        }(),
        choose: function choose(tag) {
            if (this.chooseTags.includes(tag)) return;
            this.chooseTags.push(tag);
        },
        choose_not: function choose_not(tag) {
            var index = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.chooseTags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    if (item.tag_id == tag.tag_id) {
                        break;
                    }
                    index++;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.chooseTags.splice(index, 1);
        },
        toggle: function toggle() {
            this.isShow = this.isShow ? false : true;
        }
    }
});

var editor = new wangEditor('text');
editor.create();

//设置进度条
function setProgress() {
    var length = 0;
    var intervalId = setInterval(function () {
        if (length > 100) {
            clearInterval(intervalId);
            location.href = "./posts_list.html";
            return;
        } else {
            document.querySelector("#progress>div").style.width = length + "%";
        }
        length += 50;
    }, 500);
}

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(16);
module.exports = __webpack_require__(121);


/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * 获取指定id的文章
 * @param  {vue.$http}
 * @param  {id} post id
 * @return {post} 文章信息
 */
var getPostById = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(v, id) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = void 0;
                        _context.next = 3;
                        return v({
                            url: "/posts/getPostById",
                            params: {
                                id: id
                            },
                            method: "get"

                        }).then(function (res) {
                            console.log("success");
                            data = res.body;
                        }, function (res) {
                            console.log(res);
                        });

                    case 3:

                        data.time = new Date(data.time).toLocaleString();

                        console.log(data);
                        return _context.abrupt("return", data);

                    case 6:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getPostById(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * 删除指定id的文章
 * @param  {vue.$http}
 * @param  {id} post id
 * @return {}
 */


var deletePost = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(v, id) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log("delete post");

                        _context2.next = 3;
                        return v({
                            url: "/posts/delPostById",
                            method: "get",
                            params: {
                                id: id
                            }
                        }).then(function (res) {
                            console.log(res);
                        }, function (res) {
                            console.log(res);
                        });

                    case 3:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function deletePost(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

//根据pageSize和page获取文章


var getPosts = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(v, pageSize, page) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        data = void 0;
                        _context3.next = 3;
                        return v({
                            url: "/posts",
                            method: "GET",
                            params: {
                                pageSize: pageSize,
                                page: page
                            }

                        }).then(function (res) {
                            console.log("refresh success");
                            data = res.body;
                        });

                    case 3:

                        //时间格式化
                        data.forEach(function (item) {
                            item.time = new Date(item.time).toLocaleString();
                        });

                        console.log(data);

                        return _context3.abrupt("return", data);

                    case 6:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function getPosts(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();

//根据pageSize和page获取指定用户id的文章


var getPostsByUser = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(v, pageSize, page) {
        var data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        data = void 0;
                        _context4.next = 3;
                        return v({
                            url: "/posts/getPostsByUser",
                            method: "GET",
                            params: {
                                pageSize: pageSize,
                                page: page
                            }

                        }).then(function (res) {
                            console.log("refresh success");
                            data = res.body;
                        });

                    case 3:

                        //时间格式化
                        data.forEach(function (item) {
                            item.time = new Date(item.time).toLocaleString();
                        });

                        console.log(data);

                        return _context4.abrupt("return", data);

                    case 6:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function getPostsByUser(_x8, _x9, _x10) {
        return _ref4.apply(this, arguments);
    };
}();

//更新指定id的文章


var updatePostById = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(v, id, modify_data) {
        var success;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        success = false;
                        _context5.next = 3;
                        return v({
                            url: "/posts/updatePostById",
                            method: "post",
                            params: {
                                id: id,
                                modify_data: modify_data
                            }
                        }).then(function (res) {
                            console.log(res);
                            if (res.status == 200) {
                                success = true;
                            }
                        }, function (res) {
                            console.log(res);
                        });

                    case 3:
                        return _context5.abrupt("return", success);

                    case 4:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function updatePostById(_x11, _x12, _x13) {
        return _ref5.apply(this, arguments);
    };
}();

//新建一篇文章


var createPost = function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(v, post, user_id) {
        var success;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        success = false;
                        _context6.next = 3;
                        return v({
                            url: "/posts/create",
                            method: "post",
                            params: {
                                title: post.title,
                                content: post.content,
                                tag_ids: post.tag_ids,
                                user_id: user_id
                            }
                        }).then(function (res) {
                            console.log(res);
                            if (res.status == 200) {

                                success = true;
                            }
                        }, function (res) {
                            console.log(res);
                        });

                    case 3:
                        return _context6.abrupt("return", success);

                    case 4:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function createPost(_x14, _x15, _x16) {
        return _ref6.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.getPosts = getPosts;
exports.deletePost = deletePost;
exports.getPostById = getPostById;
exports.getPostsByUser = getPostsByUser;
exports.updatePostById = updatePostById;
exports.createPost = createPost;

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var getTags = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(v) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = void 0;
                        _context.next = 3;
                        return v({
                            url: "/tag",
                            method: "GET"

                        }).then(function (res) {
                            data = res.body;
                        });

                    case 3:

                        console.log(data);

                        return _context.abrupt("return", data);

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getTags(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getTagById = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(v, tag_id) {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        data = void 0;
                        _context2.next = 3;
                        return v({
                            url: "/tag/getTagById",
                            params: {
                                tag_id: tag_id
                            },
                            method: "get"

                        }).then(function (res) {
                            console.log("success");
                            data = res.body;
                        }, function (res) {
                            console.log(res);
                        });

                    case 3:

                        console.log(data[0]);
                        return _context2.abrupt("return", data[0]);

                    case 5:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getTagById(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var getTagByName = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(v, tag_name) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        data = void 0;
                        _context3.next = 3;
                        return v({
                            url: "/tag/getTagById",
                            params: {
                                tag_name: tag_name
                            },
                            method: "get"

                        }).then(function (res) {
                            console.log("success");
                            data = res.body;
                        }, function (res) {
                            console.log(res);
                        });

                    case 3:

                        console.log(data);
                        return _context3.abrupt("return", data);

                    case 5:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function getTagByName(_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();

var createTag = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(v, tag_name) {
        var success;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        if (!(tag_name == "")) {
                            _context4.next = 2;
                            break;
                        }

                        return _context4.abrupt("return");

                    case 2:
                        success = false;
                        _context4.next = 5;
                        return v({
                            url: "/tag/create",
                            method: "GET",
                            params: {
                                tag_name: tag_name
                            }
                        }).then(function (res) {
                            console.log(res);
                            if (res.status == 200) {

                                success = true;
                            }
                        }, function (res) {
                            console.log(res);
                        });

                    case 5:
                        return _context4.abrupt("return", success);

                    case 6:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function createTag(_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.getTags = getTags;
exports.getTagById = getTagById;
exports.getTagByName = getTagByName;
exports.createTag = createTag;

/***/ })

},[313]);