import PartItem from '../components/PartItem'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {getParts, reset} from '../features/parts/partSlice'
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'

function Parts() {
  const dispatch = useDispatch()
  const {parts, isLoading, isError, message} = useSelector(
    (state) => state.parts
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getParts())

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='container'>
        <h1 className='heading'>All Parts</h1>
      </section>

      <section id='parts-page' className='content container'>
        <Link to='/parts/create'>
          <button className='new-btn'>+ New Part</button>
        </Link>

        <table className='table container'>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
            {parts.map((p) => (
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
      </section>
    </>
  )
}

export default Parts
