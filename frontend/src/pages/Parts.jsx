import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {getParts, reset} from '../features/parts/partSlice'
import Spinner from '../components/Spinner'
import {Link, useNavigate} from 'react-router-dom'
import {TiArrowSortedDown, TiArrowSortedUp} from 'react-icons/ti'

function Parts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {parts, isLoading, isError, message} = useSelector(
    (state) => state.parts
  )

  const [sortChoice, setSortChoice] = useState(null)
  const [searchBar, setSearchBar] = useState('')
  let sortedParts = [...parts]

  if (sortChoice !== null) {
    if (sortChoice.sortMethod == 'number') {
      sortedParts.sort((a, b) => {
        if (a[sortChoice.key] < b[sortChoice.key]) {
          return sortChoice.direction === 'ascending' ? -1 : 1
        }
        if (a[sortChoice.key] > b[sortChoice.key]) {
          return sortChoice.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    if (sortChoice.sortMethod == 'string') {
      sortedParts.sort((a, b) => {
        if (a[sortChoice.key].toLowerCase() < b[sortChoice.key].toLowerCase()) {
          return sortChoice.direction === 'ascending' ? -1 : 1
        }
        if (a[sortChoice.key].toLowerCase() > b[sortChoice.key].toLowerCase()) {
          return sortChoice.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    if (sortChoice.sortMethod == 'nestedObjectString') {
      sortedParts.sort((a, b) => {
        if (
          a[sortChoice.key].title.toLowerCase() <
          b[sortChoice.key].title.toLowerCase()
        ) {
          return sortChoice.direction === 'ascending' ? -1 : 1
        }
        if (
          a[sortChoice.key].title.toLowerCase() >
          b[sortChoice.key].title.toLowerCase()
        ) {
          return sortChoice.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
  }

  const trackSorting = (key) => {
    let direction = 'ascending'
    let sortMethod = ''

    if (key === 'name') {
      sortMethod = 'string'
    }
    if (key === 'category' || key === 'manufacturer') {
      sortMethod = 'nestedObjectString'
    }
    if (key === 'stock' || key === 'price') {
      sortMethod = 'number'
    }

    if (sortChoice != null) {
      if (sortChoice.key === key && sortChoice.direction === 'ascending') {
        direction = 'descending'
      }
    }

    setSortChoice({key, direction, sortMethod})
  }

  const getIcon = (key) => {
    if (sortChoice != null && key === sortChoice.key) {
      if (sortChoice.direction === 'ascending') return <TiArrowSortedDown />
      if (sortChoice.direction === 'descending') return <TiArrowSortedUp />
    }
    return null
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchBar(e.target.value)
  }

  if (searchBar.length > 0) {
    sortedParts = sortedParts.filter((sortedPart) => {
      return sortedPart.name.toLowerCase().match(searchBar.toLowerCase())
    })
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getParts())

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  if (isLoading || !parts) {
    return <Spinner />
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
    <>
      <section className='container'>
        <h1 className='heading'>All Parts</h1>
      </section>

      <section id='parts-page' className='content container'>
        <Link to='/parts/create'>
          <button className='new-btn'>+ New Part</button>
        </Link>
        <div className='flex-search'>
          <p className='num-items'>{parts.length} product(s)</p>
          <input
            type='text'
            placeholder='Search parts'
            value={searchBar || ''}
            onChange={handleSearch}
          />
        </div>

        <table className='table container'>
          <tbody>
            <tr>
              <th className='th-big' onClick={() => trackSorting('name')}>
                Name {getIcon('name')}
              </th>
              <th
                className='th-big'
                onClick={() => trackSorting('manufacturer')}>
                Manufacturer {getIcon('manufacturer')}
              </th>
              <th className='th-big' onClick={() => trackSorting('category')}>
                Category {getIcon('category')}
              </th>
              <th onClick={() => trackSorting('stock')}>
                Stock{getIcon('stock')}
              </th>
              <th onClick={() => trackSorting('price')}>
                Price{getIcon('price')}
              </th>
            </tr>
            {sortedParts.map((p) => (
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
                <td>
                  <div className='th-small'>Category</div>
                  <Link
                    className='table-links'
                    to={`/categories/${p.category._id}`}>
                    {p.category.title}
                  </Link>
                </td>

                <td className='stock'>{p.stock}</td>
                <td className='parts-price'>
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
      </section>
    </>
  )
}

export default Parts
