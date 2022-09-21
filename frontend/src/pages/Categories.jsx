import CategoryItem from '../components/CategoryItem'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {getCategories, reset} from '../features/categories/categorySlice'
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'

function Categories() {
  const dispatch = useDispatch()
  const {categories, isError, isLoading, message} = useSelector(
    (state) => state.categories
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getCategories())

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
        <h1 className='heading'>All Categories</h1>
      </section>

      <section className='content container'>
        <Link to='/categories/create'>
          <button className='new-btn'>+ New Category</button>
        </Link>
        {categories.length > 0 ? (
          <div className='categories'>
            {categories.map((category) => (
              <CategoryItem key={category._id} category={category} />
            ))}
          </div>
        ) : (
          <h3 className='no-items'>No Categories Yet</h3>
        )}
      </section>
    </>
  )
}

export default Categories
