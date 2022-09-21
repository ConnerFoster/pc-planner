import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getCategories} from '../features/categories/categorySlice'
import {getManufacturers} from '../features/manufacturers/manufacturerSlice'
import {createPart} from '../features/parts/partSlice'
import Spinner from './Spinner'

function PartForm() {
  const {categories, isError, isLoading, message} = useSelector(
    (state) => state.categories
  )
  const {manufacturers} = useSelector((state) => state.manufacturers)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [category, setCategory] = useState('')
  const [manufacturer, setManufacturer] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault()

    const data = {
      name: name,
      description: description,
      price: price,
      stock: stock,
      category: category,
      manufacturer: manufacturer,
    }

    dispatch(createPart(data))
    console.log(category, manufacturer)
    setName('')
    setDescription('')
    setPrice(0)
    setStock(0)
    setCategory('')
    setManufacturer('')
    navigate('/parts')
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    dispatch(getCategories())
    dispatch(getManufacturers())
  }, [dispatch, isError, message])

  //adding dispatch as dependency was important for stopping re-renders (Keep in mind)

  /*if (isLoading || !categories || !manufacturers) {
      return <Spinner />
  }*/

  return (
    <section className='container'>
      <h1>Add a New Part</h1>
      <form onSubmit={submitForm}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            required
            maxLength='100'
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            maxLength='750'
            required
            name='description'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='nums'>
          <div className='form-group drop-items'>
            <label htmlFor='price'>Price</label>
            <input
              required
              type='number'
              min='1'
              max='99999'
              name='price'
              id='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='form-group drop-items'>
            <label htmlFor='stock'>Stock</label>
            <input
              type='number'
              required
              min='1'
              max='100'
              name='stock'
              id='stock'
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>
        <div className='drop'>
          <div className='form-group drop-items'>
            <label htmlFor='category'>Category</label>
            <select required onChange={(e) => setCategory(e.target.value)}>
              <option value='' disabled selected>
                Choose...
              </option>
              {categories.map((o) => {
                return (
                  <option key={o._id} value={o._id}>
                    {o.title}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='form-group drop-items'>
            <label htmlFor='manufacturer'>Manufacturer</label>
            <select required onChange={(e) => setManufacturer(e.target.value)}>
              <option value='' disabled selected>
                Choose...
              </option>
              {manufacturers.map((o) => {
                return (
                  <option key={o._id} value={o._id}>
                    {o.title}
                  </option>
                )
              })}
            </select>
          </div>
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
            onClick={() => navigate('/parts')}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export default PartForm
