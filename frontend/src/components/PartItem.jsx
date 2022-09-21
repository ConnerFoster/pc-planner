import {Link} from 'react-router-dom'

function PartItem(props) {

  return (
    <Link to={`/parts/${props.part._id}`}>
    <div className="cm-item">
        <h3>{props.part.name}</h3>
    </div>
    </Link>
  )
}

export default PartItem