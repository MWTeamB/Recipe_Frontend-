import { useState } from 'react'
import Mainpage from './page/Mainpage'
import { Route, Routes } from 'react-router-dom'
import Myrecipe from './page/Recipepage/Myrecipe'
import MakeRecipepage from './page/Recipepage/MakeRecipepage'




function App() {
 
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Mainpage />}></Route>
      <Route path="/recipe" element={<Myrecipe />}></Route>
      <Route path="/myrecipe" element={<Myrecipe />}></Route>
      <Route path="/makerecipe" element={<MakeRecipepage />}></Route>
    </Routes>
    </div> 
  )
}

export default App
