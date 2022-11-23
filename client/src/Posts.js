import "./Posts.css";

export default function Posts({ posts, deleteBlog }) {
    console.log(posts);
    return (
        <ul id="post-display">
            {posts.map(post => {
                return (
                    <li className="blog-post" key={post._id} id={post._id}>
                        <div className="blog-post-inner">
                            <p className="author">{post.authorName}</p>
                            <p className="content">{post.content}</p>
                            <button
                                onClick={deleteBlog}
                                className="delete-post-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
