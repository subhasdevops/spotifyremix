import {Link} from 'react-router-dom'
import './index.css'

const Editoritems = props => {
  const {editorItem} = props
  const {name, id, images} = editorItem

  return (
    <Link to={`/editor/${id}`}>
      <div className="editorPicks-card">
        <img className="editorImageAlbum" src={images[0].url} alt={id} />
        <h1>{name}</h1>
      </div>
    </Link>
  )
}

export default Editoritems
