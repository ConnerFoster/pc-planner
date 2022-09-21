import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createManufacturer} from '../features/manufacturers/manufacturerSlice'


function ManufacturerForm() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitForm = e => {
    e.preventDefault()

    const data = {
      title: title,
      description: desc
    }

    dispatch(createManufacturer(data))
    setTitle('')
    setDesc('')
    navigate('/manufacturers')
  }

  

  return (
    <section className='container'>
      <h1>Create a Manufacturer</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="title">Name</label>
          <input type="text"  maxLength="100" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea maxLength='750' name="title" id="title" value={desc} onChange={(e) => setDesc(e.target.value)}/>
        </div>
        <div className="form-group">
          <button className="btn-block b-yellow" type='submit'>Submit</button>
        </div>
        <div className="form-group">
          <button className="btn-block dark-gray yellow" type='button' onClick={() => navigate('/manufacturers')}>Cancel</button>
        </div>
      </form>
    </section>
  )
}

export default ManufacturerForm