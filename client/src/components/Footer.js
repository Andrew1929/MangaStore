import React from "react"
import logo from '../styles/images/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faYoutube, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import {Link} from 'react-router-dom'
import '../styles/MainPage.css'

export const Footer = () => {
    return(
        <>
            <footer>
                <div className='join'>
                    <p className='sign'>Sign up & save</p>
                    <p>Be updated on new arrivals, trends and offers. Sign up now!</p>
                    <div className="input-button-container">
                        <input type="email" className="email" placeholder="Enter email address"/> 
                        <button>Subscribe</button>
                    </div>
                </div>
                <div className="footer">
                    <div className='higher'>
                        <div className='customerService'>
                            <h5>CUSTOMER SERVICE</h5>
                            <div className='service'>
                                <p>Track Your Crunchyroll Store Order</p>
                                <p>Track Your Right Stuf Order</p>
                                <p>Contact Us</p>
                                <p>Delayed Pre-Orders List</p>
                                <p>Sezzle</p>
                                <p>Shipping & Returns</p>
                                <p>FAQ</p>
                            </div>
                        </div>
                        <div className='mission'>
                            <h5>OUR MISSION</h5>
                            <p>Our mission is to provide our customers with high-quality products and exceptional service that exceed their expectations.</p>
                        </div>
                        <div className='storeLogo'>
                            <img className='Flogo' src={logo} alt='Logo'/>
                        </div>
                    </div>
                    <div className='lower'>
                        <div className='underLine'>
                            <div className='location'>
                                <p>In some country in some city</p>
                                <p>Email: IGoodProgramerISwear@gmail.com</p>
                            </div>
                            <div className='socialMedia'>
                                <Link to="https://www.instagram.com/" target="_blank" className="sm"><FontAwesomeIcon icon={faInstagram} /></Link>
                                <Link to="https://www.youtube.com/" target="_blank" className="sm"><FontAwesomeIcon icon={faYoutube} /></Link>
                                <Link to="https://web.telegram.org/k/" target="_blank" className="sm"><FontAwesomeIcon icon={faTelegram} /></Link>
                                <Link to="https://twitter.com/?lang=uk" target="_blank" className="sm"><FontAwesomeIcon icon={faXTwitter} /></Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </footer>
        </> 
    )
}