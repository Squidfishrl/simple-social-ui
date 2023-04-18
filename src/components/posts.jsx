import './posts.css'
import { useState, useEffect } from 'react'
import Post from './post'

export function Posts ({ loginUser, setLoginUser }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:3000/posts", { credentials: "include" })
            .then((response) => response.json())
            .then(posts => {
                if (posts) {
                    setPosts(posts)
                }
            })
    }, [loginUser])

    const logout = async () => {
        await fetch("http://127.0.0.1:3000/logout", {
            method: "POST",
            credentials: "include"
        })
        setLoginUser(null)
    }

    const createPost = async (event) => {
        event.preventDefault()

        const content = event.target.content.value.trim()
        if (!content) {
            return
        }

        const response = await fetch("http://127.0.0.1:3000/posts", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ content })
        })

        if (response.ok) {
            const post = await response.json()
            setPosts([...posts, { ...post, likes: 0, userName: loginUser }])
        }

        event.target.reset()
        // setExpanded(false)
    }


    return (
        <div className="posts-root">
            <header className="posts-header">
                <button onClick={logout}>Logout</button>
            </header> 
            
            <main className="posts-main">
                <div className="posts-div">
                {
                    loginUser !== null ? posts.map(post => {return <Post user={loginUser} post={post} posts={posts} setPosts={setPosts} />}) : () => {}
                }

                </div>
                <div className="posts-create-div">
                    <form className="post-form" onSubmit={createPost}>
                        <fieldset className="create-post-fieldset">
                            <legend className="create-post-legend">New Post</legend>
                            <p className="post-author">{loginUser}</p>
                            <textarea className="create-post-content" name="content" cols="40" rows="20" placeholder="Write here..."></textarea>
                            <div className="create-post-buttons">
                                <button className="create-post-btn">Post</button>
                                <button className="clear-post-btn" type="reset">Clear</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        </div>
    ) 
}
