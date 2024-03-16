import React from "react";
import { Routes , Route , Navigate } from 'react-router-dom';
import {AuthPage} from './pages/AuthPage'
import {ProfilePage} from './pages/ProfilePage'
import {MainPage} from './pages/MainPage'
import {RegisterPage} from './pages/RegisterPage'
import {CategoriesPage} from './pages/CategoriesPage'
import {AboutPage} from './pages/AboutPage'
import {ContactPage} from './pages/ContactPage'
import {BagPage} from './pages/BagPage'
import {FavoritesPage} from './pages/FavoritesPage'
import {ProductPage} from './pages/ProductPage'

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return (
            <Routes>
               <Route path="/main" element={<MainPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/contact-us" element={<ContactPage />} />
                <Route path="/bag" element={<BagPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/products/manga/:id" element={<ProductPage />} />
                <Route path="*" element={<Navigate to="/main" />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
} 