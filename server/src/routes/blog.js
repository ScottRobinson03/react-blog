const { Router } = require("express");
const validateBlogId = require("../middleware/blog");
const Blog = require("../models/Blog");

const router = Router();

router.get("/blogs", async (_, resp) => {
    resp.json(await Blog.find({}));
});

router.delete("/blogs", async (_, resp) => {
    await Blog.deleteMany({ where: {} });
    resp.status(204).json({ message: "Successfully deleted all blog posts" });
});

router.post("/blogs", async (req, resp) => {
    const { author, content } = req.body;
    if (!author || !content) {
        resp.status(400).json({ message: "Author and content are required." });
        return;
    }

    if (typeof author !== "string" || typeof content !== "string") {
        resp.status(400).json({
            message: "Author and content must be a string",
        });
        return;
    }

    const blog = await Blog.create({ authorName: author, content: content });
    resp.status(201).json({
        message: "Successfully created a blog post",
        result: blog.toJSON(),
    });
});

router.patch("/blog/:blogId", validateBlogId, async (req, resp) => {
    const newContent = req.body.content;
    if (newContent === undefined) {
        resp.status(400).json({ message: "A new content must be provided" });
        return;
    }
    await req.blog.update({ content: newContent });
    resp.json({ message: "Successfully updated blog post" });
});

router.delete("/blog/:blogId", validateBlogId, async (req, resp) => {
    await req.blog.remove();
    resp.status(204).json({ message: "Successfully deleted blog post" });
});

module.exports = router;
