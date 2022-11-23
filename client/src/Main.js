import { useEffect, useState } from "react";
import Form from "./Form";
import Posts from "./Posts";
import Result from "./Result";

export default function Main() {
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [posts, setPosts] = useState([]);
    const [postsChanged, setPostsChanged] = useState(true);

    useEffect(() => {
        if (!postsChanged) return;
        fetch("http://127.0.0.1:5001/blogs")
            .then(resp => resp.json())
            .then(posts => setPosts(posts))
            .catch(err => setError(err));
        setPostsChanged(false);
    }, [postsChanged]);

    async function createBlog() {
        const resp = await fetch("http://127.0.0.1:5001/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ author, content }),
        });
        const json = await resp.json();
        if (resp.status === 201) {
            setOutput(json.message);
            setPosts([...posts, json.result]);
            setPostsChanged(true);
        } else {
            setError(json.message);
        }
    }

    async function deleteBlog(e) {
        const postLi = e.target.parentElement.parentElement;
        const postId = postLi.id;
        try {
            const resp = await fetch(`http://127.0.0.1:5001/blog/${postId}`, {
                method: "DELETE",
            });
            const json = await resp.json();
            setOutput(json.message);
            setPostsChanged(true);
        } catch (exc) {
            setError(exc.message);
        }
    }

    return (
        <main>
            <Form
                setAuthor={setAuthor}
                setContent={setContent}
                createBlog={createBlog}
            />
            <Result error={error} output={output} />
            <Posts posts={posts} deleteBlog={deleteBlog} />
        </main>
    );
}
