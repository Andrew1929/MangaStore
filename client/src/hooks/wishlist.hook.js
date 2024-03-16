import { useCallback, useState, useContext} from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useWishlist = ({currentUserID}) => {
    const {userId} = useContext(AuthContext)
    const [wishlistItems , setWishlistItems] = useState([])
    const [error, setError] = useState(null)

    const fetchWishlistItems = useCallback(async(URL, method = 'GET', body = null, headers = {}) => {
        try{
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const wishlistResponse = await fetch (URL,{method,body,headers})
            const contentType = wishlistResponse.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid server response');
            }
            const data = await wishlistResponse.json()
            if(!wishlistResponse.ok){
                throw new Error(data.message || 'Something go wrong')
            }
            setWishlistItems(data)
            return data
        } catch (e) {
            console.log(e)
            setError(e.message)
        }
    },[])

    const addToWishlist = useCallback( async (mangaId, quantity = 1) => {
        try {
            const data = await fetchWishlistItems('http://localhost:5000/api/wishlist','POST' ,{userId, mangaId, quantity})
            setWishlistItems(prevItems => {
                if (!Array.isArray(prevItems)) {
                    return prevItems;
                }
                const existingItemIndex = prevItems.findIndex(item => item.Id === mangaId);
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
        } catch (e) {
            setError(e)
        }
    }, [fetchWishlistItems,userId])

    const removeFromWishlist = useCallback(async(mangaId) => {
        try{
            await fetchWishlistItems('http://localhost:5000/api/wishlist', 'DELETE' , {userId, mangaId})
            const updateWishlistItems = wishlistItems.filter(item => item.manga !== mangaId)
            setWishlistItems(updateWishlistItems)
            return(updateWishlistItems)
        } catch(e) {
            setError(e)
        }
    },[fetchWishlistItems,userId,wishlistItems])

    const getFromWishlist = useCallback(async () => {
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

    const updateQuantityInWishlist = useCallback(async(mangaId, quantity) => {
        try{
            await fetchWishlistItems('http://localhost:5000/api/wishlist', 'PATCH', { userId, mangaId, quantity })
            setWishlistItems(prevItems => {
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
    },[fetchWishlistItems,userId])

    return {addToWishlist, getFromWishlist, removeFromWishlist,updateQuantityInWishlist, wishlistItems, error , fetchWishlistItems}
}