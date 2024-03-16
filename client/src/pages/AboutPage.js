import React from 'react'
import { Header } from '../components/Header'
import {Link} from 'react-router-dom'
import { Footer } from '../components/Footer'


export const AboutPage = () => {
    return (
        <>
            <Header/>
            
            <div style={{padding: '60px 160px 20px 160px' }} className='about'>
                <h1 >About us</h1>
                <p style={{padding: '30px 0 30px 0',fontSize: '22px', fontWeight: 'bold'}}>Wellcome!!!</p>
                <p style={{ fontWeight: 'bold', fontSize: '17px', paddingBottom: '30px'}}>Manga Store is a test project crafted by an aspiring software engineer, driven by the goal of honing skills in both front-end and back-end development. This endeavor serves as a platform for hands-on practice, allowing for the application of theoretical knowledge in a real-world context. The project provides valuable insights into the complexities of building a seamless user experience while delving into the intricacies of server-side functionality. With a passion for continuous improvement, the engineer seeks to refine their expertise through this project, embracing challenges and mastering the art of creating a robust and user-friendly Manga Store.</p>
                <p style={{ fontWeight: 'bold', fontSize: '17px', paddingBottom: '30px'}}>Site's advantages :</p>
                <li style={{ fontWeight: 'bold', fontSize: '17px'}}>nice and clear interface</li>
                <li style={{ fontWeight: 'bold', fontSize: '17px'}}>using modern frameworks</li>
                <li style={{ fontWeight: 'bold', fontSize: '17px', paddingBottom: '30px'}}>Responsive design ensuring a seamless experience across various devices and screen sizes</li>
                <p style={{ fontWeight: 'bold', fontSize: '22px', paddingBottom: '20px'}}>Corporate Office :</p>
                <p style={{ fontWeight: 'bold', fontSize: '17px', paddingBottom: '30px'}}>nowhere because at current time i just study to do something (⁠｡⁠•̀⁠ᴗ⁠-⁠)⁠✧</p>
                <p style={{ fontWeight: 'bold', fontSize: '17px', paddingBottom: '20px'}}>GitHub: <Link to='https://github.com/Andrew1929' target='_blank' style={{color: 'purple'}}>Andrew1929</Link></p>
            </div>
            
            <Footer/>
        </>
    )
}