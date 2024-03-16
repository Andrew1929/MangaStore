import React, {useState, useEffect} from "react"
import { useWishlist } from "../hooks/wishlist.hook"
import { useCart } from "../hooks/cart.hook"
import { useManga } from "../hooks/manga.hook"
import { QuantitySelector } from '../components/QuantitySelector'
import {Link} from 'react-router-dom'
import '../styles/WishlistPage.css'

export const Wishlist = ({currentUserID}) => {
    const [manga,setManga] = useState([])
    const {fetchData} = useManga()
    const [wishlistItems, setWishlistItems] = useState([])
    const {removeFromWishlist, updateQuantityInWishlist , fetchWishlistItems} = useWishlist({currentUserID})
    const [quantity, setQuantity] = useState({})
    const {addToCart} = useCart({currentUserID})

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchWishlistItems(`http://localhost:5000/api/wishlist?userId=${currentUserID}`)
                if (data.length > 0 && data[0].wishlist && data[0].wishlist.length > 0) {
                    const wishlistItems = data[0].wishlist
                    setWishlistItems(wishlistItems)
                }
            } catch (e) {}
        }
        loadData()
    }, [fetchWishlistItems, currentUserID])

    useEffect(() => {
        const loadData = async () => {
          try {
                const ids = wishlistItems.map(item => item.manga)
                const promises = ids.map(id => fetchData(`http://localhost:5000/api/manga/${id}`))
                const mangaData = await Promise.all(promises)
                setManga(mangaData);
            } catch (e) {}
        }
        loadData()
    },[wishlistItems,fetchData])

    useEffect(() => {
        const initialQuantities = {}
        wishlistItems.forEach(item => {
            initialQuantities[item.manga] = item.quantity || 1
        })
        setQuantity(initialQuantities)
    }, [setQuantity, wishlistItems])

    const handleQuantityChange = (mangaId, newQuantity) => {
        updateQuantityInWishlist(mangaId, newQuantity)
        setQuantity(prevQuantities => ({
            ...prevQuantities,
            [mangaId]: newQuantity
        }))
    }

    const handleRemoveFromWishlist = async (mangaId) => {
        try {
            await removeFromWishlist(mangaId)
            setManga(currentManga => currentManga.filter(item => item.id !== mangaId));
            setWishlistItems(currentWishlist => currentWishlist.filter(item => item.manga !== mangaId));
        } catch (error) {}
    }

    const handleMoveToCart = async (mangaId, quantity) => {
        try{
            await addToCart(mangaId ,quantity)
            await removeFromWishlist(mangaId)
            setManga(currentManga => currentManga.filter(item => item.id !== mangaId));
            setWishlistItems(currentWishlist => currentWishlist.filter(item => item.manga !== mangaId));
        } catch (e) {}
    }

    if (!wishlistItems || wishlistItems.length === 0) return (
        <>
            <div className='empty' style={{padding: '60px'}}>
                <p style={{paddingBottom: '15px', display: 'flex', justifyContent: 'center', fontSize: '22px', fontWeight: 'bold'}}>Your wishlist is empty</p>
                <p style={{paddingBottom: '30px', display: 'flex', justifyContent: 'center', fontWeight: 'bold'}}>Looks like you haven't made your choice yet...</p>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Link to='/main'><button className='button'>Back to homepage</button></Link>
                </div>
                
            </div>
        </>
    )

    return(
        <>
            <div className='wishlist'>
                <div className='wishlistContent'>
                    <div className='head'>
                        <p>MY WISHLIST</p>
                    </div>
                    <div className='items'>
                        {manga.map((manga) => (
                            <div key={manga.id} className='cont'>
                                <Link to={`/products/manga/${manga.id}`}>
                                    <img src={manga.cover} alt={manga.title} />
                                </Link>
                                <div className='details'>
                                    <div className='name_price'>
                                        <Link to={`/products/manga/${manga.id}`}><h3 className='title'>{manga.title}</h3></Link>
                                        <h3>${manga.price * (quantity[manga.id] || 1)}</h3>
                                    </div>
                                    <div className='qty_buttons'>
                                        <p>Quantity :</p>
                                        <QuantitySelector 
                                        className='bagQty wishlist-bagQty'
                                        manga={{ ...manga, quantity: quantity[manga.id] }} 
                                        quantity={quantity[manga.id]}
                                        onQuantityChange={(newQuantity) => handleQuantityChange(manga.id, newQuantity)}
                                        />
                                        <div className='buttons'>
                                            <button className='but'onClick={() => handleMoveToCart(manga.id, quantity[manga.id])}>ADD TO CART</button>
                                            <button  className='but' onClick={() => handleRemoveFromWishlist(manga.id)}>REMOVE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}