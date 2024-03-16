import React, {useEffect} from 'react'
import {BrowserRouter, useLocation} from 'react-router-dom'
import {useRoutes} from './routes'
import { useAuth } from './hooks/auth.hook'
import {AuthContext} from './contexts/AuthContext'
import {Loader} from './components/Loader'
import 'materialize-css'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  return null
}

function App() {
  const { token, userId, login, logout, ready} = useAuth()
  const isAuthenticated = !!token
  const routes  =  useRoutes(isAuthenticated) 

  if(!ready){
    return(
      <Loader/>
    )
  }

  return (
    <AuthContext.Provider value={{login,logout,token,userId,isAuthenticated}}>
      <BrowserRouter>
        <ScrollToTop />
          <div>
            {routes}
          </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
