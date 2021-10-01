import {Link} from 'react-router-dom'
import './index.css'

const NewReleaseItems = props => {
  const {newReleaseItem} = props
  const {name, id, images} = newReleaseItem
  return (
    <Link className="edit-col" to={`/new/${id}`}>
      <div className="editorPicks-card">
        <img className="editorImageAlbum" src={images[0].url} alt={id} />
        <h1 className="newReleaseAlbumName">{name}</h1>
      </div>
    </Link>
  )
}

export default NewReleaseItems
