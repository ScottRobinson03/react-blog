export default function Posts({ posts, deleteBlog }) {
    return (
        <ul>
            {posts.map(post => {
                return (
                    <li key={post._id} id={post._id}>
                        <div className="blog-post">
                            <p>{post.authorName}</p>
                            <p>{post.content}</p>
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
