import {Component} from 'react'
import './index.css'
import Header from '../Header'

class Profile extends Component {
  state = {profileDetails: {}}

  componentDidMount() {
    this.fetchProfile()
  }

  fetchProfile = async () => {
    const token = localStorage.getItem('pa_token', '')
    const url = 'https://api.spotify.com/v1/me'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const userData = {
        displayName: data.display_name,
        total: data.followers.total,
      }
      this.setState({profileDetails: userData})
    }
  }

  render() {
    const {profileDetails} = this.state
    const {displayName, total} = profileDetails
    return (
      <div className="bg-cont">
        <Header />
        <div className="profile-container">
          <h1>{displayName}</h1>
          <div className="profileDetails">
            <div className="profileFollowerCard">
              <h1 className="totalFollowerColour">{total}</h1>
              <p>FOLLOWERS</p>
            </div>
            <div className="profilePlaylistCard">
              <h1 className="totalFollowerColour">{total}</h1>
              <p>PLAYLISTS</p>
            </div>
          </div>
          <div>
            <button type="button" className="logoutButton-style">
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
