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

  return (
    <div className='container page-heading'>
      <h1>{category.title}</h1>
      <button className='updelete-btn'>Update</button>
      <button className='updelete-btn' onClick={deleteBtn}>
        Delete
      </button>
      <ToastContainer position='top-center' autoClose={3000} />
      <h4 className='page-desc'>{category.description}</h4>

      <table className='table container'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Stock</th>
            <th>Price</th>
          </tr>
          {partsByCategory.map((p) => (
            <tr key={p._id}>
              <td>
                <Link className='table-links' to={`/parts/${p._id}`}>
                  {p.name}
                </Link>
              </td>
              <td>
                <Link
                  className='table-links'
                  to={`/manufacturers/${p.manufacturer._id}`}>
                  {p.manufacturer.title}
                </Link>
              </td>
              <td>{p.stock}</td>
              <td>${p.price}</td>
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
