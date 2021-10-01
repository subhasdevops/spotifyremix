import {Link} from 'react-router-dom'
import './index.css'

const GenereMoodsItems = props => {
  const {genereItem} = props
  const {name, id, icons} = genereItem
  return (
    <Link to={`/generes/${id}`} className="edit-col">
      <div className="editorPicks-card">
        <img className="editorImageAlbum" src={icons[0].url} alt={id} />
        <h1>{name}</h1>
      </div>
    </Link>
  )
}

export default GenereMoodsItems
