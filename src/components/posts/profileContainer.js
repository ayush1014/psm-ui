import React, { useEffect, useState } from 'react'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import './profileContainer.css'
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import UserItem from '../users/userItem';
function ProfileContainer() {
    const navigate = useNavigate();

    let [user, setUser] = useState(null)
    let [allUsers, setAllUsers] = useState([])
    
    useEffect(()=>{
        async function fetchUsers(){
            const person = JSON.parse(sessionStorage.getItem('User'))
            setUser(person);
            
            try{
                const response = await api.get(`/getNonFollowingUsers/${person.username}`);
                console.log('Users',response.data);
                // const filteredUsers = response.data.filter(filterUser => filterUser.username !== person.username);
                setAllUsers(response.data)
            }
            catch(error){
                console.log(error,'here is the error')
            }
        }
        fetchUsers();
        console.log(allUsers)
    },[])

    const logOff = (e) => {
        e.preventDefault()
        sessionStorage.removeItem('User');
        navigate('/')
    }
    return (
        <>
            {user &&
                <div className='profile-container'>

                    <div >

                        <div className='profile'>
                            <div className='profile-username'>
                            <AccountCircleSharpIcon style={{ fontSize: '200%' }} />
                            <span className='profile-name'>{user.username}</span>
                            </div>
                            <div className='fans-btn'>
                                <button>Fans</button>
                                <button>Admires</button>
                            </div>
                            <div className='span-text'>
                                <span>@Recommended Users</span>
                            </div>
                            <div className='userItems'>
                                <ul>
                                {
                                    allUsers.map((eachUser)=>(
                                        <UserItem key = {eachUser.username} userInstance = {eachUser}/>
                                    ))
                                }
                                </ul>
                            </div>
                            <div className='logout-btn-container'>
                                <br></br>
                                <button className='logout-btn' onClick={logOff}>Log Out</button>
                            </div>
                         

                        </div>

                    </div>

                </div>
            }
        </>
    )
}

export default ProfileContainer