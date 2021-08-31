import './index.css'

const GenereMoodsItems = props => {
  const {genereItem} = props
  const {name, id, icons} = genereItem
  return (
    <div className="editorPicks-card">
      <img className="editorImageAlbum" src={icons[0].url} alt={id} />
      <h1>{name}</h1>
    </div>
  )
}

export default GenereMoodsItems
