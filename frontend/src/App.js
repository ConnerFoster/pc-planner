import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import List from './pages/List'
import Categories from './pages/Categories'
import Manufacturers from './pages/Manufacturers'
import Parts from './pages/Parts'
import Header from './components/Header'
import CategoryPage from './pages/CategoryPage'
import ManufacturerPage from './pages/ManufacturerPage'
import PartPage from './pages/PartPage'
import CategoryForm from './components/CategoryForm'
import ManufacturerForm from './components/ManufacturerForm'
import PartForm from './components/PartForm'
import CategoryUpdate from './components/CategoryUpdate'
import ManufacturerUpdate from './components/ManufacturerUpdate'
import PartUpdate from './components/PartUpdate'

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<List />}></Route>
            <Route path='/categories' element={<Categories />}></Route>
            <Route path='/manufacturers' element={<Manufacturers />}></Route>
            <Route path='/parts' element={<Parts />}></Route>
            <Route path='/categories/:id' element={<CategoryPage />}></Route>
            <Route
              path='/manufacturers/:id'
              element={<ManufacturerPage />}></Route>
            <Route path='/parts/:id' element={<PartPage />}></Route>
            <Route path='/categories/create' element={<CategoryForm />}></Route>
            <Route
              path='/manufacturers/create'
              element={<ManufacturerForm />}></Route>
            <Route path='/parts/create' element={<PartForm />}></Route>
            <Route
              path='/categories/update/:id'
              element={<CategoryUpdate />}></Route>
            <Route
              path='/manufacturers/update/:id'
              element={<ManufacturerUpdate />}></Route>
            <Route path='/parts/update/:id' element={<PartUpdate />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
