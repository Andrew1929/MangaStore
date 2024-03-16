import { useCallback, useState, useContext} from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useCart = ({currentUserID}) => {
    const {userId} = useContext(AuthContext)
    const [cartItems , setCartItems] = useState([])
    const [error, setError] = useState(null)

    const fetchCartItems = useCallback(async (URL,method = 'GET', body = null, headers = {}) => {
        try{
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const cartResponse = await fetch (URL,{method,body,headers})
            const contentType = cartResponse.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid server response');
            }
            const data = await cartResponse.json()
            if(!cartResponse.ok){
                throw new Error(data.message || 'Something go wrong')
            }
            setCartItems(data)
            return data
        }catch(e){
            console.log(e)
            setError(e.message)
        }
    },[])

    const addToCart = useCallback(async (mangaId , quantity = 1) => {
        try{
            const data = await fetchCartItems('http://localhost:5000/api/cart','POST' ,{userId, mangaId, quantity})
            setCartItems(prevItems => {
                if (!Array.isArray(prevItems)) {
                    return prevItems;
                }
                const existingItemIndex = prevItems.findIndex(item => item.Id === mangaId)
                if (existingItemIndex !== -1) {
                    const updatedItems = [...prevItems];
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantity: updatedItems[existingItemIndex].quantity + quantity
                    };
                    return updatedItems;
                }
                return [...prevItems, {...data, quantity}];
            })
        } catch (e){
            setError(e)
        }
    },[fetchCartItems,userId])

    const deleteFromCart = useCallback(async (mangaId) => {
        try{
            await fetchCartItems('http://localhost:5000/api/cart', 'DELETE' , {userId, mangaId})
            const updateCartItems = cartItems.filter(item => item.manga !== mangaId)
            setCartItems(updateCartItems)
            return(updateCartItems)
        } catch(e) {
            setError(e)
        }
    },[userId,fetchCartItems,cartItems])

    const getFromCart = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart?userId=${currentUserID}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const items = await response.json()
            return items
        } catch (e) {
            setError(e)
        }
    },[currentUserID])

    const updateQuantityInCart = useCallback(async(mangaId, quantity) => {
        try{
            await fetchCartItems('http://localhost:5000/api/cart', 'PATCH', { userId, mangaId, quantity })
            setCartItems(prevItems => {
                if (!Array.isArray(prevItems)) {
                    return prevItems;
                }
                const existingItemIndex = prevItems.findIndex(item => item.id === mangaId)
                if (existingItemIndex !== -1) {
                    const updatedItems = [...prevItems]
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantity: quantity 
                    }
                    return updatedItems
                }
                return prevItems
            })
        } catch (e) {
            setError(e)
        }
    },[fetchCartItems,userId])

    return {addToCart, getFromCart, deleteFromCart, updateQuantityInCart,cartItems,error, fetchCartItems}
}