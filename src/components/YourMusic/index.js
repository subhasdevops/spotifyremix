import {Component} from 'react'
import './index.css'
import Header from '../Header'

class YourMusic extends Component {
  state = {genereLists: [], urlS: '', setSong: false}

  componentDidMount() {
    this.getGenereList()
  }

  getGenereList = async () => {
    const token = localStorage.getItem('pa_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const editUrl = `https://api.spotify.com/v1/me/tracks`
    const response = await fetch(editUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedSong = data.items.map(each => ({
        id: each.track.id,
        name: each.track.name,
        albumName: each.track.album.name,
        image: each.track.album.images[0].url,
        artist: each.track.album.artists[0].name,
        url: each.track.preview_url,
      }))
      this.setState({genereLists: updatedSong})
    }
  }

  onClickSong = url => {
    this.setState({urlS: url, setSong: true})
  }

  song = () => {
    const {urlS} = this.state

    if (urlS !== null) {
      return (
        <div className="audio-card">
          <audio controls src={urlS} autoPlay className="audio">
            <track default kind="captions" srcLang="en" />
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
      )
    }
    return <h1 className="audio-card">NotFound</h1>
  }

  fetchLiked = each => {
    const {url, artist, image, albumName, name, id} = each
    return (
      <div
        key={id}
        className="YourMusic-song-card"
        onClick={() => this.onClickSong(url, image, name)}
        aria-hidden="true"
      >
        <img className="yourMusic-img" src={image} alt={name} />
        <div>
          <h1>{name}</h1>
          <p>{`${albumName}, ${artist}`}</p>
        </div>
      </div>
    )
  }

  render() {
    const {genereLists, setSong} = this.state
    return (
      <div className="bg-cont">
        <Header />

        <div className="YourMusic-songItems">
          <h1>Your Music</h1>
          <div>{genereLists.map(each => this.fetchLiked(each))}</div>
          {setSong && this.song()}
        </div>
      </div>
    )
  }
}

export default YourMusic
