import './App.css'
import { useState } from 'react'
import { Auth } from './components/auth'
import { Posts } from './components/posts'

function App() {
    const [loginUser, setLoginUser] = useState(null)

    return (
        <div classname="app">
        {
            loginUser ? <Posts loginUser={loginUser} setLoginUser={setLoginUser} /> : <Auth setLoginUser={setLoginUser} />
        }
        </div>
    )
}

export default App
