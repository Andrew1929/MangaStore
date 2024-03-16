import React from 'react'
import { Header } from '../components/Header'
import {Link} from 'react-router-dom'
import { Footer } from '../components/Footer'

export const ContactPage = () => {
    return (
        <>
            <Header/>

            <div style={{padding: '40px 160px 20px 160px' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '28px', paddingBottom: '30px'}}>Contact Us</h1>

                <p style={{ fontWeight: 'bold', fontSize: '17px', paddingBottom: '5px'}}>Official Contac № 123-456-789</p>
                <p style={{ fontWeight: 'bold', fontSize: '17px', paddingBottom: '5px'}}>Official Mail ID.<Link to='https://github.com/Andrew1929' target='_blank' style={{color: 'purple'}}>IGoodProgramerISwear:)</Link></p>
                <p style={{ fontWeight: 'bold', fontSize: '17px', paddingBottom: '30px'}}>Address: In some country in some city</p>
            </div>
            
            <Footer/>
        </>
    )
}