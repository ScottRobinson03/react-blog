const Blog = require("../models/Blog");

async function validateBlogId(req, resp, next) {
    req.blog = await Blog.findById(req.params.blogId);
    if (req.blog === null) {
        resp.status(404).json({ message: "Blog Not Found" });
        return;
    }
    next();
}

module.exports = validateBlogId;
