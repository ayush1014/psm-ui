import React, { useEffect } from 'react';
import api from '../config/axios';
import { json, useNavigate } from 'react-router-dom'
import { useState } from 'react';
// import ReactDOM from 'react-dom/client';
import './login.css'
import { useLocation } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const [fromCreatePost, setFromCreatePost] = useState(false);
   

    useEffect(()=>{
            const currentUrl = window.location.href;
            const url = currentUrl.slice(-4);
            console.log(url)
            if(url == 'true'){
                setFromCreatePost(true);
            }
            else(
                console.log(url)
            )
    },[])
    const handleLogin = async (e) => {
        e.preventDefault();
        let user = {
            'username': username,
            'password': password,
        }
        try {
            // console.log(user)
            const logUser = await api.post('login', user);
            sessionStorage.setItem('User', JSON.stringify(logUser.data));
            console.log(logUser)
            navigate('/posts');
        }
        catch (error) {
            console.log(error.response.data.error);
            setStatus(false)
        }
    }
    const createAccount = () => {
        navigate('/signup')
    }
    return (
        <>
            <div className='page'>
                <div className='empty'>

                </div>
                <div className='login-page'>

                    <div className='login-top'>

                        <h1>Welcome to psm</h1>
                        {fromCreatePost &&
                            <div>
                                <h3>Please sign in to create a post</h3>
                            </div>
                        }
                        <div className='get-details'>
                            <input placeholder='Username' type='email' onChange={(e) => {
                                setUsername(e.target.value)
                            }} />
                            <input placeholder='Password' type='password' onChange={(e) => {
                                setPassword(e.target.value)
                            }}></input>
                            {/* <button onClick={handleLogin}> Submit </button> */}
                        </div>
                        <div className='login-submit'>
                            <button onClick={handleLogin}>
                                Log In
                            </button>
                        </div>
                        <div className='sign-up-submit'>
                            <button onClick={createAccount}>
                                Create a new acount
                            </button>
                        </div>
                        {status === null ? <span></span> : <span>Invalid Credentials</span>}
                    </div>

                </div>

            </div>
        </>
    )
}

export default Login;