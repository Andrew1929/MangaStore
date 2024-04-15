import React , {useState, useContext, useEffect} from "react"
import {AuthContext} from '../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCart } from "../hooks/cart.hook"
import { useWishlist } from "../hooks/wishlist.hook"
import { faUser ,faCartShopping,faHeart ,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../styles/images/logo.jpg'
import '../styles/MainPage.css'

export const Header = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [cartCount, setCartCount] = useState(0)
    const [wishlistCount, setWishlistCount] = useState(0)
    const currentUserID = auth.userId
    const {fetchCartItems} = useCart({currentUserID})
    const {fetchWishlistItems} = useWishlist({currentUserID})
    const [cartItems, setCartItems] = useState([])
    const [wishlistItems, setWishlistItems] = useState([])

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
    const loadWishlistData = async () => {
        try {
            const data = await fetchWishlistItems(`http://localhost:5000/api/wishlist?userId=${currentUserID}`)
            if (data.length > 0 && data[0].wishlist && data[0].wishlist.length > 0) {
                const wishlistItems = data[0].wishlist
                setWishlistItems(wishlistItems)
            }
        } catch (e) {}
    }
    loadWishlistData()
}, [fetchWishlistItems, currentUserID])

    const updateCartCount = (cartItems) => {
      const count = cartItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    }

    const updateWishlistCount = (wishlistItems) => {
      const count = wishlistItems.reduce((total, item) => total + item.quantity, 0);
      setWishlistCount(count);
    }

    useEffect(() => {
      updateCartCount(cartItems);
    }, [cartItems])

    useEffect(() => {
      updateWishlistCount(wishlistItems);
    }, [wishlistItems])

    // useEffect (() => {
    //   setCartCount(getItemCount(`cartStorage-undefined`))
    //   setWishlistCount(getItemCount(`wishlistStorage-undefined`))
    // },[setCartCount,setWishlistCount])

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    return(
      <header>
        <div className="logo">
          <img className='logo-p' src={logo} alt='Logo'/>
          <a href="/main">Mangastore</a>
        </div>
        <nav>
          <ul>
            <li><Link to="/main">Home</Link></li>
            <li><Link to="/categories">Shop</Link></li>
            <li><Link to="/about-us">About us</Link></li>
            <li><Link to="/contact-us">Contact us</Link></li>
          </ul>
        </nav>
        <div className="icons">
          <Link to= '/favorites'>
            <FontAwesomeIcon icon={faHeart} />
              {wishlistCount > 0 && <span className="icon-count">{wishlistCount}</span>}
          </Link>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <Link to= '/profile' ><FontAwesomeIcon icon={faUser}/></Link>
          <Link to= '/bag' >
          <FontAwesomeIcon icon={faCartShopping} />
            {cartCount > 0 && <span className="icon-count">{cartCount}</span>}
          </Link>
        </div>
      </header>
    )
}