import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createCategory} from '../features/categories/categorySlice'
import {useNavigate} from 'react-router-dom'

function CategoryForm() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault()

    const data = {
      title: title,
      description: desc,
    }

    dispatch(createCategory(data))
    setTitle('')
    setDesc('')
    navigate('/categories')
  }

  return (
    <section className='container'>
      <h1>Create a Category</h1>
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

export default CategoryForm
