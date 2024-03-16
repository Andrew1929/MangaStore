import React, {useState, useEffect} from "react"
import '../styles/ProductPage.css'

export const QuantitySelector = ({className, manga, showTotalPrice, showText, onQuantityChange}) => {
    const [quantity, setQuantity] = useState(manga.quantity || 1)

    useEffect(() => {
        if (manga.quantity !== undefined) {
            setQuantity(manga.quantity)
        }
    }, [manga.quantity])

    const handleIncrement = () => {
        const newQuantity = quantity < 5 ? quantity + 1 : quantity
        setQuantity(newQuantity)
        onQuantityChange(newQuantity)
        
    }

    const handleDecrement = () => {
        const newQuantity = quantity > 1 ? quantity - 1 : quantity
        setQuantity(newQuantity)
        onQuantityChange(newQuantity)
    }

    return(
        <>
            {showText && (<p className = 'quan'>Quantity :</p>)}
            <div className={`quantity-selector ${className}`}>
                <button onClick={handleDecrement}>-</button>
                <div className='quantity-display' >{quantity}</div>
                <button onClick={handleIncrement}>+</button>
            </div>
            {showTotalPrice && (
                <div className='total'>
                    <p className="totalPrice">Total price: ${manga.price * quantity}</p>
                </div>
            )}
        </>
    )
}