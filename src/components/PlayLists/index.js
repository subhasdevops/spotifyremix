import {Component} from 'react'
import './index.css'

import Editoritems from '../Editoritems'
import Header from '../Header'

class PlayLists extends Component {
  state = {editorList: []}

  componentDidMount() {
    this.fetcheditorpicks()
  }

  fetcheditorpicks = async () => {
    const token = localStorage.getItem('pa_token')

    const userInfoUrl = `https://api.spotify.com/v1/me`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const userResponse = await fetch(userInfoUrl, options)
    const userData = await userResponse.json()

    const user = userData.id
    const editUrl = `https://api.spotify.com/v1/users/${user}/playlists?limit=50`
    const response = await fetch(editUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.setState({editorList: data.items})
    }
  }

  render() {
    const {editorList} = this.state

    return (
      <div className="bg-cont">
        <div className="side-nav-div">
          <Header />
        </div>
        <div className="editor-song-profile-container">
          <div>
            <h1>PlayLists</h1>
            <ul className="editorPicksItems">
              {editorList.map(each => (
                <Editoritems editorItem={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayLists
