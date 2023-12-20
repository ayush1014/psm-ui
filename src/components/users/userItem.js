import React, { useEffect, useState } from 'react'
import api from '../../config/axios';
import './userItem.css'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
function UserItem({ userInstance }) {
    let [user, setUser] = useState(null)
    const [isFollowing, setIsFollowing] = useState(false);
    useEffect(() => {
        const person = JSON.parse(sessionStorage.getItem('User'))
        setUser(person)
    }, []);
    const followUser = async () => {
        try {
            const response = await api.post('/followUser', {
                'fan': user.username,
                'followed': userInstance.username,

            })
            setIsFollowing(true)
        }
        catch (error) {
            console.log(error);
        }
    }

    const unFollow = async () => {
        try {
            const response = await api.patch('/unfollowUser', {
                'fan': user.username,
                'followed': userInstance.username,
            })
            setIsFollowing(false)
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='profile-user'>
            <li>
                <div className='user-admire-name'> <AccountCircleSharpIcon style={{ fontSize: '100%' }} />{userInstance.username}</div>
                {
                    isFollowing ? <button className='unfollow-btn' onClick={unFollow}>Unadmire</button> :
                        <button className='follow-btn' onClick={followUser}>Admire</button>
                }
            </li>

        </div>
    )
}

export default UserItem;