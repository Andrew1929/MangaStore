import React ,{useContext, useEffect , useState} from "react"
import {Link, useParams} from 'react-router-dom'
import {useManga} from '../hooks/manga.hook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Loader } from "./Loader"
import { QuantitySelector } from "./QuantitySelector"
import { AuthContext } from "../contexts/AuthContext"
import { useCart } from "../hooks/cart.hook"
import { useWishlist } from "../hooks/wishlist.hook"
import { Notification } from '../components/Notification'
import '../styles/ProductPage.css'


export const Product = () => {
    const [manga,setManga] = useState([])
    const {fetchData} = useManga()
    const {id} = useParams()
    const {userId} = useContext(AuthContext)
    const {addToCart} = useCart(userId)
    const {addToWishlist} = useWishlist(userId) 
    const [quantity, setQuantity] = useState(1) 
    const [showNotification, setShowNotification] = useState(false)
    const [message, setMessage] = useState('')

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    }

    useEffect(() => {
        const loadData = async () => {
          try {
            const data = await fetchData(`http://localhost:5000/api/manga/${id}`)
            setManga(data)
          } catch (e) {}
        }
        loadData()
    },[id,fetchData])

    const handleAddCart = () => {
        if(manga){
            setMessage('Product added to cart')
            addToCart(manga.id, quantity)
            setShowNotification(true)
            setTimeout(() => setShowNotification(false), 10000)
        }
    }

    const handleAddToWishlist = () => {
        if(manga){
            setMessage('Product added to wishlist')
            addToWishlist(manga.id, quantity)
            setShowNotification(true)
            setTimeout(() => setShowNotification(false), 10000)
        }
    }

    if (!manga) return <Loader />

    return(
        <>
             <div className='back'>
                <Link to='/main'><FontAwesomeIcon style={{ color: 'black' }} icon={faArrowLeft} /></Link>
                <p className='p_back'>Others mangas</p>
            </div>

            <div className='cont'>
                <div className='pic'>
                    <img src={manga.cover} alt={manga.title}></img>
                </div>
                <div className='info'>
                    <h3 className='status'>{manga.status}</h3>
                    <h1 className='title'>{manga.title}</h1>
                    <p className='price'>${manga.price}</p>
                    <h3 className="desc">Description :</h3>
                    <div className='description'>
                        <h3 className='author'>Author: {manga.author}</h3>
                        <h3 className='genre'>Genre: {manga.genre}</h3>
                    </div>
                    <QuantitySelector 
                    manga = {manga} 
                    showTotalPrice={true} 
                    showText={true}
                    onQuantityChange={handleQuantityChange}
                    />
                    <Notification show={showNotification} message={message} onClose={() => setShowNotification(false)}/>
                    <div className="order">
                        <div className="flex">
                            <button className="cart_btn" onClick={handleAddCart}>ADD TO CART</button>
                            <button className="wishlist_btn" onClick={handleAddToWishlist}>ADD TO WISHLIST</button>
                        </div>
                        <button className="buy_btn">BUY NOW</button>
                    </div>
                </div>
                
            </div>
        </>
    ) 
}