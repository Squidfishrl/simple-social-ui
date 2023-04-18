import "./auth.css";
import { useState } from 'react'

export function Auth({ setLoginUser }) {
    const [isLogin, setIsLogin] = useState(false)
    const [errMsg, setErrMsg] = useState(null)

    const register = async (form) => {
        form.preventDefault()

        const username = form.target.name.value.trim()

        if (!username) {
            return
        }

        let response = await fetch("http://127.0.0.1:3000/register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ name: username })
        })

        if (!response.ok) {
            setErrMsg("User already exists")
            return
        }

        login(form)
    }

    const login = async (form) => {
        form.preventDefault()

        const username = form.target.name.value.trim()
        if (!username) {
            return
        }

        let response = await fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ name: username })
        })

        if (!response.ok) {
            setErrMsg("User doesn't exist")
            return
        }

        setLoginUser(username)
        setErrMsg(null)

        form.target.reset()
    } 

    return (
        <main className="auth-main">
            <form className="auth-form" onSubmit={isLogin ? login : register}>
                <input type="text" className="name-input" name="name" placeholder="Enter username..." />
                { errMsg !== null ? <p className="auth-error">{errMsg}</p> : <p></p>}
                <span className="auth-btn-container">
                    <button type="submit" className="register-btn" onClick={() => setIsLogin(false)}>Register</button>
                    <button type="submit" className="login-btn" onClick={() => setIsLogin(true)}>Login</button>
                </span>
            </form>
        </main>
    )
}
