const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    authorName: String,
    content: String,
});

module.exports = mongoose.model("blog", BlogSchema);
