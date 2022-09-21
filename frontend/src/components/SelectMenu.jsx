
function SelectMenu(props) {
  return (
    <div className="form-group">
        <select>
            {props.obj.map(o => {
                return <option key={o._id} value={o._id}>{o.title}</option>
            })}
        </select>
    </div>
  )
}

export default SelectMenu