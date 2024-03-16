import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

export const Empty = () => {
    return(
        <div style={{padding: '175px'}} className='exmtyComponent'>
            <div style={{display: 'flex', justifyContent: 'center', fontSize: '100px', paddingBottom: '40px'}} className='bagIcon'>
                <FontAwesomeIcon  icon={faBagShopping}/>
            </div>
            <p style={{display: 'flex', justifyContent: 'center', fontSize: '22px', fontWeight: 'bold', paddingBottom: '15px' }}>Your cart is empty</p>
            <p style={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', paddingBottom: '30px'}}>Looks like you haven't made your choice yet..</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Link to = '/main'><button className='homeBtn'>Back to homepage</button></Link>
            </div>
        </div>
    )
}