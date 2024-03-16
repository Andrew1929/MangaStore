import React , {useEffect , useState, useContext} from "react"
import { AuthContext } from "../contexts/AuthContext"
import {useManga} from '../hooks/manga.hook'
import {Link} from 'react-router-dom'
import { Loader } from "./Loader"
import { useCart } from "../hooks/cart.hook"
import { Notification } from '../components/Notification'
import '../styles/MainPage.css'


export const MangaPanel = () => { 
    const [mangas,setManga] = useState([])
    const {fetchData} = useManga()
    const {userId} = useContext(AuthContext)
    const {addToCart} = useCart(userId)
    const [quantity] = useState(1) 
    const [showNotification, setShowNotification] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const loadData = async () => {
          try {
            const data = await fetchData('http://localhost:5000/api/search/manga')
            setManga(data)
          } catch (e) {}
        }
        loadData()
    },[fetchData])

    const handleAddCart = (mangaId) => {
        setMessage('Product added to cart')
        addToCart(mangaId, quantity)
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 10000)
    } 

    if (!mangas || mangas.length === 0) return <Loader />

    return(
        <div className="container">
            {mangas.slice(0, 8).map((manga, index) => (
                <div key={index} className="manga-card">
                    <div className='picture'>
                        <Link to={`/products/manga/${manga.id}`}>
                            <img src={manga.cover} alt={manga.title}/>
                        </Link>
                    </div>
                    <div className='content'>
                        <h3>{manga.title}</h3>
                        <div className="price">${manga.price}</div>
                        <button className="btn" onClick={() => handleAddCart(manga.id)}>add to basket</button>
                    </div>
                </div>
            ))}
            <Notification show={showNotification} message={message} onClose={() => setShowNotification(false)}/>
        </div>
    )  
}