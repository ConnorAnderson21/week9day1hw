import { useState } from 'react'

import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import Home from './home';
import Login from './login';
import Shop from './shop';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav />
      <Routes>
      <Route children path='/' element={<Home />} />
      <Route children path='/login' element={<Login />} />
      <Route children path='/shop' element={<Shop />} />
      </Routes>
      
    </>
  )
}

export default App
