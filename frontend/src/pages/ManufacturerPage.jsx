import {useDispatch, useSelector} from 'react-redux'
import {
  getManufacturerByID,
  reset,
  deleteManufacturer,
} from '../features/manufacturers/manufacturerSlice'
import {useParams, Link, useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import Spinner from '../components/Spinner'
import {getParts} from '../features/parts/partSlice'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ManufacturerPage() {
  let {id} = useParams()

  const {manufacturer, isError, isLoading, message} = useSelector(
    (state) => state.manufacturers
  )
  const {parts} = useSelector((state) => state.parts)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    dispatch(getManufacturerByID(id))
    dispatch(getParts())
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch, id])

  if (isLoading || !manufacturer || !parts) {
    return <Spinner />
  }

  const partsByManufacturer = parts.filter((p) => p.manufacturer._id == id)

  const deleteBtn = () => {
    if (partsByManufacturer.length === 0) {
      dispatch(deleteManufacturer(id))
      navigate('/manufacturers')
    } else {
      toast.warning('Parts made by this manufacturer must be deleted first!')
    }
  }

  const addToStorage = (category, part) => {
    let obj = {
      id: part._id,
      name: part.name,
      price: part.price,
    }
    localStorage.setItem(category, JSON.stringify(obj))
    navigate('/')
  }

  return (
    <div className='container page-heading'>
      <h1>{manufacturer.title}</h1>
      <Link
        to={`/manufacturers/update/${manufacturer._id}`}
        className='updelete-btn'>
        Update
      </Link>
      <button className='updelete-btn' onClick={deleteBtn}>
        Delete
      </button>
      <ToastContainer position='top-center' autoClose={3000} />
      <h4 className='page-desc'>{manufacturer.description}</h4>

      <table className='table container'>
        <tbody className='mc-table'>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
          </tr>
          {partsByManufacturer.map((p) => (
            <tr key={p._id}>
              <td>
                <div className='th-small'>Name</div>
                <Link className='table-links' to={`/parts/${p._id}`}>
                  {p.name}
                </Link>
              </td>
              <td>
                <div className='th-small'>Category</div>
                <Link
                  className='table-links'
                  to={`/categories/${p.category._id}`}>
                  {p.category.title}
                </Link>
              </td>
              <td className='stock'>{p.stock}</td>
              <td>
                <div className='th-small'>Price</div>${p.price}
              </td>
              <td>
                <button
                  onClick={() => addToStorage(p.category._id, p)}
                  className='add-to-list'>
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManufacturerPage
