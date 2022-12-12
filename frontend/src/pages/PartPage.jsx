import {useDispatch, useSelector} from 'react-redux'
import {getPartByID, reset} from '../features/parts/partSlice'
import {useParams, useNavigate, Link} from 'react-router-dom'
import {useEffect} from 'react'
import Spinner from '../components/Spinner'
import {deletePart} from '../features/parts/partSlice'

function PartPage() {
  let {id} = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {part, isError, isLoading, message} = useSelector(
    (state) => state.parts
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    dispatch(getPartByID(id))

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch, id])

  /*if (isLoading) {
    return <Spinner />
  }*/

  const del = (id) => {
    dispatch(deletePart(id))
    navigate('/parts')
  }

  if (isLoading || !part.category || !part.manufacturer) {
    return <Spinner />
  }

  //console.log(part.category.title);
  return (
    <div className='container page-heading'>
      <h1 className='page-heading'>{part.name}</h1>
      <Link to={`/parts/update/${part._id}`} className='updelete-btn'>
        Update
      </Link>
      <button className='updelete-btn' onClick={() => del(part._id)}>
        Delete
      </button>
      <h4 className='page-desc'>{part.description}</h4>
    </div>
  )
}

export default PartPage
