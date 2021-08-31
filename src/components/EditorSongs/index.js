import {Component} from 'react'
import {BiArrowBack} from 'react-icons/bi'

import './index.css'

import Header from '../Header'

class EditorSongs extends Component {
  state = {playlistSongs: [], songName: '', songImage: ''}

  componentDidMount() {
    this.fetchSongs()
  }

  fetchSongs = async () => {
    const token = localStorage.getItem('pa_token', '')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.spotify.com/v1/users/spotify/playlists/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedSong = data.tracks.items.map(each => ({
        id: each.track.id,
        name: each.track.name,
        albumName: each.track.album.name,
        addTime: each.added_at,
        duration: each.track.duration_ms,
        artist: each.track.artists[0].name,
      }))
      const updatedSongName = data.name
      const updatedSongImages = data.images[0].url

      this.setState({
        playlistSongs: updatedSong,
        songName: updatedSongName,
        songImage: updatedSongImages,
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

  monthsago = time => {
    const current = new Date()
    const songTime = new Date(time)
    const diff = current - songTime
    const sec = Math.ceil(diff / 1000)
    const hour = Math.floor(sec / 3600)
    const days = Math.ceil(hour / 24)
    if (days > 30) {
      return `${Math.floor(days / 30)} Months ago`
    }
    return `${days} Days ago`
  }

  playListSongDetails = each => {
    const {name, albumName, addTime, duration, artist} = each

    return (
      <div className="songTitle-card">
        <p className="song-font">{name}</p>
        <p className="song-font">{albumName}</p>
        <p className="song-font">{this.songDuration(duration)}</p>
        <p className="song-font">{artist}</p>
        <p className="song-font">{this.monthsago(addTime)}</p>
      </div>
    )
  }

  render() {
    const {playlistSongs, songName, songImage} = this.state

    console.log(playlistSongs)
    return (
      <div className="bg-cont">
        <Header />

        <div className="editor-song-profile-container">
          <button type="button" className="backCard">
            <p>
              <BiArrowBack /> Back
            </p>
          </button>
          <div className="edit-song-card">
            <img src={songImage} alt={songName} className="songImg" />
            <div className="editor-heading-card">
              <p>Editors picks</p>
              <h1>{songName}</h1>
            </div>
          </div>
          <div className="songTitle-card">
            <p className="song-font">Title</p>
            <p className="song-font"> Album</p>
            <p className="song-font">Time</p>
            <p className="song-font">Artist</p>
            <p className="song-font">Added</p>
          </div>
          <hr className="hr-line" />
          {playlistSongs.map(each => this.playListSongDetails(each))}
        </div>
      </div>
    )
  }
}

export default EditorSongs
