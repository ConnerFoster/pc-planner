import {Link} from 'react-router-dom'

function ManufacturerItem(props) {

  return (
    <Link to={`/manufacturers/${props.manufacturer._id}`}>
    <div className="cm-item">
        <h3>{props.manufacturer.title}</h3>
    </div>
    </Link>
  )
}

export default ManufacturerItem