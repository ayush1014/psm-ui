import React from 'react'
import './posts.css'

// import api from '../config/axios'
// import PostItem from './posts/postItem'
import Hashtags from './posts/hashtags';
import PostsContainer from './posts/postsContainer';
import ProfileContainer from './posts/profileContainer';
// import {Navigate} from 'react-router-dom'

function Posts() {

   

    
    return (
        <div className='main-div'>
            <div className='heading'>
                <h1>Posting Media</h1>
            </div>
            <div className='dashboard'>
                <Hashtags/>

                <PostsContainer/>

                <ProfileContainer/>

            </div>
        </div>
    )
}

export default Posts;
