import React, { useEffect, useState } from 'react'
import './postItem.css'
import api from '../../config/axios'

function Modal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function PostItem({ post }) {
  const [postdescription,setPostdescription] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const [isUser, setIsUser] = useState(false)

  useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem('User'));
      if(user && user.username == post.createdBy){
        setIsUser(true);
      }
 
    setPostdescription(post.postdescription);
  },[post.postdescription])

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      const deleteAction = await api.delete(`/deletePost/${post.id}`)
      console.log(deleteAction, 'action deleted')
      window.location.reload();
    }
    catch (error) {
      console.log(error);
    }

  }
  const editPost = async () => {
    const updatedPost = {
      ...post, 
      'postdescription' : postdescription
    }
    console.log('updated', updatedPost)
    const postUpdated = await api.patch('/updatePost', updatedPost);
    console.log(postUpdated.data)
    handleCloseModal();
    window.location.reload();
  }
  return (
    <>
      <div>
        <Modal show={modalOpen} onClose={handleCloseModal}>
          <div className='posting'>
            <textarea placeholder='input here' value={postdescription} onChange={(e) => { setPostdescription(e.target.value) }}></textarea>
          </div>
          <button onClick={editPost}>Done</button>
        </Modal>
      </div>
      <div className='postItem'>
        <li>
          <div>
            {post.postdescription}
            <div>
            <span>created by: @{post.createdBy}</span>
            </div>
          </div>
          {isUser &&
          <div className='action-btn'>
            <button className='delete-btn' onClick={deletePost}>Delete</button>
            <button className='edit-btn' onClick={handleOpenModal}>Edit</button>
          </div>
          }
        </li>
      </div>
    </>
  )
}

export default PostItem;