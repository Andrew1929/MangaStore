import React, {useState, useEffect} from "react"
import { Empty } from "./Empty"
import { QuantitySelector } from '../components/QuantitySelector'
import { useCart } from "../hooks/cart.hook"
import {Link} from 'react-router-dom'
import { useManga } from "../hooks/manga.hook"
import { useWishlist } from "../hooks/wishlist.hook"
import '../styles/BagPage.css'


export const Bag = ({currentUserID}) => {
    const [manga,setManga] = useState([])
    const {fetchData} = useManga()
    const {updateQuantityInCart, deleteFromCart, fetchCartItems} = useCart({currentUserID})
    const [quantity, setQuantity] = useState({})
    const [cartItems, setCartItems] = useState([])
    const {addToWishlist} = useWishlist({currentUserID})
    const discount= 5

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchCartItems(`http://localhost:5000/api/cart?userId=${currentUserID}`)
                if (data.length > 0 && data[0].cart && data[0].cart.length > 0) {
                    const cartItems = data[0].cart
                    setCartItems(cartItems)
                }
            } catch (e) {}
        }
        loadData()
    }, [fetchCartItems, currentUserID])

    useEffect(() => {
        const loadData = async () => {
          try {
                const ids = cartItems.map(item => item.manga)
                const promises = ids.map(id => fetchData(`http://localhost:5000/api/manga/${id}`))
                const mangaData = await Promise.all(promises)
                setManga(mangaData)
            } catch (e) {}
        }
        loadData()
    },[cartItems,fetchData])

    useEffect(() => {
        const initialQuantities = {}
        cartItems.forEach(item => {
            initialQuantities[item.manga] = item.quantity || 1
        })
        setQuantity(initialQuantities)
    }, [setQuantity, cartItems])

    const getTotalItemsCount = () => {
        return manga.reduce((total, item) => total + (quantity[item.id] || 1), 0)
    }

    const getTotalItemsCost = () => {
        return manga.reduce((total, item) => total + (item.price * (quantity[item.id] || 1)), 0)
    }

    const handleQuantityChange = (mangaId, newQuantity) => {
        updateQuantityInCart(mangaId, newQuantity)
        setQuantity(prevQuantities => ({
            ...prevQuantities,
            [mangaId]: newQuantity
        }))
    }

    const handleRemoveFromCart = async (mangaId) => {
        try {
            await deleteFromCart(mangaId);
            setManga(currentManga => currentManga.filter(item => item.id !== mangaId));
            setCartItems(currentCartItems => currentCartItems.filter(item => item.manga !== mangaId));
        } catch (error) {}
    }

    const handleAddToWishlist = async (mangaId,quantity) => {
        try{
            await addToWishlist(mangaId,quantity)
            await deleteFromCart(mangaId)
            setManga(currentManga => currentManga.filter(item => item.id !== mangaId))
            setCartItems(currentCartItems => currentCartItems.filter(item => item.manga !== mangaId))
        } catch (e) {}
    }

    if (!cartItems || cartItems.length === 0)  return <Empty/>

    return(
        <>
            <div className='bag'>
                <div className='bagContent'>
                    <div className='head'>
                        <p className='myCart'>MY CART ({getTotalItemsCount()})</p>
                    </div>
                    <div className='manga'>    
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
                                        className='bagQty' 
                                        manga={{ ...manga, quantity: quantity[manga.id] }} 
                                        quantity={quantity[manga.id]}
                                        onQuantityChange={(newQuantity) => handleQuantityChange(manga.id, newQuantity)}
                                        />
                                        <div className='buttons'>
                                            <button onClick={() => handleAddToWishlist(manga.id, quantity[manga.id])}>Move To Wishlist</button>
                                            <button onClick={() => handleRemoveFromCart(manga.id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>          
                            </div>
                        ))}
                    </div>
                </div>
                <div  className='calculation'>
                    <div className='compHead'>
                        <p>Order summary</p>
                    </div>
                    <div className='priceCalc'>
                        <div className="orderTotal">
                            <p>Order Subtotal</p>
                            <p>${getTotalItemsCost()}</p>
                        </div>
                        <div className="discount">
                            <p>Discount amount</p>
                            <p>$0.00</p>
                        </div>
                        <div className="delivery">
                            <p>Estimated Shipping</p>
                            <p>$5.00</p>
                        </div>
                    </div>
                    <div className='total'>
                        <div className='totalAmount'>
                            <p>Total</p>
                            <p>${getTotalItemsCost() + discount}</p>
                        </div>
                    </div>
                    <div className='buyBtn'>
                        <button>Buy</button>
                    </div>
                </div>
            </div>
        </>
    )
}