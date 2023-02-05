import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {getCategories, reset} from '../features/categories/categorySlice'
import {getParts} from '../features/parts/partSlice'
import {Link, useNavigate} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
import {FaAmazon, FaDownload} from 'react-icons/fa'
import {CSVLink} from 'react-csv'

function List() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {categories, isError, message} = useSelector(
    (state) => state.categories
  )

  const ids = []
  categories.forEach((c) => {
    ids.push(c._id)
  })

  const getSelections = () => {
    let selections = Object.keys(localStorage)
    selections.forEach((s, i) => {
      if (!ids.includes(s)) {
        console.log(s)
        selections.splice(i, 1)
      }
    })
    return selections
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getCategories())

    return () => {
      dispatch(reset)
    }
  }, [isError, message, dispatch])

  const checkStorage = (id) => {
    return localStorage.getItem(id)
  }

  const displaySelection = (id) => {
    let storedPart = JSON.parse(checkStorage(id))

    return (
      <Link className='list-part-text' to={`/parts/${storedPart.id}`}>
        {storedPart.name}
      </Link>
    )
  }

  const displayPrice = (id) => {
    let storedPart = getStoredPart(id)
    return <h4 className='price'>${storedPart.price}</h4>
  }

  const removeSelection = (c) => {
    localStorage.removeItem(c._id)

    navigate('/')
  }

  const displayTotal = () => {
    let selections = getSelections()
    let total = 0
    selections.forEach((s) => {
      total += Number(getStoredPart(s).price)
    })
    return total
  }

  const purchaseLink = (id) => {
    const storedPart = getStoredPart(id)
    const formatted = storedPart.name.replace(' ', '+')
    return `https://amazon.com/s?k=${formatted}`
  }

  const getStoredPart = (id) => {
    try {
      JSON.parse(checkStorage(id))
    } catch (e) {
      return false
    }

    let storedPart = JSON.parse(checkStorage(id))
    return storedPart
  }

  const createCSV = () => {
    let selections = getSelections()
    console.log(selections)
    const data = []
    data.push(['Component', 'Selection', 'Price'])
    selections.forEach((id) => {
      const storedPart = getStoredPart(id)
      const itemArray = [
        storedPart.category,
        storedPart.name,
        `$${storedPart.price}`,
      ]
      data.push(itemArray)
    })
    return data
  }

  return (
    <>
      <section className='container'>
        <h1 className='heading'>My List</h1>
        <div className='csv-div'>
          <CSVLink
            className='csv'
            data={createCSV()}
            filename='pcplanner.csv'
            enclosingCharacter=''>
            Export to CSV <FaDownload />
          </CSVLink>
        </div>
        <table className='table container'>
          <tbody>
            <tr className='table-headings'>
              <th className='th-home'>Component</th>
              <th className='th-home'>Selection</th>
              <th className='th-home'>Price</th>
            </tr>
            {categories.map((c) => (
              <tr key={c._id}>
                <td>
                  <Link to={`/categories/${c._id}`} className='list-names'>
                    {c.title}
                  </Link>
                </td>
                <td>
                  {checkStorage(c._id) ? (
                    displaySelection(c._id)
                  ) : (
                    <Link to={`/categories/${c._id}`}>
                      <button className='list-selection-btn'>
                        + Choose {c.title}
                      </button>
                    </Link>
                  )}
                </td>
                <td>{checkStorage(c._id) && displayPrice(c._id)}</td>
                <td>
                  {checkStorage(c._id) && (
                    <a
                      href={purchaseLink(c._id)}
                      target='_blank'
                      rel='noreferrer'>
                      <p className='purchase'>
                        Buy
                        <FaAmazon />
                      </p>
                    </a>
                  )}
                </td>
                <td>
                  {checkStorage(c._id) && (
                    <AiOutlineClose
                      className='remove-selection-btn'
                      onClick={() => removeSelection(c)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className='total-text'>
          Total: <span className='total-price'>${displayTotal()}</span>
        </p>
      </section>
    </>
  )
}

export default List
