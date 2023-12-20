import React, { useEffect, useState } from 'react'
import api from '../../config/axios'
import PostItem from '../posts/postItem'
import './postsContainer.css'
import PostCreate from './postCreate'

function PostsContainer() {
    let [creatingPost, setCreatingPost] = useState(false)
    let [postList, setPostList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allPost = await api.get('/getAllPosts');
                setPostList(allPost.data)
                console.log(allPost.data)
            }
            catch (error) {
                console.log('error')
            }
        }
        fetchData();
    }, [creatingPost])


    return (
        <div className='post-container'>
            {!creatingPost ? <div>
                <div className='create-post'>
                <button onClick={(e) => { setCreatingPost(true) }}>Create Post</button>
                </div>
            <div className='posts-in'>
                        {/* <span>Hello</span> */}
                        <ul>
                            {
                                postList.map((eachPost) => (
                                    <PostItem key={eachPost.id} post={eachPost}/>
                                ))
                            }
                        </ul>
                    </div>
            </div>
                :
                <div><PostCreate setCreatingPost={setCreatingPost} /></div>

            }
        </div>
    )
}

export default PostsContainer;