import {Component} from 'react'
import {BiArrowBack} from 'react-icons/bi'

import './index.css'

import Header from '../Header'

class NewReleaseSongs extends Component {
  state = {
    playlistSongs: [],
    songName: '',
    songImage: '',
    popularity: '',
    urlS: '',
    setSong: false,
    name: '',
  }

  componentDidMount() {
    this.fetchSongs()
  }

  fetchSongs = async () => {
    const token = localStorage.getItem('pa_token', '')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.spotify.com/v1/albums/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedSong = data.tracks.items.map(each => ({
        id: each.id,
        name: each.name,
        popularity: each.popularity,
        duration: each.duration_ms,
        url: each.preview_url,
      }))
      const updatedSongName = data.name
      const updatedSongImages = data.images[0].url
      const uppopularity = data.popularity

      this.setState({
        playlistSongs: updatedSong,
        songImage: updatedSongImages,
        songName: updatedSongName,
        popularity: uppopularity,
      })
    }
  }

  songDuration = duration => {
    const sec = Math.ceil(duration / 1000)
    const min = Math.floor(sec / 60)
    const secs = sec - min * 60
    const timeInMin = min > 9 ? min : `0${min}`
    const timesecs = secs > 9 ? secs : `0${secs}`
    return `${timeInMin}:${timesecs}`
  }

  onClickSong = (url, name) => {
    this.setState({urlS: url, setSong: true, name})
  }

  song = () => {
    const {urlS, name, songImage} = this.state

    if (urlS !== null) {
      return (
        <div className="audio-card">
          <img src={songImage} alt={name} className="thumbImg" />
          <div>
            <h1>{name}</h1>
          </div>
          <audio controls src={urlS} autoPlay className="audio">
            <track default kind="captions" srcLang="en" />
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
      )
    }
    return <p className="audio-card">NotFound</p>
  }

  playListSongDetails = each => {
    const {name, duration, url} = each

    const {popularity} = this.state
    return (
      <div className="songDetails-card " key={name}>
        <p
          className="song-font song-cursor"
          onClick={() => this.onClickSong(url, name)}
        >
          {name}
        </p>

        <p className="song-font">{this.songDuration(duration)}</p>
        <p className="song-font song-Element-display">{popularity}</p>
      </div>
    )
  }

  onClickBack = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {playlistSongs, songName, songImage, setSong} = this.state

    return (
      <div className="bg-cont">
        <Header />

        <div className="editor-song-profile-container">
          <button
            className="button-back"
            type="button"
            onClick={this.onClickBack}
          >
            <BiArrowBack /> Back
          </button>
          <div className="edit-song-card">
            <img src={songImage} alt={songName} className="songImg" />
            <div className="editor-heading-card">
              <p>New Releases</p>
              <h1>{songName}</h1>
            </div>
          </div>
          <div className="songTitle-card">
            <p className="song-font">Track</p>

            <p className="song-font">Time</p>
            <p className="song-font">Popularity</p>
          </div>
          <hr className="hr-line" />
          {playlistSongs.map(each => this.playListSongDetails(each))}

          {setSong && this.song()}
        </div>
      </div>
    )
  }
}

export default NewReleaseSongs
