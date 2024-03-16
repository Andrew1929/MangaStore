import React from 'react'
import {MangaPanel} from '../components/MangaPanel'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'



export const MainPage = () => {
    return (
      <>
        <Header/>

        <section className='mainPic'/>

        <section className='section'>

          <h1 className='heading'>
            <span>Manga</span>
          </h1>

          <MangaPanel/>

        </section>

        <Footer/>
      </> 
    )
}