import React,{useContext, useState, useEffect} from "react"
import {AuthContext} from '../contexts/AuthContext'
import {Link, useNavigate , useParams} from 'react-router-dom'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import avatar from '../styles/images/avatar.png'
import { useUserData } from "../hooks/userData.hook"

export const Profile = () => {
    const auth = useContext(AuthContext)
    const currentUserID = auth.userId;
    const {id} = useParams()
    const navigate = useNavigate()
    const [fetchUserData] = useUserData();
    const [userData, setUserData] = useState([]);

    useEffect (() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData(`/api/${id}`);
                console.log(data);
                setUserData(data);
            } catch (erorr) {
                console.error(erorr);
            }
        }

        getUserData();
    },[fetchUserData, id])
    
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }
    return (
        <>
            <main>
                <div className="main-information-about-user">
                    <p className="user-name">{userData && userData.username}</p>

                    <p className="e-mail"></p>
                </div>

                <div className="avatar-and-logout">
                    <img src={avatar}></img>

                    <Link  onClick={logoutHandler} to= '/profile' ><FontAwesomeIcon icon={faUser}/></Link>
                </div>
            </main>
        </>
    )
}