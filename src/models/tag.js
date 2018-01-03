var Tag = require("../lib/mongo").Tag;

module.exports = {
    create: function create(new_tag) {
    	console.log(new_tag);
    	return Tag.create(new_tag);
    },

    getTagsSum: function getTagsSum() {
        return Tag.where().count().exec();
    },


    getTagById: function getTagById(tag_id) {
        return Tag.find({ tag_id: tag_id }).exec();
    },

    getTagByName: function getTagByName(tag_name) {
        return Tag.find({ tag_name: tag_name }).exec();
    },

    getTags: function getTags() {
        return Tag.find().exec();
    }
}
