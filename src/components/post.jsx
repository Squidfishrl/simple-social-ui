import "./post.css";

export default function Post({ user, post, posts, setPosts }) {
    const deletePost = async () => {
        const response = await fetch(`http://127.0.0.1:3000/posts/${post.id}`, {
            method: "DELETE",
            credentials: "include"
        })
        
        if (response.ok) {
            const updatedPosts = posts.filter(_post => _post.id !== post.id)
            setPosts(updatedPosts)
        }
    }

    const likePost = async () => {
        const response = await fetch(`http://127.0.0.1:3000/posts/${post.id}/like`, {
            method: "POST",
            credentials: "include"
        })

        if (response.ok) {
            const updatedPosts = posts.map(_post => {
                if (_post.id === post.id) {
                    _post.likes++
                }

                return _post
            })

            setPosts(updatedPosts)
        }
    }

    return (
        <section className="post">
            <p className="post-author">Author: {post.userName}</p>
            <p className="post-text">{post.content}</p>
                <p className="post-likes">Likes: {post.likes}</p>
            <span className="post-buttons">
                <button className="post-like" onClick={likePost}>Like</button>
                {
                user === post.userName ? <button className="post-delete" onClick={deletePost}>Delete</button> : null
                }
            </span>

        </section>
    )
}
