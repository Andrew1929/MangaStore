import React, {useContext} from 'react'
import { Header } from '../components/Header'
import { Bag } from '../components/Bag'
import { AuthContext } from '../contexts/AuthContext'
import { Footer } from '../components/Footer'

export const BagPage = () => {
    const {userId} = useContext(AuthContext)
    return (
        <>
           <Header/>
           <Bag currentUserID ={userId}/>
           
           <Footer/>
        </>
       
    )
}