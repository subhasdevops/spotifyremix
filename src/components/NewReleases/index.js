import {Component} from 'react'
import './index.css'

import NewReleaseItems from '../NewReleaseItem'

class NewRelease extends Component {
  state = {newReleaseList: []}

  componentDidMount() {
    this.releaseMtd()
  }

  releaseMtd = async () => {
    const token = localStorage.getItem('pa_token', '')

    const userInfoUrl = `https://api.spotify.com/v1/me`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const userResponse = await fetch(userInfoUrl, options)
    const userData = await userResponse.json()
    const countryVal = userData.country

    const editUrl = `https://api.spotify.com/v1/browse/new-releases?country=${countryVal}`
    const response = await fetch(editUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      this.setState({newReleaseList: data.albums.items})
    }
  }

  render() {
    const {newReleaseList} = this.state

    return (
      <div>
        <div>
          <h1>New Releases</h1>
          <ul className="editorPicksItems">
            {newReleaseList.map(each => (
              <NewReleaseItems newReleaseItem={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default NewRelease
