// import { useState } from 'react'

import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import Home from './home';
import Login from './login';
import Shop from './shop';
import Cart from './cart';


function App() {
  

  return (
    <>
      <Nav />
      <Routes>
      <Route children path='/' element={<Home />} />
      <Route children path='/login' element={<Login />} />
      <Route children path='/shop' element={<Shop />} />
      <Route children path='/cart' element={<Cart  />} />
      </Routes>
      
    </>
  )
}

export default App
