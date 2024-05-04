import '../styles/ShopPage.css';
import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useManga} from '../hooks/manga.hook'
import { Loader } from "./Loader"
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

export const Shop = () => {
    const [mangas , setMangas] = useState();
    const {fetchData} = useManga();

    useEffect(() => {
        const loadData = async () => {
          try {
            const data = await fetchData('http://localhost:5000/api/search/manga')
            setMangas(data)
          } catch (e) {}
        }
        loadData()
    },[fetchData])

    useEffect(() => {
        const priceInput = document.querySelector('.price-input');
        const priceInputValue = document.querySelector('.price-filter-text');

        if (priceInput && priceInputValue) {
            priceInput.addEventListener('input', () => {
                priceInputValue.innerHTML = `price: $${priceInput.value}.00`;
            });
        }

        return () => {
            if (priceInput && priceInputValue) {
                priceInput.removeEventListener('input', () => {
                    priceInputValue.innerHTML = `price: $${priceInput.value}.00`;
                });
            }
        };
    }, []);
    
    return (
        <>
            <section className='shop'>
                <div className="filters">
                    <h3 className="filters-section-title">Filters</h3>

                    <div className="search-bar">
                        <input className='search-bar-field' type='text' placeholder='search...'></input>
                        <FontAwesomeIcon className='search-bar-btn' icon={faMagnifyingGlass} />
                    </div>

                    <div className="filter-by-genre">
                        <h3 className="filter-title">Filter by genre</h3>
                        
                        <div className='filter-genre-list'>
                            <li className='genre'>
                               <button className='genre-btn'> action</button>
                            </li>
                            <li className='genre'>
                                <button className='genre-btn'> comedy</button>
                            </li>
                            <li className='genre'>
                                <button className='genre-btn'>fantasy</button>
                            </li>
                            <li className='genre'>
                                <button className='genre-btn'>romance</button>
                            </li>
                            <li className='genre'>
                                <button className='genre-btn'>horror</button>
                            </li>
                            <li className='genre'>
                                <button className='genre-btn'>drama</button>
                            </li>
                            <li className='genre'>
                                <button className='genre-btn'>seinen</button>
                            </li>
                            <li className='genre'>
                                <button className='genre-btn'>other</button>
                            </li>
                        </div>
                        
                    </div>

                    <div className="filter-by-price">
                        <h3 className="filter-title">Filter by price</h3>

                        <h3 className='price-filter-text'>price: $10.00</h3>

                        <input className='price-input' min = {0} max={20} type='range'/>
                    </div>
                </div>

                <div className="product-cards">
                    <h1 className="shop-page-title">Shop</h1>

                    <div className="product-cards-location">
                        {mangas.map((manga , index) => (
                            <div key={index} className='product-card'>
                                <img className='product-card-img' src={manga.cover}></img> 

                                <div className='product-card-content'>
                                    <h3 className='product-title'>{manga.title}</h3>

                                    <h3>{manga.price}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}