import CategoryItem from "../components/CategoryItem"
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from "react"
import { getCategories, reset } from "../features/categories/categorySlice"


function List() {
  const dispatch = useDispatch()
  const {categories, isError, message} = useSelector((state) => state.categories)

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    dispatch(getCategories())

    return () => {
      dispatch(reset)
    }
  }, [isError, message, dispatch])

  return (
    <>
    <section className="container">
        <h1 className="heading">My List</h1>
    </section>

    
    
    </>
  )
}

export default List