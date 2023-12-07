import React, { useEffect } from 'react'
import './postsContainer.css'
import api from '../../config/axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PostCreate({setCreatingPost}) {
    const navigate = useNavigate();
    let [postdescription, setPostdescription] = useState('')
    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem('User'));
        if(!user){
            navigate('/?someCondition=true')
        }
    },[])

    const createPost = async (e) => {
        e.preventDefault();
        try {
            const post = await api.post('/create-post', {
                'createdBy': JSON.parse(sessionStorage.getItem('User')).username,
                'postdescription': postdescription,
            })
            setCreatingPost(false)
        }
        catch (error) {
            console.log(error);
        }
    }

    const cancel = (e)=>{
        e.preventDefault();
        setCreatingPost(false)
    }
    return (
        <div className='post-creation-container'>
            <div className='posting'>
                <textarea placeholder='input here' onChange={(e) => { setPostdescription(e.target.value) }}></textarea>
            </div>
            <button className='create-posts-btn' onClick={createPost}>Done</button>
            <button className='cancel-btn' onClick={cancel}>Cancel</button>
            
        </div>
    )
}

export default PostCreate