const { Router } = require("express");
const validateBlogId = require("../middleware/blog");
const Blog = require("../models/Blog");

const router = Router();

router.get("/blogs", async (_, resp) => {
    resp.json(await Blog.find({}));
});

router.post("/blogs", async (req, resp) => {
    const { author, content } = req.body;
    if (author === undefined || content === undefined) {
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
    resp.status(201).json(blog.toJSON());
});

router.patch("/blog/:blogId", validateBlogId, async (req, resp) => {
    const newContent = req.body.content;
    if (newContent === undefined) {
        resp.status(400).json({ message: "A new content must be provided" });
        return;
    }
    await req.blog.update({ content: newContent });
    resp.sendStatus(200);
});

router.delete("/blog/:blogId", validateBlogId, async (req, resp) => {
    await req.blog.remove();
    resp.sendStatus(204);
});

module.exports = router;
