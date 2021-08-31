import {Component} from 'react'
import './index.css'
import moment from 'moment'
import Editoritems from '../Editoritems'

const timeStamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')

class EditorPicks extends Component {
  state = {editorList: []}

  componentDidMount() {
    this.fetcheditorpicks()
  }

  fetcheditorpicks = async () => {
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
    const editUrl = `https://api.spotify.com/v1/browse/featured-playlists?country=${countryVal}&timestamp=${timeStamp}`
    const response = await fetch(editUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      this.setState({editorList: data.playlists.items})
    }
  }

  render() {
    const {editorList} = this.state

    return (
      <div>
        <div>
          <h1>Editor`s Picks</h1>
          <ul className="editorPicksItems">
            {editorList.map(each => (
              <Editoritems editorItem={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default EditorPicks
