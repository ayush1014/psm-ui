import React, { useState } from "react";
import api from "../config/axios";
import './signup.css'
import { useNavigate } from "react-router-dom";

function SignUp(){

    const [status, setStatus] = useState(null);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [dob, setDob] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    async function SubmitForm(e){
        e.preventDefault();
        setStatus(null)
        let userInfo = {
            'username' : username,
            'name' : name,
            'email' : email,
            'dob' : dob,
            'password' : password,
        }
        console.log(userInfo)
        try{
            console.log('1');
            const createdUser = await api.post('/create-user',userInfo);
            console.log('2', createdUser);
            setStatus(true);
            console.log(status);
            navigate('/');
        }
        catch(error){
            console.log(error.response.data);
            setStatus (false);
        }
        
    }
    return(
        <>
        <div className="sign-up-form">
            <form>
                <label>
                    Name 
                    <input placeholder="Firstname Lastname" type="text" onChange={(e)=>{
                        setName(e.target.value)
                    }}></input>
                </label>
                <label>
                    Email
                    <input placeholder="Email" type="email" onChange={(e)=>{
                        setEmail(e.target.value)
                    }}></input>
                </label>
                <label>
                    Date of birth:
                    <input placeholder="" type="date"onChange={(e)=>{
                        setDob(e.target.value)
                    }}></input>
                </label>
                <label>
                    Username
                    <input placeholder="Select a username" type="text" onChange={(e)=>{
                        setUsername(e.target.value)
                    }}></input>
                </label>
                <label>
                    Password
                    <input placeholder="Select a password" type="password" onChange={(e)=>{
                        setPassword(e.target.value)
                    }}></input>
                </label>
            </form>
            <button onClick={SubmitForm}>Submit</button>
            <span>{status}</span>
            <div className="signup-message">
                
                {status===null ? (<span></span>): (status===true ? (<span>User created successfully</span>):(<span>User Already Exists, Please choose some other username or Login</span>))}
            </div>

        </div>
        </>
    )
}

export default SignUp;