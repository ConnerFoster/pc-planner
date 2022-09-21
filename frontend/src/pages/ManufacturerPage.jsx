import {useDispatch, useSelector} from 'react-redux'
import {
  getManufacturerByID,
  reset,
} from '../features/manufacturers/manufacturerSlice'
import {useParams, Link} from 'react-router-dom'
import {useEffect} from 'react'
import Spinner from '../components/Spinner'
import {getParts} from '../features/parts/partSlice'

function ManufacturerPage() {
  let {id} = useParams()

  const dispatch = useDispatch()
  const {manufacturer, isError, isLoading, message} = useSelector(
    (state) => state.manufacturers
  )
  const {parts} = useSelector((state) => state.parts)

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

  return (
    <div className='container page-heading'>
      <h1>{manufacturer.title}</h1>
      <button className='updelete-btn'>Update</button>
      <button className='updelete-btn'>Delete</button>
      <h4 className='page-desc'>{manufacturer.description}</h4>

      <table className='table container'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
          </tr>
          {partsByManufacturer.map((p) => (
            <tr key={p._id}>
              <td>
                <Link className='table-links' to={`/parts/${p._id}`}>
                  {p.name}
                </Link>
              </td>
              <td>
                <Link
                  className='table-links'
                  to={`/categories/${p.category._id}`}>
                  {p.category.title}
                </Link>
              </td>
              <td>{p.stock}</td>
              <td>${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManufacturerPage
