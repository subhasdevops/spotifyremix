import {Component} from 'react'
import './index.css'

import GenereMoodsItems from '../GenereMoodsItems'

class GenereMoods extends Component {
  state = {genereList: []}

  componentDidMount() {
    this.genereMood()
  }

  genereMood = async () => {
    const token = localStorage.getItem('pa_token', '')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const editUrl = 'https://api.spotify.com/v1/browse/categories'
    const response = await fetch(editUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      this.setState({genereList: data.categories.items})
    }
  }

  render() {
    const {genereList} = this.state

    return (
      <div>
        <div>
          <h1>Genres & Moods</h1>
          <ul className="editorPicksItems">
            {genereList.map(each => (
              <GenereMoodsItems genereItem={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default GenereMoods
