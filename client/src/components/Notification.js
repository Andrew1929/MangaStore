import React from "react"
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

export const Notification = ({ show, message, onClose}) => {
    if (!show) return null

    return (
        <div className='notificationContainer'>
            <div className="closeBtn" onClick={onClose}><FontAwesomeIcon icon={faXmark} /></div>
            <p style={{fontWeight: 'bold', paddingBottom: '15px', fontSize: '20px', paddingTop: '20px'}}>{message}</p>
            <div style={{}}>
                <Link to='/bag'><button className='toCart'>Go to cart</button></Link>
            </div>
        </div>
    )
}