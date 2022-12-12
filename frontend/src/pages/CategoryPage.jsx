import {useDispatch, useSelector} from 'react-redux'
import {
  getCategoryByID,
  reset,
  deleteCategory,
} from '../features/categories/categorySlice'
import {getParts} from '../features/parts/partSlice'
import {useParams, Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Spinner from '../components/Spinner'
import {TbMoodCry} from 'react-icons/tb'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function CategoryPage() {
  let {id} = useParams()

  const {category, isError, isLoading, message} = useSelector(
    (state) => state.categories
  )
  const {parts} = useSelector((state) => state.parts)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getCategoryByID(id))
    dispatch(getParts())
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch, id])

  if (isLoading || !category || !parts) {
    return <Spinner />
  }

  const partsByCategory = parts.filter((p) => p.category._id == id)

  const deleteBtn = () => {
    if (partsByCategory.length === 0) {
      dispatch(deleteCategory(id))
      navigate('/categories')
    } else {
      toast.warning('Parts in category must be deleted first!')
    }
  }

  const addToStorage = (category, part) => {
    let obj = {
      id: part._id,
      name: part.name,
      price: part.price,
      category: part.category.title,
    }
    localStorage.setItem(category, JSON.stringify(obj))
    navigate('/')
  }

  return (
    <div className='container page-heading'>
      <h1>{category.title}</h1>
      <Link to={`/categories/update/${category._id}`} className='updelete-btn'>
        Update
      </Link>
      <button className='updelete-btn' onClick={deleteBtn}>
        Delete
      </button>
      <ToastContainer position='top-center' autoClose={3000} />
      <h4 className='page-desc'>{category.description}</h4>

      <table className='table container'>
        <tbody className='mc-table'>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Stock</th>
            <th>Price</th>
            <th></th>
          </tr>
          {partsByCategory.map((p) => (
            <tr key={p._id}>
              <td>
                <div className='th-small'>Name</div>
                <Link className='table-links' to={`/parts/${p._id}`}>
                  {p.name}
                </Link>
              </td>
              <td>
                <div className='th-small'>Manufacturer</div>
                <Link
                  className='table-links'
                  to={`/manufacturers/${p.manufacturer._id}`}>
                  {p.manufacturer.title}
                </Link>
              </td>
              <td className='stock'>{p.stock}</td>
              <td>
                <div className='th-small'>Price</div>${p.price}
              </td>
              <td>
                <button
                  onClick={() => addToStorage(category._id, p)}
                  className='add-to-list'>
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {partsByCategory.length === 0 && (
        <TbMoodCry
          style={{color: 'gray', fontSize: '88px', marginTop: '24px'}}
        />
      )}
    </div>
  )
}

export default CategoryPage
