import React from 'react'
import Parent from './component/Parent'
import State from './component/state'
import Navbar from './component/Navbar'
import { Routes,Route } from 'react-router-dom'

const App = () => {
  return (
    //Fragment Tag
    <>
    <Navbar/>
    <Routes>
      <Route path='/'element={<Parent/>}></Route>
      <Route path='/useState' element={<State/>}/>
    </Routes>
    </>
  )
}

export default App