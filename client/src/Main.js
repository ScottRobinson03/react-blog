import { useEffect, useState } from "react";
import Posts from "./Posts";
import Result from "./Result";

export default function Main(props) {
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5001/blogs")
            .then(resp => resp.json())
            .then(posts => setPosts(posts))
            .catch(err => setError(err));
    });

    async function createBlog() {
        console.log("createBlog");
        try {
            const resp = await fetch("http://127.0.0.1:5001/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ author, content }),
            });
            const json = await resp.json();
            setOutput(json.message);
            setPosts([...posts, json.result]);
        } catch (exc) {
            setError(exc.message);
        }
    }

    return (
        <main>
            <input
                onBlur={e => setAuthor(e.target.value)}
                placeholder="Enter Author"
            />
            <input
                onBlur={e => setContent(e.target.value)}
                placeholder="Enter Content"
            />
            <button type="submit" onClick={createBlog}>
                Submit
            </button>
            <Result error={error} output={output} />
            <Posts posts={posts} />
        </main>
    );
}
