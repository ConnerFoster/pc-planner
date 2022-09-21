import {Link} from 'react-router-dom'

function CategoryItem(props) {

  return (
    <Link to={`/categories/${props.category._id}`}>
    <div className="cm-item">
        <h3>{props.category.title}</h3>
    </div>
    </Link>
  )
}

export default CategoryItem