import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  updateManufacturer,
  getManufacturerByID,
} from '../features/manufacturers/manufacturerSlice'
import {useNavigate, useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'

function ManufacturerUpdate() {
  const {manufacturer, isError, isLoading, message} = useSelector(
    (state) => state.manufacturers
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getManufacturerByID(id))
  }, [isError, message, dispatch, id])

  const [title, setTitle] = useState(manufacturer.title)
  const [desc, setDesc] = useState(manufacturer.description)

  if (isLoading || !manufacturer) {
    return <Spinner />
  }

  const submitForm = (e) => {
    e.preventDefault()

    const data = {
      id: id,
      title: title,
      description: desc,
    }

    dispatch(updateManufacturer(data))

    navigate(`/manufacturers`)
  }

  return (
    <section className='container'>
      <h1>Update Manufacturer</h1>
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
export default ManufacturerUpdate
