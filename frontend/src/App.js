import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import List from './pages/List'
import Categories from './pages/Categories'
import Manufacturers from './pages/Manufacturers'
import Parts from './pages/Parts'
import Header from './components/Header'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<List />}></Route>
            <Route path='/categories' element={<Categories />}></Route>
            <Route path='/manufacturers' element={<Manufacturers />}></Route>
            <Route path='/parts' element={<Parts />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
