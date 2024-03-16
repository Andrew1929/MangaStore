import React, {useContext} from 'react'
import { Header } from '../components/Header'
import { Wishlist } from '../components/Wishlist'
import { AuthContext } from '../contexts/AuthContext'
import { Footer } from '../components/Footer'

export const FavoritesPage = () => {
    const {userId} = useContext(AuthContext)
    return (
        <>
            <Header/>
            <Wishlist currentUserID ={userId}/>
            <Footer/>
        </>
    )
}