import { useState } from 'react'
import Mainpage from './page/Mainpage'
import { Route, Routes } from 'react-router-dom'
import Refrigerator from './page/refrigerator'
import Myrecipe from './page/Recipepage/Myrecipe'
import MakeRecipe from './page/Recipepage/Makerecipe'



function App() {
 
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Mainpage />}></Route>
      <Route path="/recipe" element={<Myrecipe />}></Route>
      <Route path="/myrecipe" element={<Myrecipe />}></Route>
      <Route path="/refrigerator" element={<Refrigerator />}></Route>
      <Route path="/makerecipe" element={<MakeRecipe />}></Route>
    </Routes>
    </div> 
  )
}

export default App
