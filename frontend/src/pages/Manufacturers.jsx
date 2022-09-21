import ManufacturerItem from "../components/ManufacturerItem"
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from "react"
import { getManufacturers, reset } from "../features/manufacturers/manufacturerSlice"
import Spinner from "../components/Spinner"
import { Link } from "react-router-dom"

function Manufacturers() {
  const dispatch = useDispatch()
  const {manufacturers, isLoading, isError, message} = useSelector((state) => state.manufacturers)

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    dispatch(getManufacturers())

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

    
  return (
    <>
      <section className="container">
        <h1 className="heading">All Manufacturers</h1>
    </section>

    <section className="content container">
    <Link to='/manufacturers/create'><button className="new-btn">+ New Manufacturer</button></Link>
      {manufacturers.length > 0 ? (
        <div className="manufacturers">
          {manufacturers.map((m) => (
            <ManufacturerItem key={m._id} manufacturer={m} />
            
          ))}
        </div>
      ) : (
        <h3 className="no-items">No Manufacturers Created Yet</h3>
      )}
    </section>
    </>
  )
}

export default Manufacturers