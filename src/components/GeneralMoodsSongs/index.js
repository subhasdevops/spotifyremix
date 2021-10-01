import {Component} from 'react'
import './index.css'
import Editoritems from '../Editoritems'
import Header from '../Header'

class GenereMoodsItemsList extends Component {
  state = {genereLists: []}

  componentDidMount() {
    this.getGenereList()
  }

  getGenereList = async () => {
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
    const countryVal = userData.country

    const {match} = this.props
    const {params} = match
    const {id} = params

    const editUrl = `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=${countryVal}`
    const response = await fetch(editUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({genereLists: data.playlists.items})
      console.log(data)
    }
  }

  render() {
    const {genereLists} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className="bg-cont">
        <Header />

        <div className="editor-song-profile-container">
          <div>
            <h1>{id.toUpperCase()}</h1>
            <ul className="editorPicksItems">
              {genereLists.map(each => (
                <Editoritems editorItem={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default GenereMoodsItemsList
