export default function Posts({ posts }) {
    return (
        <ul>
            {posts.map((post, index) => {
                return (
                    <li key={index}>
                        <div className="blog-post">
                            <p>{post.authorName}</p>
                            <p>{post.content}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
