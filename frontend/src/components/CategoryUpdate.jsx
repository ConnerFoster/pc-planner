import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  updateCategory,
  getCategoryByID,
} from '../features/categories/categorySlice'
import {useNavigate, useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'

function CategoryUpdate() {
  const {category, isError, isLoading, message} = useSelector(
    (state) => state.categories
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(id)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getCategoryByID(id))
  }, [isError, message, dispatch, id])

  const [title, setTitle] = useState(category.title)
  const [desc, setDesc] = useState(category.description)

  if (isLoading || !category) {
    return <Spinner />
  }

  const submitForm = (e) => {
    e.preventDefault()

    console.log(title)

    const data = {
      id: id,
      title: title,
      description: desc,
    }

    console.log(data)
    dispatch(updateCategory(data))

    navigate(`/categories`)
  }

  return (
    <section className='container'>
      <h1>Update Category</h1>
      <form onSubmit={submitForm}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            maxLength='100'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='desc'>Description</label>
          <textarea
            maxLength='750'
            name='desc'
            id='desc'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn-block b-yellow' type='submit'>
            Submit
          </button>
        </div>
        <div className='form-group'>
          <button
            className='btn-block dark-gray yellow'
            type='button'
            onClick={() => navigate('/categories')}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}
export default CategoryUpdate
