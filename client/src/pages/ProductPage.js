import React from 'react'
import { Header } from '../components/Header'
import { Product } from '../components/Product'
import { Footer } from '../components/Footer'

export const ProductPage = () => {
    return (
        <>
            <Header/>

            <section className='section'>

                <Product/>

            </section>

            <Footer/>
        </>
    )
}