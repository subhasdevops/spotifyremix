import {Component} from 'react'
import Header from '../Header'
import EditorPicks from '../EditorPicks'
import GenereMoods from '../GenereMoods'
import NewRelease from '../NewReleases'
import './index.css'

class SpotifyClone extends Component {
  render() {
    return (
      <div className="bg-cont">
        <Header />
        <div className="main-container">
          <div>
            <EditorPicks />
            <GenereMoods />
            <NewRelease />
          </div>
        </div>
      </div>
    )
  }
}

export default SpotifyClone
