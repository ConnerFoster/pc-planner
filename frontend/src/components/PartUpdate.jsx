import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getCategories} from '../features/categories/categorySlice'
import {getManufacturers} from '../features/manufacturers/manufacturerSlice'
import {updatePart, getPartByID} from '../features/parts/partSlice'
import Spinner from './Spinner'

function PartUpdate() {
  const {part, isError, isLoading, message} = useSelector(
    (state) => state.parts
  )
  const {categories} = useSelector((state) => state.categories)
  const {manufacturers} = useSelector((state) => state.manufacturers)

  const id = useParams()

  const [name, setName] = useState(part.name)
  const [description, setDescription] = useState(part.description)
  const [price, setPrice] = useState(part.price)
  const [stock, setStock] = useState(part.stock)
  const [category, setCategory] = useState(part.category)
  const [manufacturer, setManufacturer] = useState(part.manufacturer)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitForm = (e) => {
    e.preventDefault()

    const data = {
      id: id,
      name: name,
      description: description,
      price: price,
      stock: stock,
      category: category,
      manufacturer: manufacturer,
    }

    if (Object.keys(localStorage).includes(data.category._id)) {
      localStorage.removeItem(data.category._id)
      const storageObj = {
        id: data.id.id,
        name: data.name,
        price: data.price,
        category: data.category.title,
      }
      localStorage.setItem(data.category._id, JSON.stringify(storageObj))
    }

    dispatch(updatePart(data))

    navigate(-2)
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    dispatch(getPartByID(id))
    dispatch(getCategories())
    dispatch(getManufacturers())
  }, [dispatch, isError, message, id])

  if (isLoading || !manufacturers || !categories) {
    return <Spinner />
  }

  return (
    <section className='container'>
      <h1>Update Part - {name}</h1>
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
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
              {categories.map((o) => {
                if (o._id != category._id) {
                  return (
                    <option key={o._id} value={o._id}>
                      {o.title}
                    </option>
                  )
                }
              })}
            </select>
          </div>
          <div className='form-group drop-items'>
            <label htmlFor='manufacturer'>Manufacturer</label>
            <select required onChange={(e) => setManufacturer(e.target.value)}>
              <option key={manufacturer._id} value={manufacturer._id}>
                {manufacturer.title}
              </option>
              {manufacturers.map((o) => {
                if (o._id != manufacturer._id) {
                  return (
                    <option key={o._id} value={o._id}>
                      {o.title}
                    </option>
                  )
                }
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

export default PartUpdate
